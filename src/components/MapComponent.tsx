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
  const [divisionStats, setDivisionStats] = useState<{ [key: string]: number }>({});
  const [nearbyCamps, setNearbyCamps] = useState<Camp[]>([]);

  useEffect(() => {
    // Fetch camps data
    fetch('/camps.json')
      .then((response) => response.json())
      .then((data: Camp[]) => {
        setCamps(data);
        updateStats(data); // Update stats when data is loaded
      });
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
          <div class="p-4">
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

  // Function to update stats
  const updateStats = (camps: Camp[]) => {
    // Update total camps
    const totalCampsElement = document.getElementById('total-camps');
    if (totalCampsElement) {
      totalCampsElement.textContent = camps.length.toString();
    }

    // Group camps by division
    const divisionMapping = {
      ঢাকা: ['ঢাকা', 'গাজীপুর', 'মুন্সিগঞ্জ', 'নারায়নগঞ্জ', 'মানিকগঞ্জ', 'নরিসিংদী', 'কিশোরগঞ্জ', 'টাঙ্গাইল', 'মাদারীপুর', 'শরিয়তপুর', 'ফরিদপুর', 'রাজবাড়ী', 'গোপালগঞ্জ'],
      চট্টগ্রাম: ['চট্টগ্রাম', 'কক্সবাজার', 'নোয়াখালী', 'ফেনী', 'লক্ষীপুর', 'চাঁদপুর', 'কুমিল্লা', 'ব্রাক্ষ্মণবাড়ীয়া'],
      খুলনা: ['খুলনা', 'বাগেরহাট', 'সাতক্ষীরা', 'যশোর', 'ঝিনাইদহ', 'কুষ্টিয়া', 'চায়াডাঙ্গা', 'মেহেরপুর', 'নড়াইল', 'মাগুরা'],
      রাজশাহী: ['রাজশাহী', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ', 'পাবনা', 'সিরাজগঞ্জ', 'বগুড়া', 'জয়পুরহাট'],
      বরিশাল: ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'ঝালকাঠী', 'পিরোজপুর'],
      সিলেট: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
      রংপুর: ['রংপুর', 'দিনাজপুর', 'নীলফামারী', 'কুড়িগ্রাম', 'লালমনিরহাট', 'গাইবান্ধা', 'ঠাকুরগাঁও', 'পঞ্চগড়'],
      ময়মনসিংহ: ['ময়মনসিংহ', 'নেত্রকোণা', 'জামালপুর', 'শেরপুর'],
    };

    const stats: { [key: string]: number } = {};
    for (const [division, districts] of Object.entries(divisionMapping)) {
      stats[division] = camps.filter((camp) =>
        districts.some((district) => camp.name.includes(district))
      ).length;
    }

    setDivisionStats(stats); // Update division stats state
  };

  // Function to find nearby camps
  const findNearbyCamps = (userLat: number, userLng: number, radiusKm: number = 50) => {
    const nearby = camps.filter((camp) => {
      const campLat = parseFloat(camp.location.latitude);
      const campLng = parseFloat(camp.location.longitude);
      const distance = calculateDistance(userLat, userLng, campLat, campLng);
      return distance <= radiusKm;
    });

    setNearbyCamps(nearby); // Update nearby camps state
  };

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Function to handle location button click
  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          findNearbyCamps(latitude, longitude); // Find nearby camps
        },
        (error) => {
          alert('Unable to retrieve your location. Please enable location access.');
          console.error(error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div>
      {/* Map container */}
      <div id="map" className="w-full h-[600px] border-2 border-green-500 rounded-xl"></div>

      {/* Information section */}
      <div className="info-panel mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">তথ্য পরিসংখ্যান</h2>
        <div id="stats" className="space-y-4">
          <div className="stat-item">
            <span className="stat-label font-semibold text-gray-800">মোট ক্যাম্প:</span>
            <span id="total-camps" className="stat-value text-green-700 text-lg">0</span>
          </div>
          <div className="stat-item">
            <span className="stat-label font-semibold text-gray-800">বিভাগ অনুযায়ী:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Object.entries(divisionStats).map(([division, count]) => (
                <div
                  key={division}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-green-700">{division}</h3>
                  <p className="text-gray-600 mt-2">
                    ক্যাম্প সংখ্যা: <span className="text-green-700">{count}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nearby camps section */}
        <div id="nearby-camps-list" className="nearby-camps-list mt-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">নিকটবর্তী ক্যাম্পসমূহ</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nearbyCamps.map((camp) => (
              <div
                key={camp.name}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-green-700">{camp.name}</h3>
                {camp.description && (
                  <p className="text-sm text-gray-600 mt-2">{camp.description}</p>
                )}
                {camp.phoneNumbers && camp.phoneNumbers.length > 0 && (
                  <div className="mt-3">
                    <span className="font-semibold text-gray-800">যোগাযোগ:</span>
                    {camp.phoneNumbers.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="block text-blue-500 hover:text-blue-700 mt-1"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data page button */}
        <div className="data-page-container mt-6">
          <a
            id="data-page-btn"
            className="data-page-btn inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all duration-300"
            href="data.html"
          >
            সকল ডাটা দেখুন এক পেইজে
          </a>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;