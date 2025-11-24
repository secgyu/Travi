"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

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
  markers?: Marker[];
}

function GoogleMap({ center, level = 3, markers = [] }: GoogleMapProps) {
  const container = useRef<HTMLElement & { innerMap?: any; center?: any }>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // center prop이 변경될 때마다 지도 중심 업데이트
    if (container.current && center) {
      container.current.center = { lat: center.lat, lng: center.lng };
    }
  }, [center]);

  const init = async () => {
    setIsLoading(false);
    if (!container.current) return;

    // 초기 center 설정
    container.current.center = { lat: center.lat, lng: center.lng };

    const [{ Map }, { AdvancedMarkerElement }] = await Promise.all([
      window.google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
      window.google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
    ]);

    const innerMap = container.current.innerMap;
    if (!innerMap) return;

    innerMap.setOptions({ mapTypeControl: false });

    const makeMarker = (marker: Marker, innerMap: any) =>
      new AdvancedMarkerElement({
        map: innerMap,
        position: { lat: marker.lat, lng: marker.lng },
        title: marker.title,
      });

    // 중심점에 마커 추가
    makeMarker({ lat: center.lat, lng: center.lng, title: "현재 위치" }, innerMap);

    // 추가 마커들 표시
    markers.forEach((marker) => makeMarker(marker, innerMap));
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      )}
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
