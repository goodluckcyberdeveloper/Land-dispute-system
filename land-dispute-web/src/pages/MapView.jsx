import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView() {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
    try {
      setLoading(true);

      const res = await API.get("map/");

      setDisputes(res.data);

    } catch (err) {
      console.log(err);
      setError("Failed to load map data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading map...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;

  return (
    <div style={{ height: "100vh", width: "100%" }}>

      <h2 style={{ padding: "10px" }}>
        Land Disputes Map
      </h2>

      <MapContainer
        center={[-6.7924, 39.2083]} // Dar es Salaam
        zoom={12}
        style={{ height: "90vh", width: "100%" }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {disputes.map((d) => (
          <Marker
            key={d.id}
            position={[d.lat, d.lng]}
          >
            <Popup>

              <b>Case ID:</b> {d.id} <br />
              <b>Status:</b> {d.status} <br />

              <button
                onClick={() => navigate(`/dispute/${d.id}`)}
                style={{
                  marginTop: "5px",
                  padding: "5px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                View Full Details
              </button>

            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default MapView;