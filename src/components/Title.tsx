type TitleProps = {
    title: string;
    desc: string;
  };
  
  const Title = ({ title, desc }: TitleProps) => {
    return (
      <div className="text-center mb-5 pb-4 border-b-2 border-b-green">
        <h1 className="text-green my-3 mt-3 text-[2em] font-semibold">{title}</h1>
        <p>{desc}</p>
      </div>
    );
  };
  
  export default Title;
  