"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google: any;
  }
}

declare module "react" {
  interface IntrinsicElements {
    "gmp-map": any;
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
  markers?: Marker[];
}

interface GmpMapElement extends HTMLElement {
  innerMap?: any;
  center?: { lat: number; lng: number };
}

function GoogleMap({ center, level = 3, markers = [] }: GoogleMapProps) {
  const container = useRef<GmpMapElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (container.current && center) {
      container.current.center = { lat: center.lat, lng: center.lng };
    }
  }, [center]);

  useEffect(() => {
    const updateMarkers = async () => {
      if (!container.current?.innerMap || !window.google) return;

      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      const innerMap = container.current.innerMap;

      if (!innerMap) return;

      const makeMarker = (markerData: Marker) => {
        const newMarker = new AdvancedMarkerElement({
          map: innerMap,
          position: { lat: markerData.lat, lng: markerData.lng },
          title: markerData.title,
        });
        markersRef.current.push(newMarker);
        return newMarker;
      };

      markers.forEach((markerData) => makeMarker(markerData));
    };

    void updateMarkers();
  }, [markers]);

  const init = async () => {
    setIsLoading(false);
    if (!container.current) return;

    container.current.center = { lat: center.lat, lng: center.lng };

    await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

    const innerMap = container.current.innerMap;
    if (!innerMap) return;

    innerMap.setOptions({ mapTypeControl: false });

    const makeMarker = (markerData: Marker) => {
      const newMarker = new AdvancedMarkerElement({
        map: innerMap,
        position: { lat: markerData.lat, lng: markerData.lng },
        title: markerData.title,
      });
      markersRef.current.push(newMarker);
      return newMarker;
    };

    markers.forEach((markerData) => makeMarker(markerData));
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      )}
      {/* @ts-expect-error - gmp-map is a Google Maps web component */}
      <gmp-map ref={container} zoom={level} map-id="DEMO_MAP_ID" style={{ height: "400px" }}></gmp-map>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps`}
        async
        onLoad={init}
      />
    </div>
  );
}

export default GoogleMap;
