"use client"

import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Location } from "@/app/[locale]/(main)/[city]/types/map";
import "./map.css";
import { useParams, useRouter } from "next/navigation";

const Map = ({ locations }: { locations: Location[] }) => {
  const router = useRouter();
  const { locale, city } = useParams();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

console.log(selectedMarker);


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
        return `${process.env.NEXT_PUBLIC_MAP_MARKER_URL}/images/home.png`; // آیکون رستوران
      case "hospital":
        return `${process.env.NEXT_PUBLIC_MAP_MARKER_URL}/images/hospital-marker.png`; // آیکون بیمارستان (در صورت وجود)
      case "shop":
        return `${process.env.NEXT_PUBLIC_MAP_MARKER_URL}/images/shopping.png`; // آیکون فروشگاه
      default:
        return `${process.env.NEXT_PUBLIC_MAP_MARKER_URL}/images/red-dot.png`; // آیکون پیش‌فرض (قرمز)
    }
  };

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
              url: getMarkerIcon("restaurant"),
              scaledSize: new window.google.maps.Size(30, 50),
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
            disableAutoPan: true,
            pixelOffset: new window.google.maps.Size(0, -30),
          }}
        >
          <div onClick={() => router.push(`/${locale}/${city}/${selectedMarker.category}/${selectedMarker.slug}`)} className="p-0 m-0 border-none w-64 h-40 relative rounded-lg overflow-hidden cursor-pointer">
            <button
              onClick={() => setSelectedMarker(null)}
              className="absolute top-2 end-2 z-20 bg-black/50 !w-8 !h-8 text-white rounded-full p-1 pt-0 justify-center text-center items-center hover:bg-black transition"
            >
              ✕
            </button>

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
            <span style={{fontFamily: 'Vazirmatn'}} className="absolute bottom-4 start-4 text-white font-bold text-lg z-20">
              {selectedMarker.title}
            </span>
          </div>
        </InfoWindow>



      )}
    </GoogleMap>
  );
};

export default Map;
