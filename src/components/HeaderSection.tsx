const HeaderSection = () => {
  return (
    <header>
      {/* title and desc */}
      <div className="text-center mb-5 pb-4 border-b-2 border-b-green">
        <h1 className="text-green my-3 mt-3 text-[2em] font-semibold">বাংলাদেশে সেনাবাহিনীর ক্যাম্প লোকেশন</h1>
        <p>বর্তমান অন্তর্বর্তী সরকারের অধীনে সেনাবাহিনীর ক্যাম্পসমূহের লোকেশন এবং যোগাযোগের নম্বর</p>
      </div>

      {/* button container */}
      <div className="flex mb-5 top-[10px] relative gap-4">
        <input className="flex-1/2 py-3 px-4 border border-[#ddd] rounded-[4px]" type="text" placeholder="ক্যাম্প খুঁজুন..." />
        <button className="px-5 py-2 bg-[#006A4E] text-white border-none rounded-md cursor-pointer font-[Hind Siliguri] text-[16px] transition-colors duration-300 hover:bg-green-700">খুঁজুন</button>
        <button className="px-5 py-2 bg-red-500 text-white border-none rounded-md cursor-pointer font-[Hind Siliguri] text-[16px] transition-colors duration-300 hover:bg-red-600">রিসেট</button>
        <button className="px-5 py-2 bg-[#007bff] text-white border-0 rounded-md cursor-pointer font-['Hind_Siliguri'] text-[16px] transition-colors duration-300 hover:bg-[#0056b3]">
          আপনার লোকেশন খুঁজুন
        </button>

        {/* suggestions camp name */}
        <div className="absolute bg-white border border-gray-300 top-full rounded-md max-h-[200px] overflow-y-auto w-[calc(100%-40px)] z-[9999999] shadow-lg hidden">
          {/* Suggestions content here */}
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
