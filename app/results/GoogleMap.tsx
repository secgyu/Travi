"use client";

import Script from "next/script";
import React, { AllHTMLAttributes, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

type Marker = {
  lat: number;
  lng: number;
  title: string;
};

interface GoogleMapProps {
  center: { lat: number; lng: number };
  level: number;
  ㅡarkers: Marker[];
}

function GoogleMap({ center, level = 3, markers }: GoogleMapProps) {
  const container = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    setIsLoading(false);
    if (!container.current) return;

    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
      window.google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
      window.google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
    ]);

    const innerMap = container.current.innerMap;
    innerMap.setOptions({ mapTypeControl: false });

    const makeMarker = (marker: Marker, innerMap) =>
      new AdvancedMarkerElement({
        map: innerMap,
        position: { lat: marker.lat, lng: marker.lng },
        title: marker.title,
      });

    makeMarker({ lat: container.current.center.lat(), lng: container.current.center.lng(), title: "aaa" }, innerMap);
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      )}
      <gmp-map
        ref={container}
        center={`${center.lat},${center.lng}`}
        zoom={level}
        map-id="DEMO_MAP_ID"
        style={{ height: "400px" }}
      ></gmp-map>

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps`}
        async
        onLoad={init}
      />
    </div>
  );
}

export default GoogleMap;
