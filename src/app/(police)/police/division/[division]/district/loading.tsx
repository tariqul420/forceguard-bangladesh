import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <FaSpinner className="text-4xl text-main animate-spin" />
    </div>
  );
};

export default Loading;
