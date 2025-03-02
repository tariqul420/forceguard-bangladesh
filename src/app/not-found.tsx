import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-163px)] flex flex-col items-center justify-center bg-white shadow-2xl rounded-lg p-6">
      <div className="text-center space-y-6">
        {/* Error Icon */}
        <div className="text-8xl text-red-500 dark:text-red-400">
          <span role="img" aria-label="Error">
            😞
          </span>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold">Oops! Something went wrong.</h1>
        <p className="text-lg">The page you&apos;re looking for doesn&apos;t exist or an error occurred.</p>

        {/* Back to Home Button */}
        <Link
          href={'/'}
          className="mt-6 px-6 py-3 bg-green text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
