import dbConnect from '@/lib/dbConnect';
import Army from '@/models/Army';
import Link from 'next/link';

const DataStatistics = async () => {
  await dbConnect();
  const allCamps = await Army.estimatedDocumentCount();
  const divisionDetails = await Army.aggregate([
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
      <h2 className="text-2xl font-bold text-green-700 mb-4">তথ্য পরিসংখ্যান</h2>
      <div className="space-y-4">
        <div>
          <span className="stat-label font-semibold text-gray-800">মোট ক্যাম্প: </span>
          <span className="text-green-700 text-lg">{allCamps}</span>
        </div>

        <div className="stat-item">
          <span className="font-semibold text-gray-800">বিভাগ অনুযায়ী:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {divisionDetails?.map((division, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-green-700">{division?._id}</h3>
                <p className="text-gray-600 mt-2">
                  ক্যাম্প সংখ্যা: <span className="text-green-700">{division?.count}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nearby camps section */}
      {/* <div className="nearby-camps-list mt-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">নিকটবর্তী ক্যাম্পসমূহ</h3>
        {nearbyCamps.length === 0 ? (
          <div>
            <p className="text-gray-600">কোন ক্যাম্প পাওয়া যায়নি</p>
            {locationError && (
              <div className="mt-4">
                <p className="text-red-500">{locationError}</p>
                <button onClick={handleFindLocation} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300">
                  লোকেশন এক্সেস দিন
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nearbyCamps.map((camp) => (
              <div key={camp.name} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-green-700">{camp.name}</h3>
                {camp.description && <p className="text-sm text-gray-600 mt-2">{camp.description}</p>}
                {camp.phoneNumbers && camp.phoneNumbers.length > 0 && (
                  <div className="mt-3">
                    <span className="font-semibold text-gray-800">যোগাযোগ:</span>
                    {camp.phoneNumbers.map((phone) => (
                      <a key={phone} href={`tel:${phone}`} className="block text-blue-500 hover:text-blue-700 mt-1">
                        {phone}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Data page button */}
      <div className="mt-6 flex justify-center">
        <Link href={'/army/all-camp'} className="data-page-btn inline-block px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all duration-300">
          সকল ডাটা দেখুন এক পেইজে
        </Link>
      </div>
    </div>
  );
};

export default DataStatistics;
