interface IAlumniData {
  id: number;
  name: string;
  city: string;
  country: string;
  organisation: string;
  jobTitle: string;
  degrees: string[];
  about: string[];
  lat: number;
  lng: number;
  altitude: number;
  focusTime: number;
  transitionTime: number;
  size: number;
  avatar: string;
}

export default IAlumniData;
