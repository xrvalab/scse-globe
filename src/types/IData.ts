interface IData {
  id: number;
  label: string;
  lat: number;
  lng: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  focus: {
    lat: number;
    lng: number;
    altitude: number;
  };
  focusTime: number;
  transitionTime: number;
  size: number;
  color: string;
  activeColor: string;
}

export default IData;
