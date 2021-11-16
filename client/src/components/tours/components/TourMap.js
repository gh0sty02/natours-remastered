import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

ReactMapGL.mapboxApiAccessToken =
  "pk.eyJ1IjoiZ2hvc3R5MDIiLCJhIjoiY2tvYTBnZXpsMDk1YjJvcW03OHR0NXp3ciJ9.Ros4tBhSNN2HpdjArt_Y2Q";

function TourInfoMap({ locations, startLocation }) {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: startLocation.coordinates[0],
    latitude: startLocation.coordinates[1],
    zoom: 6.5,
  });
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <section className="section-map">
      <div id="map">
        <ReactMapGL
          scrollZoom={false}
          mapStyle="mapbox://styles/ghosty02/ckoawbhnd0gyd17qnxkc6hzcq"
          MapboxAccessToken={
            "pk.eyJ1IjoiZ2hvc3R5MDIiLCJhIjoiY2tvYTBnZXpsMDk1YjJvcW03OHR0NXp3ciJ9.Ros4tBhSNN2HpdjArt_Y2Q"
          }
          {...viewport}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {locations.map((loc, i) => (
            <Marker
              offsetTop={-50}
              offsetLeft={-8}
              anchor="top"
              key={i}
              longitude={loc.coordinates[0]}
              latitude={loc.coordinates[1]}
              onClick={(e) => {
                e.preventDefault();
                setSelectedLocation(loc);
              }}
            >
              <div className="marker"></div>
            </Marker>
          ))}
          {selectedLocation && (
            <Popup
              longitude={selectedLocation.coordinates[0]}
              latitude={selectedLocation.coordinates[1]}
              anchor="top"
              onClose={() => setSelectedLocation(null)}
              style={{ height: "2rem", width: "3rem", fontSize: "1rem" }}
            >
              <div>
                <h2>{selectedLocation.description}</h2>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </section>
  );
}

export default TourInfoMap;
