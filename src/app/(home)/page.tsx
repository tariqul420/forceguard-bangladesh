import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 p-6 md:flex-row md:justify-center">
      <Link href={'/army'} className="bg-white shadow-lg rounded-2xl p-4 w-80 text-center border border-gray-200">
        <Image src={'/images/bd_army.png'} alt="Bangladesh Army" width={300} height={250} placeholder="blur" blurDataURL="/placeholder.png" loading="lazy" className="rounded-lg object-cover" />
        <h2 className="text-lg font-semibold mt-4">বাংলাদেশ সেনাবাহিনী</h2>
      </Link>
      <Link href={'/police'} className="bg-white shadow-lg rounded-2xl p-4 w-80 text-center border border-gray-200">
        <Image src={'/images/bd_police.png'} alt="Bangladesh Police" width={300} height={200} placeholder="blur" blurDataURL="/placeholder.png" loading="lazy" className="rounded-lg object-cover" />
        <h2 className="text-lg font-semibold mt-4">বাংলাদেশ পুলিশ, থানা</h2>
      </Link>
    </div>
  );
}
