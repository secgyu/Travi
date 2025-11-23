"use client";

import Script from "next/script";
import React, { AllHTMLAttributes, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  level: number;
}

function GoogleMap({ center, level = 3 }: GoogleMapProps) {
  const container = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const init = () => {
    setIsLoading(false);
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng), //지도의 중심좌표.
        level: level, //지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(container.current, options);
    });
  };

  return (
    <div className="w-full">
      {/* <Script
        async
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=05ae95d1e0cb9dc4e1ddc052ccc303a5&autoload=false`}
        onLoad={init}
      />
      <div ref={container} id="map" className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg"></div>
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">지도를 불러오는 중...</p>
        </div>
      )} */}
      <gmp-map
        center={`${center.lat},${center.lng}`}
        zoom={level}
        map-id="DEMO_MAP_ID"
        style={{ height: "400px" }}
      ></gmp-map>

      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=maps`}
        async
      />
    </div>
  );
}

export default GoogleMap;
