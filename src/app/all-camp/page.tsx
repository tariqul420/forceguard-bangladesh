const page = async () => {
    const res = await fetch('/camps.json');
    const camps = await res.json();
    console.log(camps);


  return <div>hello dev</div>;
};

export default page;
