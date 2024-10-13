import React, { useEffect, useState } from "react";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { toast } from "react-toastify";
function Map({ location, onChange, readonly }) {
  return (
    <div className=" relative w-[32rem] h-[22rem] text-center">
      <MapContainer
        className=" w-[100%] h-[100%]"
        dragging={!readonly}
        center={[0, 0]}
        zoom={1}
        touchZoom={!readonly}
        doubleClickZoom={!readonly}
        scrollWheelZoom={!readonly}
        boxZoom={!readonly}
        keyboard={!readonly}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FindButtonMarker
          readonly={readonly}
          location={location}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
}

const FindButtonMarker = ({ readonly, location, onChange }) => {
  const [position, setPosition] = useState(location);
  useEffect(() => {
    if (readonly) {
      map.setView(position, 13);
      return;
    }
    if (position) onChange(position);
  }, [position]);
  const map = useMapEvents({
    click(e) {
      !readonly && setPosition(e.latlng);
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
    locatoinerror(e) {
      toast.error(e.message);
    },
  });
  return (
    <>
      {!readonly && (
        <button
          className=" absolute m-auto h-7 w-[12rem] min-w-[2.5rem] font-bold top-0 left-0 right-0 z-[1000] bg-white cursor-pointe rounded-b-md hover:bg-gray-100 "
          type="button"
          onClick={() => map.locate()}
        >
          {" "}
          find my location
        </button>
      )}
      {position && (
        <Marker
          eventHandlers={{
            dragend: (e) => {
              setPosition(e.target.getLatLng());
            },
          }}
          position={position}
          draggable={!readonly}
        >
          <Popup>shipping location</Popup>
        </Marker>
      )}
    </>
  );
};

export default Map;
