"use client"

import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Location } from "@/app/[locale]/(main)/[city]/types/map";

const Map = ({ locations }: { locations:  Location[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });
console.log(locations);

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

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

  // تعیین مرکز نقشه: در صورت وجود موقعیت کاربر از آن استفاده می‌شود و در غیر این صورت از اولین مکان لیست.
  const center = useMemo(() => {
    if (userLocation) return userLocation;
    if (locations && locations.length > 0) {
      return {
        lat: locations[0].lat,
        lng: locations[0].lng,
      };
    }
    return { lat: 0, lng: 0 };
  }, [userLocation, locations]);

  if (!isLoaded) return <p>در حال بارگذاری نقشه...</p>;

  return (
    <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }} center={center} zoom={12}>
      {locations.map((location, index) => {
        const position = { lat: location.lat, lng: location.lng };
        return (
          <Marker
            key={index}
            position={position}
            onClick={() => setSelectedMarker(location)}
          />
        );
      })}

      {userLocation && <Marker position={userLocation} />}

      {selectedMarker && (
        <InfoWindow
          position={{
            lat: selectedMarker.lat,
            lng: selectedMarker.lng,
          }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div
            className="relative w-full h-30 rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={selectedMarker.imageSrc}
              alt={selectedMarker.title}
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className="!relative !object-cover !w-full !h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <span style={{ fontFamily: 'Vazirmatn' }} className="absolute bottom-4 start-4 text-white font-bold z-20">{selectedMarker.title}</span>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;
