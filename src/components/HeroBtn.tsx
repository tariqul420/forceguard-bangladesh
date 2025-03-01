'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import useData from '@/hook/useData';
import toast from 'react-hot-toast';

interface Camp {
  name: string;
  location: { latitude: string; longitude: string };
  phoneNumbers?: string[];
}

const HeroBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Camp[]>([]);
  const [camps, setCamps] = useState<Camp[]>([]);
  const { setMapLocation } = useData();

  useEffect(() => {
    axios
      .get('/camps.json')
      .then(({ data }) => {
        setCamps(data);

        // ✅ Set first camp's location as the default map location
        if (data.length > 0) {
          const defaultCamp = data[0];
          setMapLocation({
            latitude: parseFloat(defaultCamp.location.latitude),
            longitude: parseFloat(defaultCamp.location.longitude),
          });
        }
      })
      .catch((err) => console.error('Error fetching camps:', err));
  }, [setMapLocation]);

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      alert('অনুগ্রহ করে একটি ক্যাম্পের নাম লিখুন!');
    } else {
      alert(`আপনি খুঁজছেন: ${searchValue}`);
    }

    // ✅ Set first camp as location if available
    if (camps.length > 0) {
      setMapLocation({
        latitude: parseFloat(camps[0].location.latitude),
        longitude: parseFloat(camps[0].location.longitude),
      });
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setSuggestions([]);
    setMapLocation({ latitude: 23.8103, longitude: 90.4125 });
  };

  const handleLocation = () => {
    if (pathname === '/all-camp') {
      router.push('/');
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Geolocation Error:', error);
            toast.error('❌ আপনার সঠিক লোকেশন পাওয়া যায়নি। অনুগ্রহ করে ব্রাউজার সেটিংস চেক করুন।');
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
        );
      } else {
        toast.error('❌ আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।');

        // ✅ Fallback to first camp location if available
        if (camps.length > 0) {
          setMapLocation({
            latitude: parseFloat(camps[0].location.latitude),
            longitude: parseFloat(camps[0].location.longitude),
          });
          toast.success(`🔄 ক্যাম্পের ডিফল্ট লোকেশন সেট করা হয়েছে: ${camps[0].name}`);
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchValue(term);

    if (term.length > 0) {
      const matchedCamps = camps.filter((camp) => camp.name.toLowerCase().includes(term));
      console.log(matchedCamps)
      setSuggestions(matchedCamps);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <input
        className="flex-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
        placeholder="ক্যাম্প খুঁজুন..."
        value={searchValue}
        onChange={handleInputChange}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)}
      />

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-lg z-[10000]">
          {suggestions.map((match, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearchValue(match.name);
                setSuggestions([]);
              }}
            >
              {match.name}
            </div>
          ))}
        </div>
      )}

      <button onClick={handleSearch} className="px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 cursor-pointer">
        খুঁজুন
      </button>
      <button onClick={handleReset} className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer">
        রিসেট
      </button>
      <button onClick={handleLocation} className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 cursor-pointer">
        {pathname === '/all-camp' ? 'হোমে যান' : 'আপনার লোকেশন খুঁজুন'}
      </button>
    </div>
  );
};

export default HeroBtn;
