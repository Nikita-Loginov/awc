export const DOM_IDS = {
  CONTAINER: "globe",
  UI_ROOT: "globe-wrap",
};

export const ASSET_URLS = {
  GLOBE_IMAGE:
    "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  BUMP_IMAGE: "https://unpkg.com/three-globe/example/img/earth-topology.png",
};

export const COLORS = {
  BACKGROUND: "#12141a",
  POINT_INACTIVE: 0xe6e8eb,
  POINT_ACTIVE: 0xebc246,
  RING: 0xe6e8eb,
};

export const GLOBE_CONFIG = {
  LAT: 25,
  LNG: 180,
  ALTITUDE: window.innerWidth > 767 ? 2 : 6,
};

export const RING_CONFIG = {
  RADIUS: 120,
  WIDTH: 1,
  SEGMENTS_RADIAL: 16,
  SEGMENTS_TUBULAR: 200,
  OPACITY: 0.8,
};

export const POINT_CONFIG = {
  RADIUS: 2,
  SEGMENTS: 16,
};

export const ROTATION_CONFIG = {
  SPEED: 0.0015,
};

export const UI_CONFIG = {
  POPUP_OFFSET_Y: 12,
  ACTIVE_POINT_SCALE: 1.2,
  ORBIT_SAMPLES: 160,
  NODE_RADIUS: 3.5,
  ACTIVE_NODE_RADIUS: 4.5,
  TARGET_POSITION_X: 0.5,
  TARGET_POSITION_Y: 0.78,
};

export const POINTS_DATA = [
  {
    id: 1,
    name: "Spain",
    description:
      "Cross-border compliance support for teams in Madrid and Barcelona.",
  },
  {
    id: 2,
    name: "France",
    description:
      "Strategic operational guidance across Paris, Lyon and Marseille.",
  },
  {
    id: 3,
    name: "Germany",
    description:
      "We provide legal services and a fleet of 8 vehicles in Berlin.",
  },
  {
    id: 4,
    name: "Italy",
    description:
      "Tax and payroll advisory for international operations in Milan.",
  },
  {
    id: 5,
    name: "United Kingdom",
    description:
      "Corporate services and contract support for London-based teams.",
  },
  {
    id: 6,
    name: "United States2",
    description:
      "Market entry advisory and risk management for multi-state launches.",
  },
  {
    id: 7,
    name: "Spain2",
    description:
      "Cross-border compliance support for teams in Madrid and Barcelona.",
  },
  {
    id: 8,
    name: "France2",
    description:
      "Strategic operational guidance across Paris, Lyon and Marseille.",
  },
];
