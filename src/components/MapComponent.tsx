'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';

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

  useEffect(() => {
    // Fetch camps data
    fetch('/camps.json')
      .then((response) => response.json())
      .then((data: Camp[]) => setCamps(data))
      .catch((error) => console.error('Error fetching camps:', error));
  }, []);

  useEffect(() => {
    if (camps.length === 0) return;

    // Initialize the map
    const map = L.map('map').setView([23.8103, 90.4125], 7);

    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    });
    osm.addTo(map);

    // Define custom icon
    const customIcon = L.icon({
      iconUrl: '/bd_army.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    // Marker cluster group
    const markers = L.markerClusterGroup({
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
          <div class="custom-popup">
            <h3 class="text-lg font-bold text-green-700">${camp?.name}</h3>
            ${camp?.description ? `<p class="text-sm text-gray-600 mt-2">${camp?.description}</p>` : ''}
            ${
              camp?.phoneNumbers && camp?.phoneNumbers?.length > 0
                ? `
                  <div class="contact mt-3">
                    <span class="font-semibold text-gray-800">Contact:</span>
                    ${camp.phoneNumbers
                      .map(
                        (phone) => `
                          <a href="tel:${phone}" class="block text-blue-500 hover:text-blue-700 mt-1">
                            ${phone}
                          </a>
                        `,
                      )
                      .join('')}
                  </div>
                `
                : ''
            }
          </div>
        `;

        const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(popupContent);
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);

    // Cleanup
    return () => {
      map.remove();
    };
  }, [camps]);

  return <div id="map" className="w-full h-[600px]"></div>;
};

export default MapComponent;
