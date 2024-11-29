import * as THREE from "three";
import { default as GlobeGL } from "react-globe.gl";
import { CustomGlobeProps } from "../../types";

function CustomGlobe(props: CustomGlobeProps) {
  function onGlobeReady() {
    // FIXME: useEffect does not work, but setTimeout with a 0ms callback does.
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
      props.setGlobeReady(true);
    }, 0);
  }

  return (
    <GlobeGL ref={props.globeRef} onGlobeReady={onGlobeReady} {...props} />
  );
}

export default CustomGlobe;
