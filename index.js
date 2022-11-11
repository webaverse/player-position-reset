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

  useFrame(() => {
    const playerPosition = player.position;
    const inRange = _isInRange(playerPosition, startVector, endVector);
    if (!inRange) {
      player.characterPhysics.setPosition(resetVector);
    }
  });

  useCleanup(() => {
  });

  return app;
};
