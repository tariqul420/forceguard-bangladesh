
import HeroBtn from '../HeroBtn';
import Title from '../Title';

const HeaderSectionPolice = () => {
  return (
    <header>
      {/* title and desc */}
      <Title title="বাংলাদেশে সকল থানার লোকেশন" desc="বাংলাদেশর সকল পুরুষ বাহিনীর লোকেশন এবং যোগাযোগের নম্বর" />

      {/* button container */}
      <div className="relative flex flex-col gap-4 mb-5">
        {/* btn and suggestion */}
        <HeroBtn />
      </div>
    </header>
  );
};

export default HeaderSectionPolice;
