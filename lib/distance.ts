export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

interface LocationPoint {
  lat?: number;
  lng?: number;
}


export function calculateTotalDistance(activities: LocationPoint[]): number {
  const validActivities = activities.filter(
    (a): a is { lat: number; lng: number } => typeof a.lat === "number" && typeof a.lng === "number"
  );

  if (validActivities.length < 2) {
    return 0;
  }

  let totalDistance = 0;

  for (let i = 0; i < validActivities.length - 1; i++) {
    const current = validActivities[i];
    const next = validActivities[i + 1];
    totalDistance += calculateDistance(current.lat, current.lng, next.lat, next.lng);
  }

  return totalDistance;
}


export function formatDistance(distanceKm: number): string {
  if (distanceKm === 0) {
    return "-";
  }

  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }

  return `${distanceKm.toFixed(1)}km`;
}
