'use client';

import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster';
import Link from 'next/link';
import useData from '@/hook/useData';

interface Camp {
  name: string;
  location: {
    latitude: string;
    longitude: string;
  };
  description?: string;
  phoneNumbers?: string[];
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

const MapComponent = () => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [divisionStats, setDivisionStats] = useState<{ [key: string]: number }>({});
  const [allCamps, setAllCamps] = useState<number>(0);
  const [nearbyCamps, setNearbyCamps] = useState<Camp[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const { mapLocation } = useData();

  useEffect(() => {
    fetch('/camps.json')
      .then((response) => response.json())
      .then((data: Camp[]) => {
        setCamps(data);
        updateStats(data);
      });
  }, []);

  useEffect(() => {
    if (camps.length === 0) return;

    const map = L.map('map').setView([mapLocation?.latitude, mapLocation?.longitude], mapLocation?.zoom);
    mapRef.current = map;

    // Define multiple map layers
    const layers = {
      OpenStreetMap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }),
      'Google Satellite': L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Google Streets': L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Google Terrain': L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Google Hybrid': L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google',
      }),
      'Esri World Imagery': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri',
      }),
    };

    // Add default layer
    layers['OpenStreetMap'].addTo(map);

    // Layer control to switch between views
    L.control.layers(layers).addTo(map);

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
                ? `<div class="contact mt-3">
                    <span class="font-semibold text-gray-800">Contact:</span>
                    ${camp.phoneNumbers.map((phone) => `<a href="tel:${phone}" class="block text-blue-500 hover:text-blue-700 mt-1">${phone}</a>`).join('')}
                  </div>`
                : ''
            }
          </div>
        `;

        const marker = L.marker([lat, lng], { icon: customIcon }).bindPopup(popupContent);
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);

    // User Location Icon
    const userLocationIcon = L.icon({
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
          L.marker([latitude, longitude], { icon: userLocationIcon }).bindPopup('You are here!').addTo(map);

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

  // Function to update stats
  const updateStats = (camps: Camp[]) => {
    const stats: { [key: string]: number } = {};
    for (const [division, districts] of Object.entries(divisionMapping)) {
      stats[division] = camps.filter((camp) => districts.some((district) => camp.name.includes(district))).length;
    }

    setDivisionStats(stats);
    setAllCamps(camps.length);
  };

  const findNearbyCamps = (userLat: number, userLng: number, radiusKm: number = 50) => {
    const nearby = camps
      .filter((camp) => {
        const campLat = parseFloat(camp.location.latitude);
        const campLng = parseFloat(camp.location.longitude);
        const distance = calculateDistance(userLat, userLng, campLat, campLng);
        return distance <= radiusKm;
      })
      .slice(0, 3);

    setNearbyCamps(nearby);
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          findNearbyCamps(latitude, longitude);
          setLocationError(null); // Clear any previous error
        },
        (error) => {
          setLocationError('লোকেশন এক্সেস দিন!'); // Set error message
          console.error(error);
        },
      );
    } else {
      setLocationError('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।'); // Set error message
    }
  };

  return (
    <div>
      {/* Map container */}
      <div id="map" className="w-full h-[600px] border-2 border-green-500 rounded-xl"></div>

      {/* Information section */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4">তথ্য পরিসংখ্যান</h2>
        <div className="space-y-4">
          <div>
            <span className="stat-label font-semibold text-gray-800">মোট ক্যাম্প: </span>
            <span className="text-green-700 text-lg">{allCamps}</span>
          </div>

          <div className="stat-item">
            <span className="font-semibold text-gray-800">বিভাগ অনুযায়ী:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {Object.entries(divisionStats).map(([division, count]) => (
                <div key={division} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
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
        <div className="nearby-camps-list mt-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">নিকটবর্তী ক্যাম্পসমূহ</h3>
          {nearbyCamps.length === 0 ? (
            <div>
              <p className="text-gray-600">কোন ক্যাম্প পাওয়া যায়নি</p>
              {locationError && (
                <div className="mt-4">
                  <p className="text-red-500">{locationError}</p>
                  <button onClick={handleFindLocation} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300">
                    লোকেশন এক্সেস দিন
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {nearbyCamps.map((camp) => (
                <div key={camp.name} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-green-700">{camp.name}</h3>
                  {camp.description && <p className="text-sm text-gray-600 mt-2">{camp.description}</p>}
                  {camp.phoneNumbers && camp.phoneNumbers.length > 0 && (
                    <div className="mt-3">
                      <span className="font-semibold text-gray-800">যোগাযোগ:</span>
                      {camp.phoneNumbers.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className="block text-blue-500 hover:text-blue-700 mt-1">
                          {phone}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data page button */}
        <div className="mt-6 flex justify-center">
          <Link href={'/all-camp'} className="data-page-btn inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all duration-300">
            সকল ডাটা দেখুন এক পেইজে
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
