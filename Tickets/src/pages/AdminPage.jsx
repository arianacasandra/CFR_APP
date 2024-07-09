import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    return fetch("http://localhost:5110/Users")
      .then(response => response.json())
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  };
  
  const handleBan = (userId) => {
    return fetch(`http://localhost:5110/ban/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, 
        email: "", 
        userName: "", 
        password: "",
        isBanned: 1, // Placeholder value
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(`Server returned status ${response.status}: ${errorMessage}`);
          });
        }
        window.alert('User banned successfully');
        return fetchUsers();
      })
      .catch((error) => {
        console.error("Error banning user:", error);
      });
  };
  
  const handleUnban = (userId) => {
    return fetch(`http://localhost:5110/ban/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, // Placeholder value
        email: "", // Placeholder value
        userName: "", // Placeholder value
        password: "",
        isBanned: 0, // Placeholder value
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(`Server returned status ${response.status}: ${errorMessage}`);
          });
        }
        window.alert('User unbanned successfully');
        return fetchUsers();
      })
      .catch((error) => {
        console.error("Error unbanning user:", error);
      });
  };
  
  
  
  const handleDelete = (userId) => {
    return fetch(`http://localhost:5110/Users/${userId}`, {
      method: "DELETE",
    })
      .then(() => fetchUsers())
      .catch(error => {
        console.error("Error deleting user:", error);
      });
  };
  

  return (
    <>
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-4 px-6">
          <div className="flex items-center space-x-4">
            <img src="/logo.jpg" alt="Logo" className="h-10" />
            <div className="text-lg font-bold">CFR Travellers</div>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-center w-full uppercase">
              {localStorage.getItem("username")}
            </label>
            <NavLink
              to="/login"
              className="bg-orange-500 px-4 py-2 rounded text-white"
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">
          User List
        </h1>
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded shadow p-4">
              <div className="font-bold mb-2">Username: {user.userName}</div>
              <div className="mb-2">Password: {user.password}</div>
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleBan(user.id)}
                >
                  Ban
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleUnban(user.id)}
                >
                  Unban
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPage;
