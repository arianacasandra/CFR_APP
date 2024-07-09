import { Link } from 'react-router-dom';

// Navigation bar

const App = () => {
  const outerContainerStyles = 'w-full flex items-center justify-center pt-48';
  const navbarStyles = 'bg-white p-4 rounded shadow';
  
  return (
    <div className={outerContainerStyles}>
      <header className={navbarStyles}>
        <nav className="flex space-x-28 font-medium text-center ">
          <Link to="/" className="hover:text-red-500 ease-in duration-150">
            Home
          </Link>
          <Link to="/login" className="hover:text-red-500 ease-in duration-150">
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-red-500 ease-in duration-150"
          >
            Register
          </Link>
          
        </nav>
      </header>
    </div>
  );
};

export default App;
