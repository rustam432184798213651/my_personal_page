import "./styles.css";
import * as L from "leaflet";

const map = L.map("app").setView([51.505, -0.09], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker([51.5, -0.08]).addTo(map);
const customUrl = L.icon({
  iconUrl:
    "https://images.hdqwalls.com/download/sunset-tree-red-ocean-sky-7w-2880x1800.jpg",
  iconSize: [30, 30],
});

var marker = L.marker([51.5, -0.08], { icon: customUrl }).addTo(map);
