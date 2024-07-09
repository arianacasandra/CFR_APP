import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const userId = localStorage.getItem("userId");
  const [routes, setRoutes] = useState({});

  useEffect(() => {
    // Fetch tickets for the user
    fetch(`http://localhost:5110/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTickets(data);
          // Fetch routes for each ticket
          const fetchPromises = data.map((ticket) => {
            return fetch(`http://localhost:5110/Routes/${ticket.routeId}`)
              .then((response) => response.json())
              .then((routeData) => ({ [ticket.id]: routeData }))
              .catch((error) => console.error("Error fetching route:", error));
          });

          Promise.all(fetchPromises)
            .then((ticketRoutes) => {
              console.log(ticketRoutes);
              // Combine route information for all tickets into a single object
              const routesObject = Object.assign({}, ...ticketRoutes);
              setRoutes(routesObject);
            })
            .catch((error) => console.error("Error fetching routes:", error));
        } else {
          console.log("No tickets received");
        }
      })
      .catch((error) => console.error("Error fetching tickets:", error));
  }, [userId]);

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
              to="/userpage"
              className="bg-orange-500 px-4 py-2 rounded text-white"
            >
              Back
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

      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white shadow-md rounded-lg max-w-xs"
            >
              <div style={{ width: "300px", height: "200px" }} className="p-4">
                <p>
                  <strong>Seat Number:</strong> {ticket.seatNumber}
                </p>
                <p>
                  <strong>Ticket Type:</strong> {ticket.ticketType}
                </p>
                <p>
                  <strong>Departure Date:</strong> {ticket.departureDate}
                </p>
                {routes[ticket.id] && (
                  <div>
                    <p>
                      <strong>Source:</strong> {routes[ticket.id].source}
                    </p>
                    <p>
                      <strong>Destination:</strong>{" "}
                      {routes[ticket.id].destination}
                    </p>
                    <p>
                      <strong>Departure Time:</strong>{" "}
                      {routes[ticket.id].departureTime}
                    </p>
                    <p>
                      <strong>Arriving Time:</strong>{" "}
                      {routes[ticket.id].arrivalTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TicketPage;
