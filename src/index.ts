import "./styles.css";
import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet-providers";
const map = L.map("app").setView([51.505, -0.09], 13);
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
var marker = L.marker([51.5, -0.08]);
marker.bindPopup("<h3>Rusty created me. I am so glad to be alive! </h3>");
var marker2 = L.marker([51.51, -0.09]);
var marker3 = L.marker([51.5, -0.01]);

L.tileLayer.provider("CartoDB.Positron").addTo(map);

myClusterLayer.addLayer(marker);
myClusterLayer.addLayer(marker2);
myClusterLayer.addLayer(marker3);
map.addLayer(myClusterLayer);
