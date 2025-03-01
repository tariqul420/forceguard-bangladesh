'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const HeroBtn = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleSearch = () => {
    if (searchValue.trim() === '') {
      alert('অনুগ্রহ করে একটি ক্যাম্পের নাম লিখুন!');
    } else {
      alert(`আপনি খুঁজছেন: ${searchValue}`);
    }
  };

  const handleReset = () => {
    setSearchValue('');
  };

  const handleLocation = () => {
    if (pathname === '/all-camp') {
      router.push('/');
    } else {
      if (navigator.geolocation) {
        const options = {
          enableHighAccuracy: true, // Use GPS if available
          timeout: 10000, // Wait up to 10 seconds
          maximumAge: 0, // Do not use a cached position
        };

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            alert(`আপনার লোকেশন: Latitude: ${latitude}, Longitude: ${longitude}`);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert('লোকেশন এক্সেস দেওয়া হয়নি। অনুগ্রহ করে ব্রাউজার সেটিংস থেকে লোকেশন এক্সেস অন করুন।');
                break;
              case error.POSITION_UNAVAILABLE:
                alert('লোকেশন তথ্য পাওয়া যায়নি।');
                break;
              case error.TIMEOUT:
                alert('লোকেশন অনুরোধের সময় শেষ হয়েছে। আবার চেষ্টা করুন।');
                break;
              default:
                alert('একটি অজানা সমস্যা হয়েছে।');
            }
            alert(error);
          },
          options
        );
      } else {
        alert('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।');
        alert('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না।');
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* সার্চ ইনপুট */}
      <input
        className="flex-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        type="text"
        placeholder="ক্যাম্প খুঁজুন..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {/* সার্চ বাটন */}
      <button
        onClick={handleSearch}
        className="px-5 py-2 bg-green-700 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-green-800"
      >
        খুঁজুন
      </button>

      {/* রিসেট বাটন */}
      <button
        onClick={handleReset}
        className="px-5 py-2 bg-red-500 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-red-600"
      >
        রিসেট
      </button>

      {/* লোকেশন বাটন */}
      <button
        onClick={handleLocation}
        className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-blue-700"
      >
        {pathname === '/all-camp' ? 'হোমে যান' : 'আপনার লোকেশন খুঁজুন'}
      </button>
    </div>
  );
};

export default HeroBtn;