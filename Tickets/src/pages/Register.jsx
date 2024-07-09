import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);  // State variable for success message
  const navigate = useNavigate();  // Initialize useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    setError('');
    setSuccess(false);  // Reset success state on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs.userName);

    const { confirm_password, ...payload } = inputs;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      setError('Invalid email format');
      return;
    }

    if (inputs.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (inputs.password !== inputs.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    fetch("http://localhost:5110/Users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(response => {
      if (response.status === 409) {
        // If response status is 409, parse the response JSON to get the error message
        return response.json().then(data => {
          setError(data.message);
          throw new Error(data.message); // Throw an error to stop further processing
        });
      }
      return response.json();
    })
      .then((data) => {
        console.log("Success:", data);
        setSuccess(true);  // Set success state

        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);  // 2-second delay before redirect
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="pt-10 flex justify-center">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="italic">Register form</h1>
        <label className="" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email"
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
        <label className="username">Username</label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="Enter your username"
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
        <label className="" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
        <label className="" htmlFor="confirm_password">
          Confirm password
        </label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm your password "
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
        <div className="multiple-choice-login">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="button-login" type="submit">
            Register
          </button>
        </div>
      </form>
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Successfully Registered</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
