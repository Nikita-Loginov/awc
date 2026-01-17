import { UI_CONFIG, RING_CONFIG } from './constants.js';
import { getScreenPosition, isOnCameraSide } from './utils.js';

export const createUILayers = (container) => {
  const popupsLayer = document.createElement('div');
  popupsLayer.className = 'planet-popups';
  container.appendChild(popupsLayer);
  
  const overlaySvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  overlaySvg.setAttribute('class', 'planet-overlay');
  overlaySvg.setAttribute('width', '100%');
  overlaySvg.setAttribute('height', '100%');
  
  const orbitPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  orbitPath.setAttribute('class', 'planet-orbit');
  overlaySvg.appendChild(orbitPath);
  
  const nodesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  nodesGroup.setAttribute('class', 'planet-nodes');
  overlaySvg.appendChild(nodesGroup);
  
  container.appendChild(overlaySvg);
  
  return { popupsLayer, overlaySvg, orbitPath, nodesGroup };
};

export const updatePopupPosition = (popup, mesh, camera, container) => {
  const screenPos = getScreenPosition(mesh, camera, container);
  mesh.userData.__screen = screenPos;
  
  popup.style.left = `${screenPos.x}px`;
  popup.style.top = `${screenPos.y}px`;
  popup.style.setProperty('--popup-tx', '-50%');
  popup.style.setProperty('--popup-ty', `${UI_CONFIG.POPUP_OFFSET_Y}px`);
};

export const updateOverlay = (ringGroup, points, activeIndex, globe, uiElements, container) => {
  const { overlaySvg, orbitPath, nodesGroup } = uiElements;
  const camera = globe.camera();
  const width = container.clientWidth || 1;
  const height = container.clientHeight || 1;
  
  overlaySvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  
  updateOrbitPath(ringGroup, orbitPath, camera, width, height);
  updateNodes(points, nodesGroup, activeIndex, camera, globe, width, height);
};

const updateOrbitPath = (ringGroup, orbitPath, camera, width, height) => {
  const points = [];
  
  for (let i = 0; i < UI_CONFIG.ORBIT_SAMPLES; i++) {
    const angle = (i / UI_CONFIG.ORBIT_SAMPLES) * Math.PI * 2;
    const point = new THREE.Vector3(
      Math.cos(angle) * RING_CONFIG.RADIUS,
      0,
      Math.sin(angle) * RING_CONFIG.RADIUS
    );
    
    point.applyMatrix4(ringGroup.matrixWorld);
    point.project(camera);
    
    points.push({
      x: (point.x * 0.5 + 0.5) * width,
      y: (-(point.y * 0.5) + 0.5) * height
    });
  }
  
  if (points.length) {
    let pathData = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)}`;
    }
    pathData += ' Z';
    orbitPath.setAttribute('d', pathData);
    orbitPath.style.opacity = '1';
  }
};

const updateNodes = (points, nodesGroup, activeIndex, camera, globe, width, height) => {
  while (nodesGroup.firstChild) {
    nodesGroup.removeChild(nodesGroup.firstChild);
  }
  
  points.forEach((point, index) => {
    if (!point.mesh || !isOnCameraSide(point.mesh, camera)) return;
    
    const screenPos = point.mesh.userData?.__screen;
    if (!screenPos) return;
    
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const isActive = index === activeIndex;
    const radius = isActive ? UI_CONFIG.ACTIVE_NODE_RADIUS : UI_CONFIG.NODE_RADIUS;
    
    node.setAttribute('class', `planet-node${isActive ? ' active' : ''}`);
    node.setAttribute('cx', `${screenPos.x}`);
    node.setAttribute('cy', `${screenPos.y}`);
    node.setAttribute('r', `${radius}`);
    
    nodesGroup.appendChild(node);
  });
};