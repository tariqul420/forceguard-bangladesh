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
  division: string;
};

const Page = async () => {
  const filePath = path.join(process.cwd(), 'public/camps.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const camps: Camp[] = JSON.parse(fileContents);

  return (
    <div className="my-12">
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
                <td className="px-4 py-2">{camp?.division ? camp?.division : 'অন্যান্য'}</td>
                <td className="px-4 py-2">{camp.phoneNumbers.length > 0 ? camp.phoneNumbers.join(', ') : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
