import fs from 'fs/promises';
import path from 'path';

type Camp = {
  name: string;
  location: {
    latitude: string;
    longitude: string;
  };
  description: string;
  phoneNumbers: string[];
};

const getDivision = (campName: string) => {
  const divisionMapping: Record<string, string[]> = {
    'ঢাকা': ['ঢাকা', 'গাজীপুর', 'মুন্সিগঞ্জ', 'নারায়ণগঞ্জ', 'মানিকগঞ্জ', 'নরসিংদী', 'কিশোরগঞ্জ', 'টাঙ্গাইল', 'মাদারীপুর', 'শরিয়তপুর', 'ফরিদপুর', 'রাজবাড়ী', 'গোপালগঞ্জ'],
    'চট্টগ্রাম': ['চট্টগ্রাম', 'কক্সবাজার', 'নোয়াখালী', 'ফেনী', 'লক্ষ্মীপুর', 'চাঁদপুর', 'কুমিল্লা', 'ব্রাহ্মণবাড়িয়া'],
    'খুলনা': ['খুলনা', 'বাগেরহাট', 'সাতক্ষীরা', 'যশোর', 'ঝিনাইদহ', 'কুষ্টিয়া', 'চুয়াডাঙ্গা', 'মেহেরপুর', 'নড়াইল', 'মাগুরা'],
    'রাজশাহী': ['রাজশাহী', 'নাটোর', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ', 'পাবনা', 'সিরাজগঞ্জ', 'বগুড়া', 'জয়পুরহাট'],
    'বরিশাল': ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'ঝালকাঠি', 'পিরোজপুর'],
    'সিলেট': ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ'],
    'রংপুর': ['রংপুর', 'দিনাজপুর', 'নীলফামারী', 'কুড়িগ্রাম', 'লালমনিরহাট', 'গাইবান্ধা', 'ঠাকুরগাঁও', 'পঞ্চগড়'],
    'ময়মনসিংহ': ['ময়মনসিংহ', 'নেত্রকোণা', 'জামালপুর', 'শেরপুর']
  };

  for (const [division, districts] of Object.entries(divisionMapping)) {
    if (districts.some(district => campName.includes(district))) {
      return division;
    }
  }
  return 'অন্যান্য';
};

const Page = async () => {
  const filePath = path.join(process.cwd(), 'public/camps.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const camps: Camp[] = JSON.parse(fileContents);

  return (
    <div className='my-12'>
      <h1 className="text-2xl font-bold text-center">সেনা ক্যাম্প তথ্য</h1>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">নাম</th>
              <th className="px-4 py-2">আওতাধীন এলাকা</th>
              <th className="px-4 py-2">বিভাগ</th>
              <th className="px-4 py-2">যোগাযোগ নম্বর</th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2">{camp.name}</td>
                <td className="px-4 py-2">{camp.description}</td>
                <td className="px-4 py-2">{getDivision(camp.name)}</td>
                <td className="px-4 py-2">{camp.phoneNumbers.length > 0 ? camp.phoneNumbers.join(", ") : "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
