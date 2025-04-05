import dbConnect from '@/lib/dbConnect';
import Police from '@/models/Police';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

interface DistrictDocument {
  _id: string;
  count: number;
}

type dParams = Promise<{ division: string }>;

const Page = async ({ params }: { params: dParams }) => {
  const { division } = (await params) || {};
  const divisionDec = decodeURIComponent(division);

  await dbConnect();

  const districtDetails: DistrictDocument[] = await Police.aggregate([
    { $match: { division: divisionDec } },
    {
      $group: {
        _id: '$district',
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return (
    <div className="my-12 px-4">
      <h2 className="text-2xl font-bold text-center text-main">{divisionDec.replace(/\s*\(.*?\)/, '')} বিভাগের অধীনস্থ জেলা সমূহ</h2>

      {districtDetails.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {districtDetails.map(({ _id, count }) => (
            <Link
              key={_id}
              href={`/police/division/${divisionDec}/district/${encodeURIComponent(_id)}`}
              className="block p-5 border border-gray-200 rounded-2xl shadow-md bg-white 
                         transition-all hover:shadow-lg hover:border-main">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-red-500 text-lg" />
                  <span className="font-semibold text-lg">{_id}</span>
                </div>
                <HiArrowRight className="text-main text-xl" />
              </div>
              <p className="text-gray-600 mt-2">
                মোট <span className="text-main font-bold">{count}</span> টি থানা আছে
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">❌ এই বিভাগের অধীনে কোনো জেলা পাওয়া যায়নি</p>
      )}
    </div>
  );
};

export default Page;
