"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

// Google Maps 타입 정의
interface GoogleMapInstance {
  setOptions: (options: { mapTypeControl: boolean }) => void;
}

interface GoogleMapsLibrary {
  maps: {
    importLibrary: (name: string) => Promise<{ AdvancedMarkerElement: AdvancedMarkerElementConstructor }>;
  };
}

interface AdvancedMarkerElementConstructor {
  new (options: {
    map: GoogleMapInstance;
    position: { lat: number; lng: number };
    title: string;
    content: HTMLElement;
    zIndex: number;
  }): AdvancedMarkerInstance;
}

interface AdvancedMarkerInstance {
  map: GoogleMapInstance | null;
}

declare global {
  interface Window {
    google: GoogleMapsLibrary;
  }
}

declare module "react" {
  interface IntrinsicElements {
    "gmp-map": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      zoom?: number;
      "map-id"?: string;
    };
  }
}

type Marker = {
  lat: number;
  lng: number;
  title: string;
  index?: number;
};

interface GoogleMapProps {
  center: { lat: number; lng: number };
  level: number;
  markers?: Marker[];
  selectedIndex?: number;
}

function createMarkerContent(index: number, isSelected: boolean): HTMLDivElement {
  const mintColor = "#4db6ac";
  const mintColorDark = "#26a69a";

  const div = document.createElement("div");
  div.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${isSelected ? "42px" : "34px"};
    height: ${isSelected ? "42px" : "34px"};
    border-radius: 50%;
    font-weight: bold;
    font-size: ${isSelected ? "16px" : "14px"};
    box-shadow: ${
      isSelected
        ? "0 6px 12px -2px rgba(77, 182, 172, 0.4), 0 3px 6px -2px rgba(0, 0, 0, 0.1)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    };
    border: ${isSelected ? "3px" : "2px"} solid ${isSelected ? "white" : mintColor};
    background-color: ${isSelected ? mintColorDark : "white"};
    color: ${isSelected ? "white" : mintColorDark};
    cursor: pointer;
    transition: all 0.2s ease;
    transform: ${isSelected ? "scale(1.1)" : "scale(1)"};
  `;
  div.textContent = String(index);
  return div;
}

interface GmpMapElement extends HTMLElement {
  innerMap?: GoogleMapInstance;
  center?: { lat: number; lng: number };
}

function GoogleMap({ center, level = 3, markers = [], selectedIndex = 0 }: GoogleMapProps) {
  const container = useRef<GmpMapElement | null>(null);
  const [isLoading, setIsLoading] = useState(() => (typeof window !== "undefined" ? !window.google : true));
  const markersRef = useRef<AdvancedMarkerInstance[]>([]);

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

      const makeMarker = (markerData: Marker, idx: number) => {
        const isSelected = idx === selectedIndex;
        const content = createMarkerContent(idx + 1, isSelected);

        const newMarker = new AdvancedMarkerElement({
          map: innerMap,
          position: { lat: markerData.lat, lng: markerData.lng },
          title: markerData.title,
          content: content,
          zIndex: isSelected ? 1000 : idx,
        });
        markersRef.current.push(newMarker);
        return newMarker;
      };

      markers.forEach((markerData, idx) => makeMarker(markerData, idx));
    };

    void updateMarkers();
  }, [markers, selectedIndex]);

  const init = async () => {
    setIsLoading(false);
    if (!container.current) return;

    container.current.center = { lat: center.lat, lng: center.lng };

    await window.google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

    const innerMap = container.current.innerMap;
    if (!innerMap) return;

    innerMap.setOptions({ mapTypeControl: false });

    const makeMarker = (markerData: Marker, idx: number) => {
      const isSelected = idx === selectedIndex;
      const content = createMarkerContent(idx + 1, isSelected);

      const newMarker = new AdvancedMarkerElement({
        map: innerMap,
        position: { lat: markerData.lat, lng: markerData.lng },
        title: markerData.title,
        content: content,
        zIndex: isSelected ? 1000 : idx,
      });
      markersRef.current.push(newMarker);
      return newMarker;
    };

    markers.forEach((markerData, idx) => makeMarker(markerData, idx));
  };

  return (
    <div className="relative w-full h-full">
      {/* @ts-expect-error - gmp-map is a Google Maps web component */}
      <gmp-map ref={container} zoom={level} map-id="DEMO_MAP_ID" style={{ height: "100%" }}></gmp-map>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-10">
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      )}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps`}
        async
        onLoad={init}
      />
    </div>
  );
}

export default GoogleMap;
