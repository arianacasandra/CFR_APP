import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";

const UserPage = ({ username }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [routes, setRoutes] = useState([]);
  const [minDate, setMinDate] = useState("");
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeOptions, setRouteOptions] = useState({});

  useEffect(() => {
    // Calculate tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISO = tomorrow.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    setMinDate(tomorrowISO);
  }, []);

  const handleSearch = () => {
    // Check if both "from" and "to" fields are filled
    if (from.trim() !== "" && to.trim() !== "") {
      fetch(`http://localhost:5110/Routes`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Filter routes based on the provided source and destination
          const filteredRoutes = data.filter(
            (route) => route.source === from && route.destination === to
          );
          setRoutes(filteredRoutes);
        })
        .catch((error) => {
          console.error("Error fetching routes:", error);
        });
    } else {
      // If either "from" or "to" field is empty, display an error message or handle it as needed
      console.log('Please enter both "From" and "To" fields.');
    }
  };

  const handleOptionChange = (routeId, option, price) => {
    setRouteOptions((prevOptions) => ({
      ...prevOptions,
      [routeId]: { option, price },
    }));
    setSelectedRoute(null); // Close the dropdown menu
  };

  const handleBuy = async (route) => {
    try {
      // Validate user ID and departure date (optional but recommended)
      if (!document.getElementById("departure-date").value) {
        throw new Error("Please select a departure date.");
      }

      const routeDetails = {
        userId: parseInt(localStorage.getItem("userId")),
        seatNumber: Math.floor(Math.random() * 100) + 1, // Generate random seat number
        routeId: route.id,

        departureDate: document.getElementById("departure-date").value,
        ticketType: routeOptions[route.id]?.option,
      };

      console.log("Route details:", routeDetails);

      const response = await fetch("http://localhost:5110/Tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeDetails),
      });

      if (!response.ok) {
        // Handle non-2xx status codes
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Ticket purchase failed (unknown error)"
        );
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Ticket purchased successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message); // Display user-friendly error message
    }
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
              to="/mytickets"
              className="bg-orange-500 px-4 py-2 rounded text-white"
            >
              Tickets
            </NavLink>
            <NavLink
              to="/login"
              className="bg-orange-500 px-4 py-2 rounded text-white"
            >
              Logout
            </NavLink>
            
          </div>
        </div>
      </div>

      <div
        className="bg-cover bg-center h-64"
        style={{ backgroundImage: "url('/train.jpg')" }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-3xl font-bold text-white">
            Buy the tickets online now!
          </h1>
        </div>
      </div>

      {/* Here lies the search */}
      <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Trains coverage</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="from" className="block text-zinc-700">
              From
            </label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-zinc-300 rounded p-2"
              placeholder="From"
            />
          </div>
          <div>
            <label htmlFor="to" className="block text-zinc-700">
              To
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-zinc-300 rounded p-2"
              placeholder="To"
            />
          </div>
          <div>
            <label htmlFor="departure-date" className="block text-zinc-700">
              Departure Date
            </label>
            <input
              type="date"
              id="departure-date"
              min={minDate} // Set the minimum date to tomorrow
              className="w-full border border-zinc-300 rounded p-2"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        {routes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <p className="font-bold">Route Details:</p>
            <p>
              From: {route.source} ------ To: {route.destination}
            </p>
            <p>Departure: {route.departureTime}</p>
            <p>Arrival: {route.arrivalTime}</p>
            <div className="relative">
              <button
                onClick={() => setSelectedRoute(route.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Select Ticket Type
              </button>
              {selectedRoute === route.id && (
                <div className="absolute bg-white border mt-2 py-2 rounded shadow-lg">
                  <button
                    onClick={() => handleOptionChange(route.id, "Student", 10)}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Student - $10
                  </button>
                  <button
                    onClick={() => handleOptionChange(route.id, "Elder", 8)}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Elder - $8
                  </button>
                  <button
                    onClick={() => handleOptionChange(route.id, "Adult", 15)}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Adult - $15
                  </button>
                </div>
              )}
            </div>
            {routeOptions[route.id] && (
              <div className="mt-4">
                <p>
                  Selected Option: {routeOptions[route.id].option} - Final
                  Price: ${routeOptions[route.id].price}
                </p>
                <button
                  onClick={() => handleBuy(route)}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  BUY
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPage;
