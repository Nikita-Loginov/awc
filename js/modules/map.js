export const initSimpleMap = (idMap = "map", warehouses = [], options = {}) => {
  const defaultOptions = {
    zoom: 13,
    center: warehouses.length > 0 ? warehouses[0].coordinates : [55.18, 25.15],
    tileLayer: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    tileAttribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    markerIcon: {
      html: `<div class="decor__map" ><span>${
        warehouses.length > 0 && warehouses[0].icon
          ? `<img src="${warehouses[0].icon}" alt="иконка дома"/>`
          : "<img src=`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 11 11' fill='none'%3E%3Cpath d='M10.6667 8.89497V5.19634C10.6667 4.84012 10.6664 4.6619 10.623 4.49614C10.5847 4.34925 10.5217 4.21024 10.4364 4.08462C10.3402 3.94287 10.2064 3.82532 9.93828 3.59074L6.73828 0.79074C6.24054 0.355217 5.99167 0.137566 5.71159 0.0547378C5.46479 -0.0182459 5.20174 -0.0182459 4.95495 0.0547378C4.67508 0.137503 4.42657 0.354949 3.92957 0.789815L0.728516 3.59074C0.460427 3.82532 0.326694 3.94287 0.230469 4.08462C0.145195 4.21024 0.0816989 4.34925 0.0433142 4.49614C0 4.66191 0 4.84011 0 5.19634V8.89497C0 9.51622 0 9.82673 0.101494 10.0718C0.236819 10.3985 0.496213 10.6583 0.822917 10.7937C1.06794 10.8952 1.37857 10.8952 1.99983 10.8952C2.62108 10.8952 2.93205 10.8952 3.17708 10.7937C3.50379 10.6583 3.76311 10.3985 3.89844 10.0718C3.99993 9.82679 4 9.51616 4 8.89491V8.22824C4 7.49186 4.59695 6.89491 5.33333 6.89491C6.06971 6.89491 6.66667 7.49186 6.66667 8.22824V8.89491C6.66667 9.51616 6.66667 9.82679 6.76816 10.0718C6.90349 10.3985 7.16288 10.6583 7.48958 10.7937C7.73461 10.8952 8.04524 10.8952 8.66649 10.8952C9.28775 10.8952 9.59872 10.8952 9.84375 10.7937C10.1705 10.6583 10.4298 10.3985 10.5651 10.0718C10.6666 9.82673 10.6667 9.51622 10.6667 8.89497Z' fill='white'/%3E%3C/svg%3E`/>"
      }</span></div>`,
      iconSize: [32, 32],
      iconAnchor: [10, 10],
    },
    clusterOptions: {
      maxClusterRadius: 80,
      iconCreateFunction: function (cluster) {
        const count = cluster.getChildCount();

        return L.divIcon({
          html: `<div class="cluster-icon">${count}</div>`,
          className: "custom-cluster",
          iconSize: L.point(40, 40),
        });
      },
      showCoverageOnHover: true,
      disableClusteringAtZoom: 17,
      animate: true,
    },
    ...options,
  };

  const map = L.map(idMap).setView(defaultOptions.center, defaultOptions.zoom);

  L.tileLayer(defaultOptions.tileLayer, {
    attribution: defaultOptions.tileAttribution,
  }).addTo(map);

  const markersCluster = L.markerClusterGroup(defaultOptions.clusterOptions);

  const markers = warehouses.map((warehouse) => {
    const marker = L.marker(warehouse.coordinates, {
      icon: L.divIcon(defaultOptions.markerIcon),
    });

    if (warehouse.title || warehouse.address) {
      const popupContent = `
            <div style="padding: 5px;">
              ${
                warehouse.title ? `<strong>${warehouse.title}</strong><br>` : ""
              }
              ${warehouse.address ? warehouse.address : ""}
            </div>
          `;
      marker.bindPopup(popupContent);
    }

    return marker;
  });

  markersCluster.addLayers(markers);

  map.addLayer(markersCluster);

  if (markers.length > 0) {
    const bounds = markersCluster.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds.pad(0.1));
    }
  }

  const updateMarkers = (newWarehouses) => {
    markersCluster.clearLayers();

    const newMarkers = newWarehouses.map((warehouse) => {
      const marker = L.marker(warehouse.coordinates, {
        icon: L.divIcon(defaultOptions.markerIcon),
      });

      if (warehouse.title || warehouse.address) {
        const popupContent = `
              <div style="padding: 5px;">
                ${
                  warehouse.title
                    ? `<strong>${warehouse.title}</strong><br>`
                    : ""
                }
                ${warehouse.address ? warehouse.address : ""}
              </div>
            `;
        marker.bindPopup(popupContent);
      }

      return marker;
    });

    markersCluster.addLayers(newMarkers);

    if (newMarkers.length > 0) {
      const bounds = markersCluster.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.1));
      }
    }

    return newMarkers;
  };

  return {
    map,
    markers: markersCluster,
    markersArray: markers,
    updateMarkers,
  };
};
