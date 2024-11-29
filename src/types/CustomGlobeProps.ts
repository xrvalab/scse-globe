import { GlobeMethods, GlobeProps } from "react-globe.gl";
import { MutableRefObject } from "react";
import { JSX } from "react/jsx-runtime";
import { IPointOfView } from ".";

interface CustomGlobeProps extends GlobeProps, JSX.IntrinsicAttributes {
  globeRef: MutableRefObject<GlobeMethods | undefined>;
  globeColor: number | string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  transitionTime: number;
  initialPointOfView: IPointOfView;
  setGlobeReady: React.Dispatch<React.SetStateAction<boolean>>;
}

export default CustomGlobeProps;
