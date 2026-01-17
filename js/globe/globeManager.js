import { DOM_IDS, ASSET_URLS, COLORS, GLOBE_CONFIG } from "./constants.js";

export const initializeGlobe = () => {
  const container = document.getElementById(DOM_IDS.CONTAINER);
  const uiRoot = document.getElementById(DOM_IDS.UI_ROOT) || container;

  const globe = Globe()(container)
    .globeImageUrl(ASSET_URLS.GLOBE_IMAGE)
    .bumpImageUrl(ASSET_URLS.BUMP_IMAGE)
    .backgroundColor(COLORS.BACKGROUND);

  configureControls(globe);
  globe.pointOfView(
    {
      lat: GLOBE_CONFIG.LAT,
      lng: GLOBE_CONFIG.LNG,
      altitude: GLOBE_CONFIG.ALTITUDE,
    },
    0
  );

  return { globe, container, uiRoot };
};

const configureControls = (globe) => {
  globe.controls.enableZoom = false;
  globe.controls.enableRotate = false;
  globe.controls.enablePan = false;
  globe.controls.autoRotate = false;
  globe.controls.autoRotateSpeed = 0.2;
};
