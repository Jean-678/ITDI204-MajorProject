import { useState, useEffect } from "react";

function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/accommodations")
      .then(res => res.json())
      .then(data => setAccommodations(data))
      .catch(err => console.error("Error fetching accommodations:", err));
  }, []);

  const filtered = accommodations.filter(place =>
    `${place.name} ${place.location} ${place.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page accommodations-page">
      <div className="page-header">
        <h1>Accommodations</h1>
        <p>
          Search and explore verified hotels, resorts, lodges, and guesthouses
          in Port Vila and Espiritu Santo.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, location, or type…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((place, index) => (
          <div key={index} className="accommodation-card enhanced">
            <div className="accommodation-content">
              <h3>{place.name}</h3>

              <div className="contact-section">
                <p>
                  <span className="icon">📍</span>
                  <strong>Address:</strong> {place.address}
                </p>

                <p>
                  <span className="icon">📞</span>
                  <strong>Phone:</strong> {place.phone}
                </p>

                {place.email && (
                  <p>
                    <span className="icon">✉️</span>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${place.email}`}>
                      {place.email}
                    </a>
                  </p>
                )}

                {place.website && (
                  <p>
                    <span className="icon">🌐</span>
                    <strong>Website:</strong>{" "}
                    <a
                      href={place.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit official site
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodations;