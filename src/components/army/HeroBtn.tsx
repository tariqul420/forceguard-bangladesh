'use client';

import useData from '@/hook/useData';
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaMapMarkedAlt, FaSearch, FaTimes } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FiHome } from 'react-icons/fi';

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
  const maxZoom = 15;

  useEffect(() => {
    axios
      .get('/camps.json')
      .then(({ data }) => {
        setCamps(data);
        if (data.length > 0) {
          const defaultCamp = data[0];
          setMapLocation({
            latitude: parseFloat(defaultCamp.location.latitude),
            longitude: parseFloat(defaultCamp.location.longitude),
            zoom: 7,
          });
        }
      })
      .catch((err) => console.error('Error fetching camps:', err));
  }, [setMapLocation]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('অনুগ্রহ করে একটি ক্যাম্পের নাম লিখুন!');
      return;
    }

    const matchedCamps = camps.filter((camp) => camp.name.toLowerCase().includes(searchValue.toLowerCase()));
    if (matchedCamps.length > 0) {
      const { latitude, longitude } = matchedCamps[0].location;

      if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
        if (pathname === '/all-camp') {
          // search form all camp
        } else {
          setMapLocation({ latitude: parseFloat(latitude), longitude: parseFloat(longitude), zoom: maxZoom });
        }
      } else {
        toast.error('❌ ক্যাম্পের লোকেশন পাওয়া যায়নি!');
      }
    } else {
      toast.error('আপনার অনুসন্ধানে কোনো ক্যাম্প মেলেনি!');
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setSuggestions([]);
    setMapLocation({ latitude: 23.8103, longitude: 90.4125, zoom: 7 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchValue(term);
    setSuggestions(term.length > 0 ? camps.filter((camp) => camp.name.toLowerCase().includes(term)) : []);
  };

  const handleLocation = () => {
    if (pathname === '/army/all-camp') {
      router.push('/army');
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, zoom: maxZoom });
        },
        () => {
          toast.error('❌ আপনার সঠিক লোকেশন পাওয়া যায়নি। অনুগ্রহ করে ব্রাউজার সেটিংস চেক করুন।');
          if (camps.length > 0) {
            setMapLocation({
              latitude: parseFloat(camps[0].location.latitude),
              longitude: parseFloat(camps[0].location.longitude),
              zoom: maxZoom,
            });
            toast.success(`🔄 ক্যাম্পের ডিফল্ট লোকেশন সেট করা হয়েছে: ${camps[0].name}`);
          }
        },
      );
    } else {
      toast.error('❌ আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।');
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row w-full gap-3">
        <div className="relative w-full">
          <input
            className="w-full py-3 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            type="text"
            placeholder="ক্যাম্প খুঁজুন..."
            value={searchValue}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setSuggestions([]), 200)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-lg z-[5000]">
              {suggestions.map((match, index) => (
                <div
                  key={index}
                  className="p-3 cursor-pointer hover:bg-gray-100"
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
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button type="submit" className="w-full md:w-auto px-5 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 flex items-center justify-center gap-2 cursor-pointer">
            <FaSearch /> খুঁজুন
          </button>
          <button type="button" onClick={handleReset} className="w-full md:w-auto px-5 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer">
            <FaTimes /> রিসেট
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center gap-8">
        <button onClick={handleLocation} className="w-full px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          {pathname === '/army/all-camp' ? <FaMapMarkedAlt /> : <FaLocationDot />}
          {pathname === '/army/all-camp' ? 'ম্যাপ পেইজে যান' : 'আপনার লোকেশন খুঁজুন'}
        </button>
        <Link href={'/'} className="w-full px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          <FiHome />
          হোমে যান
        </Link>
      </div>
    </div>
  );
};

export default HeroBtn;
