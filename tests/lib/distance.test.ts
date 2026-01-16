import { describe, it, expect } from "vitest";
import { calculateDistance, calculateTotalDistance, formatDistance } from "@/lib/distance";

describe("distance utilities", () => {
  describe("calculateDistance", () => {
    it("같은 좌표 간 거리는 0이어야 함", () => {
      const result = calculateDistance(35.6762, 139.6503, 35.6762, 139.6503);
      expect(result).toBe(0);
    });

    it("도쿄에서 오사카까지 거리 계산 (약 400km)", () => {
      // 도쿄: 35.6762, 139.6503
      // 오사카: 34.6937, 135.5023
      const result = calculateDistance(35.6762, 139.6503, 34.6937, 135.5023);
      expect(result).toBeGreaterThan(380);
      expect(result).toBeLessThan(420);
    });

    it("서울에서 부산까지 거리 계산 (약 325km)", () => {
      // 서울: 37.5665, 126.9780
      // 부산: 35.1796, 129.0756
      const result = calculateDistance(37.5665, 126.978, 35.1796, 129.0756);
      expect(result).toBeGreaterThan(300);
      expect(result).toBeLessThan(350);
    });
  });

  describe("calculateTotalDistance", () => {
    it("빈 배열은 0을 반환해야 함", () => {
      const result = calculateTotalDistance([]);
      expect(result).toBe(0);
    });

    it("하나의 포인트만 있으면 0을 반환해야 함", () => {
      const result = calculateTotalDistance([{ lat: 35.6762, lng: 139.6503 }]);
      expect(result).toBe(0);
    });

    it("유효하지 않은 좌표는 무시해야 함", () => {
      const result = calculateTotalDistance([
        { lat: 35.6762, lng: 139.6503 },
        { lat: undefined, lng: undefined },
        { lat: 35.6895, lng: 139.6917 },
      ]);
      expect(result).toBeGreaterThan(0);
    });

    it("여러 포인트의 총 거리를 계산해야 함", () => {
      const points = [
        { lat: 35.6762, lng: 139.6503 }, // 도쿄
        { lat: 35.6895, lng: 139.6917 }, // 우에노
        { lat: 35.7101, lng: 139.8107 }, // 아사쿠사
      ];
      const result = calculateTotalDistance(points);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(20); // 도쿄 내 이동
    });
  });

  describe("formatDistance", () => {
    it("0이면 '-'를 반환해야 함", () => {
      expect(formatDistance(0)).toBe("-");
    });

    it("1km 미만이면 미터 단위로 표시해야 함", () => {
      expect(formatDistance(0.5)).toBe("500m");
      expect(formatDistance(0.123)).toBe("123m");
    });

    it("1km 이상이면 km 단위로 표시해야 함", () => {
      expect(formatDistance(1)).toBe("1.0km");
      expect(formatDistance(12.5)).toBe("12.5km");
      expect(formatDistance(100.456)).toBe("100.5km");
    });
  });
});
