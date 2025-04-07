import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-white dark:bg-black">
      <FaSpinner className="text-4xl text-main animate-spin" />
    </div>
  );
};

export default Loading;
