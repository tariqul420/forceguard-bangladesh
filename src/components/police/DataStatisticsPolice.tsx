import dbConnect from '@/lib/dbConnect';
import Police from '@/models/Police';
import Link from 'next/link';

interface DivisionDocument {
  _id: string;
  count: number;
}

const DataStatisticsPolice = async () => {
  await dbConnect();
  const allStation = await Police.estimatedDocumentCount();
  const divisionDetails: DivisionDocument[] = await Police.aggregate([
    {
      $group: {
        _id: '$division',
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-main-700 mb-4">তথ্য পরিসংখ্যান</h2>
      <div className="space-y-4">
        <div>
          <span className="stat-label font-semibold text-gray-800">মোট থানা: </span>
          <span className="text-main-700 text-lg">{allStation}</span>
        </div>

        <div className="stat-item">
          <span className="font-semibold text-gray-800">বিভাগ অনুযায়ী:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {divisionDetails?.map((division, index) => (
              <Link href={`/police/division/${division?._id}`} key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-main-700">{division?._id}</h3>
                <p className="text-gray-600 mt-2">
                  থানার সংখ্যা: <span className="text-main-700">{division?.count}</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby camps section */}
      {/* This is a feature plane */}

      {/* Data page button */}
      <div className="mt-6 flex justify-center">
        <Link href={'/police/all-police-station'} className="data-page-btn inline-block px-6 py-2 bg-main-700 text-white rounded-md hover:bg-main-800 transition-all duration-300">
          সকল ডাটা দেখুন এক পেইজে
        </Link>
      </div>
    </div>
  );
};

export default DataStatisticsPolice;
