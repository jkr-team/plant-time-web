export type LatLng = {
  lat: number;
  lng: number;
};

export function getLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        resolve({ lat: location.coords.latitude, lng: location.coords.longitude } as LatLng);
      },
      (e) => {
        reject(new Error(e.message));
      }
    );
  }) as Promise<LatLng>;
}

export async function geocode(value: string) {
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${value}&apiKey=40a2a0f8179d4048aec0e331f986271d`
  );

  if (!response.ok) {
    throw new Error(`Something went wrong while attempting to geocode. Please try again later.`);
  }

  const data = await response.json();

  if (Array.isArray(data?.features) && data.features.length > 0) {
    const coords = { lat: data.features[0]?.properties?.lat, lng: data.features[0]?.properties?.lon } as LatLng;

    if (!isNaN(coords.lat) && !isNaN(coords.lng)) {
      return coords;
    }
  }

  throw new Error('Failed to geocode location.');
}
