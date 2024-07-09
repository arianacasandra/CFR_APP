
import React, { useEffect,  useState } from 'react';

//import { useNavigate } from 'react-router-dom';

const Menu = ({ onPageLoad }) => {
  useEffect(() => {
    onPageLoad(); // Apelează funcția pentru a actualiza starea când componenta Menu este montată
  }, [onPageLoad]); // [] este un array gol, astfel încât efectul să fie apelat doar la montarea componentei
    
  // preia datele din form si le salveaza
    const [inputs, setInputs] = useState({});
   // const navigate = useNavigate();
    const handleChange = (event) => {
      const { name, value } = event.target;
      setInputs((values) => ({ ...values, [name]: value }));
    };
  
    const handleSubmit = (event) => {
  
      event.preventDefault();
     
      console.log(inputs);
    };
  return (
    <div className="pt-10 flex justify-center">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="italic">Search your destination</h1>
       
        <input 
         type='text'
         name = 'from'
         id = 'from'
         placeholder='From'
         autoComplete='off'
         className="form-control-material text-center text-black mb-5"
         required
         onChange={handleChange}
          >
        </input>
        

       <input
         type='text'
         name = 'to'
         id = 'to'
         placeholder='To'
         autoComplete='off'
         class="form-control-material text-center text-black  mb-5"
         required
         onChange={handleChange}
        >
        </input>
        <button className="button-login hover:red" type="submit">
            Search
        </button>

      </form>
    </div>
  );
  
};

export default Menu;
