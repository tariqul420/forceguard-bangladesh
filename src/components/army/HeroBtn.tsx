"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

const HeroBtn = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("name") || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("name", e.target.value);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="relative w-full flex items-center">
        <FaSearch className="absolute text-gray-500 left-4" />
        <input
          className="w-full py-3 px-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          placeholder="ক্যাম্প খুঁজুন..."
          value={searchValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex items-center justify-center gap-8">
        <Link href="/" className="w-full px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer">
          <FiHome />
          হোমে যান
        </Link>
      </div>
    </div>
  );
};

export default HeroBtn;
