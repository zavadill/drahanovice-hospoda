"use client";

import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useRef } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "5px",
};

const center = {
  lat: 49.58411103895672,
  lng: 17.08657266750567,
};

export default function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            mapTypeControl: false, // ← SKRYJE přepínání "Map / Satellite"
            fullscreenControl: false, // ← volitelně: skryje fullscreen
            streetViewControl: false, // ← volitelně: skryje street view panáčka
            zoomControl: true, // ← např. zobrazí jen zoom tlačítka
  }}
    >
    </GoogleMap>
  ) : (
    <p>Načítání mapy…</p>
  );
}
