'use client';

import useData from '@/hook/useData';
import Leaflet from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Camp {
  name: string;
  location: {
    latitude: string;
    longitude: string;
  };
  phoneNumbers?: string[];
  division: string;
  district: string;
}

const MapComponentPolice = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const mapRef = useRef<L.Map | null>(null);
  const { mapLocation } = useData();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('name') || '';

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await fetch(`/api/polices?name=${encodeURIComponent(searchValue)}`);
        const data: Camp[] = await response.json();
        setCamps(data);
      } catch (error) {
        console.error('Error fetching camps:', error);
      }
    };

    fetchCamps();
  }, [searchValue]);

  useEffect(() => {
    if (camps.length === 0) return;

    const map = Leaflet.map('map').setView([mapLocation.latitude, mapLocation.longitude], mapLocation.zoom);
    mapRef.current = map;

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

    layers['Google Streets'].addTo(map);
    Leaflet.control.layers(layers).addTo(map);

    const customIcon = Leaflet.icon({
      iconUrl: '/images/police1.png',
      iconSize: [40, 50],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    const markers = Leaflet.markerClusterGroup();

    camps.forEach((camp) => {
      const lat = parseFloat(camp.location.latitude);
      const lng = parseFloat(camp.location.longitude);

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = Leaflet.marker([lat, lng], { icon: customIcon }).bindPopup(`
          <div class="p-4">
            <h3 class="text-lg font-bold text-green">${camp?.name}</h3>
            <h4 class="text-base font-medium text-black">বিভাগ: ${camp?.division}</h4>
            <h4 class="text-base font-medium text-black">জেলা: ${camp?.district}</h4>
            ${
              camp?.phoneNumbers && camp?.phoneNumbers?.length > 0
                ? `<div class="contact mt-3">
                    <span class="font-semibold text-gray-800">Contact:</span>
                    ${camp.phoneNumbers.map((phone) => `<a href="tel:${phone}" class="block text-blue-500 hover:text-blue-700 mt-1">${phone}</a>`).join('')}
                  </div>`
                : ''
            }
          </div>`);
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);

    // User Location Icon
    const userLocationIcon = Leaflet.icon({
      iconUrl: '/images/location_icon.png',
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
  }, [camps, mapLocation]);

  return <div id="map" className="w-full h-[600px] border-2 border-green-500 rounded-xl"></div>;
};

export default MapComponentPolice;
