"use client"

import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Location } from "@/app/[locale]/(main)/[city]/types/map";
import "./map.css";

const Map = ({ locations }: { locations:  Location[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

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

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case "restaurant":
        return "https://maps.google.com/mapfiles/ms/icons/restaurant.png"; // آیکون رستوران
      case "hospital":
        return "https://maps.google.com/mapfiles/ms/icons/hospitals.png"; // آیکون بیمارستان
      case "shop":
        return "https://maps.google.com/mapfiles/ms/icons/shopping.png"; // آیکون فروشگاه
      default:
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png"; // آیکون پیش‌فرض (قرمز)
    }
  };
  
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
    <GoogleMap mapContainerStyle={{ width: "100%", height: "520px" }} center={center} zoom={12}>
      {locations.map((location, index) => {
        const position = { lat: location.lat, lng: location.lng };
        return (
<Marker

  key={index}
  position={position}
  icon={{
    url: getMarkerIcon("restaurant"), // تابع برای دریافت آیکون مناسب
    scaledSize: new window.google.maps.Size(40, 40), // اندازه آیکون (40x40 پیکسل)
  }}
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
  options={{
    disableAutoPan: true, // جلوگیری از حرکت اتوماتیک نقشه
    pixelOffset: new window.google.maps.Size(0, -30), // تنظیم مکان صحیح
  }}
>
  <div className="p-0 m-0 border-none w-64 h-40 relative rounded-lg overflow-hidden">
    {/* دکمه بستن سفارشی */}
    <button
      onClick={() => setSelectedMarker(null)}
      className="absolute top-2 end-2 z-20 bg-black/50 !w-8 !h-8 text-white rounded-full p-1 justify-center text-center items-center hover:bg-black transition"
    >
      ✕
    </button>

    {/* عکس بدون حاشیه */}
    <Image
      src={selectedMarker.imageSrc}
      alt={selectedMarker.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
    />

    {/* افکت گرادیان */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

    {/* عنوان */}
    <span className="absolute bottom-4 start-4 text-white font-bold text-lg z-20">
      {selectedMarker.title}
    </span>
  </div>
</InfoWindow>



      )}
    </GoogleMap>
  );
};

export default Map;
