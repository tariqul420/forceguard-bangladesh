'use client';

import { usePathname, useRouter } from 'next/navigation';

const HeroBtn = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handelLocation = () => {
    if (pathname === '/all-camp') {
      router.push('/');
    } else {
      // work now
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* সার্চ ইনপুট */}
      <input className="flex-1 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="text" placeholder="ক্যাম্প খুঁজুন..." />

      {/* সার্চ বাটন */}
      <button className="px-5 py-2 bg-green-700 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-green-800">খুঁজুন</button>

      {/* রিসেট বাটন */}
      <button className="px-5 py-2 bg-red-500 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-red-600">রিসেট</button>

      {/* লোকেশন বাটন */}
      <button onClick={handelLocation} className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer font-['Hind Siliguri'] text-[16px] transition-all duration-300 hover:bg-blue-700">
        {pathname === '/all-camp' ? 'হোমে যান' : 'আপনার লোকেশন খুঁজুন'}
      </button>
    </div>
  );
};

export default HeroBtn;
