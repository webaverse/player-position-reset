import metaversefile from "metaversefile";
import * as THREE from "three";

const {useApp, useFrame, useCleanup, useLocalPlayer} = metaversefile;

const _isInRange = (vector, start, end) => {
  return (
    vector.x >= start.x &&
    vector.x <= end.x &&
    vector.y >= start.y &&
    vector.y <= end.y &&
    vector.z >= start.z &&
    vector.z <= end.z
  );
};

// constants
const FADE_DURATION = 1000;

// reset state
let isResetting = false;
const startVector = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
const endVector = new THREE.Vector3(Infinity, Infinity, Infinity);
const resetVector = new THREE.Vector3(0, 0, 0);

export default e => {
  const app = useApp();
  const player = useLocalPlayer();

  app.name = "player-position-reset";

  const _setVectorByComponent = (vector, name) => {
    const component = app.getComponent(name);
    if (component) {
      const hasX = component.x !== undefined;
      hasX && (vector.x = component.x);
      const hasY = component.y !== undefined;
      hasY && (vector.y = component.y);
      const hasZ = component.z !== undefined;
      hasZ && (vector.z = component.z);
    }
  };

  _setVectorByComponent(startVector, "start");
  _setVectorByComponent(endVector, "end");
  _setVectorByComponent(resetVector, "reset");

  const _addFadeoutDiv = () => {
    // Create a full screen white opaque overlay div over the entire screen, with opacity 0
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.backgroundColor = "white";
    div.style.opacity = "0";
    document.body.appendChild(div);

    return div;
  };

  const _setFadeoutAnimationStyle = div => {
    div.style.transition = `opacity ${FADE_DURATION}ms ease-out`;
  };
  const _fadeOut = div => {
    div.style.opacity = "0";
  };
  const _fadeIn = div => {
    div.style.opacity = "1";
  };

  const _resetPlayerPosition = () => {
    // only run once when this is triggered
    if (!isResetting) {
      isResetting = true;

      const div = _addFadeoutDiv();
      _setFadeoutAnimationStyle(div);

      _fadeIn(div);

      setTimeout(() => {
        // console.log("resetting player position");
        player.characterPhysics.setPosition(resetVector);

        _fadeOut(div);

        // after the animation remove the element
        setTimeout(() => {
          isResetting = false;
          document.body.removeChild(div);
        }, FADE_DURATION);
      }, FADE_DURATION);
    }
  };

  useFrame(() => {
    const playerPosition = player.position;
    const inRange = _isInRange(playerPosition, startVector, endVector);
    if (!inRange) {
      _resetPlayerPosition();
    }
  });

  useCleanup(() => {});

  return app;
};