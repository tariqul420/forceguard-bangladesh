'use client';

import useData from '@/hook/useData';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FaMapMarkedAlt, FaSearch } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FiHome } from 'react-icons/fi';

const HeroBtn = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('name') || '');
  const { setMapLocation } = useData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set('name', e.target.value);
      setMapLocation({ latitude: 23.8103, longitude: 90.4125, zoom: 7 });
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleLocation = () => {
    if (pathname === '/army/all-camp' || pathname?.startsWith('/army/division')) {
      router.push('/army');
    } else if (pathname?.startsWith('/police/all-police-station') || pathname?.startsWith('/police/division')) {
      router.push('/police');
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapLocation({ latitude: latitude, longitude: longitude, zoom: 50 });
          },
          (error) => {
            console.error('Error getting location:', error.message);
          },
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 p-4 md:p-6 lg:p-8">
      <div className="relative w-full flex items-center">
        <FaSearch className="absolute text-gray-500 left-4" />
        <input
          className="w-full py-3 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          type="text"
          placeholder="ক্যাম্প খুঁজুন..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
        <button onClick={handleLocation} className="w-full  px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
          {pathname === '/army/all-camp' || pathname?.startsWith('/army/division') || pathname?.startsWith('/police/all-police-station') || pathname?.startsWith('/police/division') ? (
            <FaMapMarkedAlt />
          ) : (
            <FaLocationDot />
          )}
          {pathname === '/army/all-camp' || pathname?.startsWith('/army/division') || pathname?.startsWith('/police/all-police-station') || pathname?.startsWith('/police/division')
            ? 'ম্যাপ পেইজে যান'
            : 'আপনার লোকেশন খুঁজুন'}
        </button>

        <Link href="/" className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
          <FiHome />
          হোমে যান
        </Link>
      </div>
    </div>
  );
};

export default HeroBtn;
