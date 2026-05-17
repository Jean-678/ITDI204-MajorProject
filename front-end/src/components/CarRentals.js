import { useState, useEffect } from "react";
import avis from "../images/car_logos/avisvanuatu.png";
import budget from "../images/car_logos/budgetvanuatu.png";
import europcar from "../images/car_logos/europcar.jpg";
import globaldrive from "../images/car_logos/globaldrive.jpg";
import go2rent from "../images/car_logos/go2rent.png";
import hertz from "../images/car_logos/hertz.png";
import onwheels from "../images/car_logos/onwheelsvanuatu.png";
import pacificcarhire from "../images/car_logos/pacificcarhire.png";
import santocarhire from "../images/car_logos/santocarhire.png";
import santotropical from "../images/car_logos/santotropicalcar.jpg";
import wanderlust from "../images/car_logos/wanderlust.png";
import worldcar from "../images/car_logos/worldcarrentals.jpg";

function CarRentals() {
  const [rentals, setRentals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/car-rentals")
      .then(res => res.json())
      .then(data => setRentals(data))
      .catch(err => console.error("Error fetching car rentals:", err));
  }, []);

  const logos = {
    "World Car Rentals Vanuatu": worldcar,
    "Europcar Vanuatu": europcar,
    "Avis Vanuatu": avis,
    "Hertz Car Rental": hertz,
    "Budget Vanuatu": budget,
    "On Wheels Vanuatu": onwheels,
    "Go2Rent": go2rent,
    "Global Drive Car Rentals": globaldrive,
    "GLOBAL DRIVE CAR RENTALS": globaldrive,
    "Santo Tropical Car Rentals": santotropical,
    "Pacific Car Hire Santo": pacificcarhire,
    "Pacific Car Hire": pacificcarhire,
    "Santo Car Hire": santocarhire,
    "Wanderlust Rentals & Tours": wanderlust,
    "Wanderlust Rental & Tours": wanderlust
  };

  const filtered = rentals.filter(r =>
    `${r.name} ${r.location} ${r.services}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page accommodations-page">
      <div className="page-header">
        <h1>Car Rentals</h1>
        <p>Compare trusted car rental companies across Vanuatu.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search car rentals…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((r, i) => (
          <div key={i} className="accommodation-card enhanced">

            <div className="logo-box">
              {logos[r.name] && (
                <img src={logos[r.name]} alt={`${r.name} logo`} />
              )}
            </div>

            <div className="accommodation-content">
              <h3>{r.name}</h3>
              <p className="meta">{r.location}</p>
              <p>{r.services}</p>

              <div className="contact-section">
                <p>
                  <span className="icon">📍</span>
                  {r.address}
                </p>

                <p>
                  <span className="icon">📞</span>
                  {r.phone}
                </p>

                {r.email && (
                  <p>
                    <span className="icon">✉️</span>
                    <a href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                  </p>
                )}

                <p>
                  <a href={r.website} target="_blank" rel="noopener noreferrer">
                    Visit official site
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRentals;