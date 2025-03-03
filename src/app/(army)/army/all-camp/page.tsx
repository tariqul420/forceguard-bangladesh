import dbConnect from '@/lib/dbConnect';
import Army from '@/models/Army';

export async function fetchArmyCamps() {
  await dbConnect();
  const services = await Army.find();
  return services;
}

const Page = async () => {
  const camps = (await fetchArmyCamps()) || [];

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
