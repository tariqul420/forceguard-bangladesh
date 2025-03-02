import HeroBtn from './HeroBtn';
import Title from './Title';

const HeaderSection = () => {
  return (
    <header>
      {/* title and desc */}
      <Title title="বাংলাদেশে সেনাবাহিনীর ক্যাম্প লোকেশন" desc="বর্তমান অন্তর্বর্তী সরকারের অধীনে সেনাবাহিনীর ক্যাম্পসমূহের লোকেশন এবং যোগাযোগের নম্বর" />

      {/* button container */}
      <div className="relative flex flex-col gap-4 mb-5">
        {/* btn and suggestion */}
        <HeroBtn />
      </div>
    </header>
  );
};

export default HeaderSection;
