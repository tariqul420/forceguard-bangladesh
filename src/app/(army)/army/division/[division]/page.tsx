import dbConnect from '@/lib/dbConnect';
import Army from '@/models/Army';

type dParams = Promise<{ division: string }>;

type srcParams = Promise<{ name: string }>;

const Page = async ({ params, searchParams }: { params: dParams; searchParams?: srcParams }) => {
  const { name } = (await searchParams) || {};
  const { division } = (await params) || {};
  const divisionDec = decodeURIComponent(division);
  await dbConnect();

  // Build the query conditionally
  const query: Partial<Record<string, unknown>> = { division: divisionDec };
  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  const data = await Army.find(query);

  return (
    <div className="my-12 px-2">
      <h1 className="text-2xl font-bold text-center">সেনা ক্যাম্প তথ্য || {divisionDec}</h1>

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
            {data.length > 0 ? (
              data.map((camp, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{camp.name}</td>
                  <td className="px-4 py-2">{camp.description}</td>
                  <td className="px-4 py-2">{camp?.division ? camp?.division : 'অন্যান্য'}</td>
                  <td className="px-4 py-2">{camp.phoneNumbers.length > 0 ? camp.phoneNumbers.join(', ') : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-4">
                  ❌ কোনো ক্যাম্প পাওয়া যায়নি
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
