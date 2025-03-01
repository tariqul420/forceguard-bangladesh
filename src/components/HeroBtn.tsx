'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

interface Camp {
  name: string;
  suburbs?: { name: string }[];
}

const HeroBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Camp[]>([]);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [camps, setCamps] = useState<Camp[]>([]);

  console.log(location)

  useEffect(() => {
    axios.get('/camps.json')
      .then(({ data }) => setCamps(data))
      .catch(err => console.error('Error fetching camps:', err));
  }, []);

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      alert('অনুগ্রহ করে একটি ক্যাম্পের নাম লিখুন!');
    } else {
      alert(`আপনি খুঁজছেন: ${searchValue}`);
    }
  };

  const handleReset = () => {
    setSearchValue('');
    setSuggestions([]);
  };

  const handleLocation = () => {
    if (pathname === '/all-camp') {
      router.push('/');
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            alert(`আপনার লোকেশন: Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          () => {
            alert('লোকেশন তথ্য পাওয়া যায়নি। অনুগ্রহ করে ব্রাউজার সেটিংস চেক করুন।');
          }
        );
      } else {
        alert('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchValue(term);

    if (term.length > 0) {
      const matchedCamps = camps.filter((camp) => camp.name.toLowerCase().includes(term));
      const matchedSuburbs = camps.flatMap((camp) => camp.suburbs ? camp.suburbs.filter((suburb) => suburb.name.toLowerCase().includes(term)) : []);
      setSuggestions([...matchedCamps, ...matchedSuburbs]);
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

      <button onClick={handleSearch} className="px-5 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
        খুঁজুন
      </button>
      <button onClick={handleReset} className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
        রিসেট
      </button>
      <button onClick={handleLocation} className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        {pathname === '/all-camp' ? 'হোমে যান' : 'আপনার লোকেশন খুঁজুন'}
      </button>
    </div>
  );
};

export default HeroBtn;
