const Home = () => {
  return (
    <div className="flex items-center justify-center pt-10">
      <div className="text-center">
        <h1 className="text-6xl text-white font-extralight">
          Ticket Application
        </h1>
        <p className="italic font-extralight mt-4 text-white">A ticket booth simulation</p>
        <div className="w-1/2 h-px bg-white my-4 mx-auto "></div>{' '}
        <div className="mt-10 mx-auto ml-8">
          <div className="content">
            <div className="buildings"></div>
            <div className="windows"></div>
            <div className="bridge"></div>
            <div className="train">
              <div className="carOne"></div>
              <div className="carTwo"></div>
              <div className="carThree"></div>
            </div>
            <div className="moon"></div>
            <div className="stars"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
