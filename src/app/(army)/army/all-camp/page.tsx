import dbConnect from '@/lib/dbConnect';
import Army from '@/models/Army';

// type srcParams = Promise<{ name: string }>;

const Page = async ({ searchParams }: { searchParams: Promise<{ name: string }> }) => {
  const { name } = (await searchParams) || {};
  await dbConnect();

  const query: Partial<Record<string, unknown>> = {};
  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  const camps = await Army.find(query);

  return (
    <div className="my-12 px-2 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center">সেনা ক্যাম্প তথ্য</h1>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="">
              <th className="px-2 md:px-4 py-2">নাম</th>
              <th className="px-2 md:px-4 py-2">আওতাধীন এলাকা</th>
              <th className="px-2 md:px-4 py-2">বিভাগ</th>
              <th className="px-2 md:px-4 py-2">যোগাযোগ নম্বর</th>
            </tr>
          </thead>
          <tbody>
            {camps.length > 0 ? (
              camps.map((camp, index) => (
                <tr key={index} className="hover:bg-dark border-b">
                  <td className="px-2 md:px-4 py-2">{camp?.name}</td>
                  <td className="px-2 md:px-4 py-2">{camp?.description}</td>
                  <td className="px-2 md:px-4 py-2">{camp?.division || 'অন্যান্য'}</td>
                  <td className="px-2 md:px-4 py-2">{camp?.phoneNumbers.length > 0 ? camp?.phoneNumbers?.join(', ') : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-medium py-4">
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
