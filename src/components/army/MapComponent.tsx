'use client';

import useData from '@/hook/useData';
import Leaflet from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';

interface Camp {
  name: string;
  location: {
    latitude: string;
    longitude: string;
  };
  description?: string;
  phoneNumbers?: string[];
}

const MapComponent = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const { mapLocation } = useData();

  useEffect(() => {
    fetch('/api/armies')
      .then((response) => response.json())
      .then((data: Camp[]) => {
        setCamps(data);
      });
  }, []);

  useEffect(() => {
    if (camps.length === 0) return;

    const map = Leaflet.map('map').setView([mapLocation?.latitude, mapLocation?.longitude], mapLocation?.zoom);
    mapRef.current = map;

    // Define multiple map layers
    const layers = {
      'Google Terrain': Leaflet.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      OpenStreetMap: Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }),
      'Google Satellite': Leaflet.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Google Streets': Leaflet.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Google Hybrid': Leaflet.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Esri World Imagery': Leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri',
      }),
    };

    // Add default layer
    layers['OpenStreetMap'].addTo(map);

    // Layer control to switch between views
    Leaflet.control.layers(layers).addTo(map);

    // Define custom icon
    const customIcon = Leaflet.icon({
      iconUrl: '/bd_army.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    // Marker cluster group
    const markers = Leaflet.markerClusterGroup({
      disableClusteringAtZoom: 10,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: true,
      zoomToBoundsOnClick: true,
    });

    // Add camp markers
    camps.forEach((camp) => {
      const lat = parseFloat(camp.location.latitude);
      const lng = parseFloat(camp.location.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const popupContent = `
          <div class="p-4">
            <h3 class="text-lg font-bold text-green-700">${camp?.name}</h3>
            ${camp?.description ? `<p class="text-sm text-gray-600 mt-2">${camp?.description}</p>` : ''}
            ${
              camp?.phoneNumbers && camp?.phoneNumbers?.length > 0
                ? `<div class="contact mt-3">
                    <span class="font-semibold text-gray-800">Contact:</span>
                    ${camp.phoneNumbers.map((phone) => `<a href="tel:${phone}" class="block text-blue-500 hover:text-blue-700 mt-1">${phone}</a>`).join('')}
                  </div>`
                : ''
            }
          </div>
        `;

        const marker = Leaflet.marker([lat, lng], { icon: customIcon }).bindPopup(popupContent);
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);

    // User Location Icon
    const userLocationIcon = Leaflet.icon({
      iconUrl: '/location_icon.png',
      iconSize: [50, 50],
      iconAnchor: [12, 25],
      popupAnchor: [0, -25],
    });

    // Get User Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          Leaflet.marker([latitude, longitude], { icon: userLocationIcon }).bindPopup('You are here!').addTo(map);

          map.setView([mapLocation?.latitude, mapLocation?.longitude], mapLocation?.zoom);
        },
        (error) => {
          console.error('Error getting location:', error);
        },
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [camps, mapLocation?.latitude, mapLocation?.longitude, mapLocation?.zoom]);

  return (
    <div>
      {/* Map container */}
      <div id="map" className="w-full h-[600px] border-2 border-green-500 rounded-xl"></div>
    </div>
  );
};

export default MapComponent;
