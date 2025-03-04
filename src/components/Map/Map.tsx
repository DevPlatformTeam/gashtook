"use client";

import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

const Map = ({ locations }: { locations: { lat: number; lng: number }[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("خطا در دریافت موقعیت مکانی:", error);
        }
      );
    } else {
      console.error("مرورگر از Geolocation پشتیبانی نمی‌کند.");
    }
  }, []);

  const center = useMemo(() => userLocation || locations[0], [userLocation, locations]);

  if (!isLoaded) return <p>در حال بارگذاری نقشه...</p>;

  return (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }} center={center} zoom={12}>
      {locations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
      {/* نمایش موقعیت کاربر */}
      {userLocation && <Marker position={userLocation} />}
    </GoogleMap>
  );
};

export default Map;
