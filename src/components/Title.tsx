type TitleProps = {
  title: string;
  desc: string;
};

const Title = ({ title, desc }: TitleProps) => {
  return (
    <div className="text-center mb-5 pb-4 border-b-2 border-b-main">
      <h1 className=" my-3 mt-3 text-[2em] font-semibold">{title}</h1>
      <p className="text-medium">{desc}</p>
    </div>
  );
};

export default Title;
