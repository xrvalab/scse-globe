import { MutableRefObject } from "react";
import * as THREE from "three";
import { default as GlobeGL, GlobeMethods, GlobeProps } from "react-globe.gl";
import { JSX } from "react/jsx-runtime";

interface IGlobeProps extends GlobeProps, JSX.IntrinsicAttributes {
  globeRef: MutableRefObject<GlobeMethods | undefined>;
  globeColor: number | string;
  autoRotate: boolean;
  autoRotateSpeed: number;
  transitionTime: number;
  initialPointOfView: { lat: number; lng: number; altitude: number };
}

function Globe(props: IGlobeProps) {
  function onGlobeReady() {
    // useEffect does not work, but setTimeout with a 0ms callback does.
    setTimeout(() => {
      // @ts-expect-error Property 'material' does not exist on type 'Object3D<Object3DEventMap>'
      props.globeRef.current!.scene().children[3].children[0].children[0].material =
        new THREE.MeshPhongMaterial({
          color: props.globeColor,
        });
      props.globeRef!.current!.pointOfView(
        props.initialPointOfView,
        props.transitionTime
      );

      props.globeRef.current!.controls().autoRotate = props.autoRotate;
      props.globeRef.current!.controls().autoRotateSpeed =
        props.autoRotateSpeed;
    }, 0);
  }

  return (
    <GlobeGL ref={props.globeRef} onGlobeReady={onGlobeReady} {...props} />
  );
}

export default Globe;
