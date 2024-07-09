import React, { useState } from 'react';

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const { username, newpassword } = inputs; // Destructure username and newpassword from inputs state
  
    console.log("Requesting password reset for user:", username, newpassword);
    // Send a PUT request to the server to update the user's password
    return fetch(`http://localhost:5110/Users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: '', // Placeholder value
        userName: '',
        password: newpassword,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Username does not exist");
        } else {
          return response.text().then((errorMessage) => {
            throw new Error(`Server returned status ${response.status}: ${errorMessage}`);
          });
        }
      }
      // Password reset successful, display pop-up message
      window.alert("Password reset successfully");
  
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    })
    .catch((error) => {
      console.error("Error requesting password reset:", error);
      if (error.message === "Username does not exist") {
        window.alert("Username does not exist");
      }
    });
  };
  
  

  return (
    <div className="pt-10 flex justify-center">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter your username..."
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
        <label className="password pt-4">New Password</label>
        <input
          type="password"
          name="newpassword"
          id="newpassword"
          placeholder="Enter your new password..."
          autoComplete="off"
          className="form-control-material text-center text-black"
          required
          onChange={handleChange}
        />
     
        <div className="multiple-choice-login">
          <button className="button-login hover:red" type="submit">
            Reset Password
          </button>
          <a
            href="./login"
            className="hover:text-red-400 ease-in duration-150 pt-4"
          >
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
