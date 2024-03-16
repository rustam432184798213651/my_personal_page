import "./styles.css";
import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet-providers";
const map = L.map("app").setView([55.803186, 37.41012], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
});

const customUrl = L.icon({
  iconUrl: "https://www.flaticon.com/free-icon/placeholder_15112021.svg",
  iconSize: [30, 30],
});

// window.L instead of L ???
const myClusterLayer = window.L.markerClusterGroup({
  iconCreateFunction: function (cluster) {
    return L.divIcon({
      html: '<div class="cluster-div">' + cluster.getChildCount() + "</div>",
    });
  },
});
// add markers
var marker = L.marker([55.803186, 37.41012]);
marker.bindPopup("<h3>MIEM</h3>");
L.tileLayer.provider("CartoDB.Positron").addTo(map);
myClusterLayer.addLayer(marker);
map.addLayer(myClusterLayer);
