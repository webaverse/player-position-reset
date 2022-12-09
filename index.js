import metaversefile from 'metaversefile';
import * as THREE from 'three';

const {
  useApp,
  useFrame,
  useCleanup,
  useLocalPlayer
} = metaversefile;

const startVector = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
const endVector = new THREE.Vector3(Infinity, Infinity, Infinity);
const resetVector = new THREE.Vector3(0, 0, 0);

const _isInRange = (vector, start, end) => {
  return vector.x >= start.x && vector.x <= end.x &&
    vector.y >= start.y && vector.y <= end.y &&
    vector.z >= start.z && vector.z <= end.z;
}

export default (e) => {
  const app = useApp();
  const player = useLocalPlayer();

  app.name = 'player-position-reset';

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

  _setVectorByComponent(startVector, 'start');
  _setVectorByComponent(endVector, 'end');
  _setVectorByComponent(resetVector, 'reset');

  const _resetPlayerPosition = () => {
    // Create a full screen white opaque overlay div over the entire screen, with opacity 0
    const div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.left = '0px';
    div.style.top = '0px';
    div.style.width = '100%';
    div.style.height = '100%';
    div.style.backgroundColor = 'white';
    div.style.opacity = '0';
    document.body.appendChild(div);

    // then fade up to 1 over 1 second
    div.style.transition = 'opacity 1s';
    div.style.opacity = '1';

    // on transition end, call setPosition on the player with player.characterPhysics.setPosition(resetVector);

    setTimeout(() => {
      player.characterPhysics.setPosition(resetVector);
        // then fade back down to 0 over 1 second, then remove the div
        div.style.transition = 'opacity 1s';
        div.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(div);
        }, 1000);
    }, 1000);
  };
  useFrame(() => {
    const playerPosition = player.position;
    const inRange = _isInRange(playerPosition, startVector, endVector);
    if (!inRange) {
      _resetPlayerPosition();
    }
  });

  useCleanup(() => {
  });

  return app;
};
