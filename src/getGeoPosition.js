export default function getCurrentPosition() {
  const options = {
    maximumAge: 1800000,
  };

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
