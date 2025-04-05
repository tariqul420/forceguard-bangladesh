import dbConnect from '@/lib/dbConnect';
import Army from '@/models/Army';
import Link from 'next/link';

interface DivisionDocument {
  _id: string;
  count: number;
}

const DataStatisticsArmy = async () => {
  await dbConnect();
  const allCamps = await Army.estimatedDocumentCount();
  const divisionDetails: DivisionDocument[] = await Army.aggregate([
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
    <div className="mt-6 p-6 bg-dark rounded-lg shadow-md">
      <h2 className="text-2xl  font-bold text-main-700 mb-4">তথ্য পরিসংখ্যান</h2>
      <div className="space-y-4">
        <div>
          <span className="stat-label text-medium font-semibold">মোট ক্যাম্প: </span>
          <span className="text-lg">{allCamps}</span>
        </div>

        <div className="stat-item">
          <span className="font-semibold text-medium">বিভাগ অনুযায়ী:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {divisionDetails?.map((division, index) => (
              <Link href={`/army/division/${division?._id}`} key={index} className="p-4 bg-dark-input rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold">{division?._id}</h3>
                <p className="text-medium mt-2">
                  ক্যাম্প সংখ্যা: <span className="text-main-700">{division?.count}</span>
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
        <Link href={'/army/all-camp'} className="data-page-btn inline-block px-6 py-2 bg-dark-input rounded-md">
          সকল ডাটা দেখুন এক পেইজে
        </Link>
      </div>
    </div>
  );
};

export default DataStatisticsArmy;
