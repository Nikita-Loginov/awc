import { UI_CONFIG, RING_CONFIG, COLORS, POINT_CONFIG } from './constants.js';

export const createPopupElement = (point) => {
  const element = document.createElement('div');
  element.className = 'planet-popup compact';
  element.innerHTML = `
    <p class="planet-popup__title"></p>
    <p class="planet-popup__desc"></p>
  `.trim();

  element.querySelector('.planet-popup__title').textContent = point.name ?? '';
  element.querySelector('.planet-popup__desc').textContent = point.description ?? '';
  return element;
};

export const createRing = () => {
  const geometry = new THREE.TorusGeometry(
    RING_CONFIG.RADIUS,
    RING_CONFIG.WIDTH,
    RING_CONFIG.SEGMENTS_RADIAL,
    RING_CONFIG.SEGMENTS_TUBULAR
  );
  
  const material = new THREE.MeshBasicMaterial({
    color: COLORS.RING,
    transparent: true,
    opacity: RING_CONFIG.OPACITY
  });
  
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  return ring;
};

export const createPointMesh = (position, color) => {
  const geometry = new THREE.SphereGeometry(POINT_CONFIG.RADIUS, POINT_CONFIG.SEGMENTS, POINT_CONFIG.SEGMENTS);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 1
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  return mesh;
};

export const isOnCameraSide = (mesh, camera) => {
  const worldPosition = new THREE.Vector3();
  mesh.getWorldPosition(worldPosition);
  const cameraDirection = camera.position.clone().normalize();
  const pointDirection = worldPosition.clone().normalize();
  return pointDirection.dot(cameraDirection) > 0;
};

export const getScreenPosition = (mesh, camera, container) => {
  const worldPosition = new THREE.Vector3();
  mesh.getWorldPosition(worldPosition);
  
  const projected = worldPosition.clone().project(camera);
  const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
  const y = (-(projected.y * 0.5) + 0.5) * container.clientHeight;
  
  return { x, y };
};

export const computeActivePointIndex = (points, container, globe) => {
  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;
  const targetX = width * UI_CONFIG.TARGET_POSITION_X;
  const targetY = height * UI_CONFIG.TARGET_POSITION_Y;
  
  let bestIndex = -1;
  let bestDistance = Infinity;
  
  points.forEach((point, index) => {
    if (!point.mesh) return;
    if (!isOnCameraSide(point.mesh, globe.camera())) return;
    
    const screenPos = point.mesh.userData?.__screen;
    if (!screenPos) return;
    
    const dx = screenPos.x - targetX;
    const dy = screenPos.y - targetY;
    const distance = dx * dx + dy * dy;
    
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  
  return bestIndex;
};