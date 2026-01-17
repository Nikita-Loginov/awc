import { POINTS_DATA, COLORS, RING_CONFIG, ROTATION_CONFIG, UI_CONFIG } from './constants.js';
import { initializeGlobe } from './globeManager.js';
import { createUILayers, updateOverlay, updatePopupPosition } from './uiManager.js';
import { createPopupElement, createRing, createPointMesh, computeActivePointIndex, isOnCameraSide } from './utils.js';


const { globe, container, uiRoot } = initializeGlobe();
const uiElements = createUILayers(uiRoot);

const ringGroup = new THREE.Group();
const ring = createRing();
ringGroup.add(ring);

const points = POINTS_DATA.map((pointData, index) => {
  const angle = (index * 2 * Math.PI) / POINTS_DATA.length;
  const position = new THREE.Vector3(
    Math.cos(angle) * RING_CONFIG.RADIUS,
    0,
    Math.sin(angle) * RING_CONFIG.RADIUS
  );
  
  const mesh = createPointMesh(position, COLORS.POINT_INACTIVE);
  mesh.userData = { ...pointData, index };
  
  ringGroup.add(mesh);
  
  const popup = createPopupElement(pointData);
  uiElements.popupsLayer.appendChild(popup);
  
  return {
    ...pointData,
    mesh,
    popup,
    initialAngle: angle
  };
});

globe
  .customLayerData([{}])
  .customThreeObject(() => ringGroup);

let rotationAngle = 0;
let activePointIndex = -1;
let previousActiveIndex = -1;

const applyActivePointStyles = () => {
  if (activePointIndex === previousActiveIndex) return;
  
  if (previousActiveIndex !== -1 && points[previousActiveIndex]?.mesh) {
    const previousMesh = points[previousActiveIndex].mesh;
    previousMesh.material.color.setHex(COLORS.POINT_INACTIVE);
    previousMesh.scale.set(1, 1, 1);
  }
  
  if (activePointIndex !== -1 && points[activePointIndex]?.mesh) {
    const currentMesh = points[activePointIndex].mesh;
    currentMesh.material.color.setHex(COLORS.POINT_ACTIVE);
    currentMesh.scale.set(UI_CONFIG.ACTIVE_POINT_SCALE, UI_CONFIG.ACTIVE_POINT_SCALE, UI_CONFIG.ACTIVE_POINT_SCALE);
  }
  
  previousActiveIndex = activePointIndex;
};

const updatePopups = () => {
  points.forEach((point, index) => {
    if (!point.popup || !point.mesh) return;
    
    updatePopupPosition(point.popup, point.mesh, globe.camera(), uiRoot);
    
    const isVisible = isOnCameraSide(point.mesh, globe.camera());
    point.popup.classList.toggle('is-hidden', !isVisible);
    point.mesh.visible = isVisible;
    
    const isActive = index === activePointIndex && isVisible;
    point.popup.classList.toggle('active', isActive);
    point.popup.classList.toggle('compact', !isActive);
  });
};

export const animateGlobal = () => {
  requestAnimationFrame(animateGlobal);
  
  rotationAngle += ROTATION_CONFIG.SPEED;
  ringGroup.rotation.y = rotationAngle;
  ringGroup.updateMatrixWorld(true);
  
  updatePopups();
  activePointIndex = computeActivePointIndex(points, uiRoot, globe);
  applyActivePointStyles();
  
  updateOverlay(ringGroup, points, activePointIndex, globe, uiElements, uiRoot);
  globe.renderer().render(globe.scene(), globe.camera());
};

export const handleResizeGlobal = () => {
  globe.width(uiRoot.clientWidth);
  globe.height(uiRoot.clientHeight);
};