import "./map.scss";
import L from "leaflet";
import HeatmapOverlay from "leaflet-heatmap";
import { clone } from "../../helper";
import { Component } from "../component";

const template = '<div ref="mapContainer" class="map-container"></div>';

/**
 * Leaflet Map Component
 * @extends Component
 */
export class Map extends Component {
  /** Map Component Constructor
   * @param { String } placeholderId Element ID to inflate the map into
   * @param { Object } props.events.click Map item click listener
   */
  constructor(mapPlaceholderId, props) {
    super(mapPlaceholderId, props, template);

    // Initialize Leaflet map
    this.map = L.map(this.refs.mapContainer, {
      center: new L.LatLng(42.3736, -71.1097),
      zoom: 13,
      maxZoom: 18,
      minZoom: 4
    });

    const cfg1 = {
      radius: 0.007,
      maxOpacity: 0.8,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: "lat",
      lngField: "lng",
      valueField: "count",
      blur: 0.8
    };
    this.compositelayer = new HeatmapOverlay(cfg1);
    this.compositelayer.setData({ max: 0, data: [] });
    let compositegroup = L.layerGroup([this.compositelayer]);
    this.layersactive = [];
    this.map.addLayer(compositegroup);

    this.map.zoomControl.setPosition("bottomright"); // Position zoom control
    this.layers = {}; // Map layer dict (key/value = title/layer)
    this.selectedRegion = null; // Store currently selected region

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(this.map);
  }

  panToLocation() {
    this.layersactive = [];
    this.compositelayer.setData({ max: 0, data: [] });
    this.map.panTo(new L.LatLng(lat, lng));
  }

  /** Toggle map layer visibility */
  toggleLayer(layerName) {
    let index = this.layersactive.indexOf(layerName);
    if (index > -1) {
      this.layersactive.splice(index, 1);
    } else {
      this.layersactive.push(layerName);
    }
    if (this.layersactive.length > 0) {
      //clone a object copy of that layers data (heat map coords)
      //let newdata = { ... AllScores[this.layersactive[0]].data};
      var newdata = clone(AllScores[this.layersactive[0]].data);

      //not sure what this block is doing yet....
      for (var j = 1; j < this.layersactive.length; j++) {
        var adder = clone(AllScores[this.layersactive[j]].data);
        for (var i = 0; i < newdata.length; i++) {
          newdata[i].count = newdata[i].count + adder[i].count;
        }
      }
      //set the heat map layer data
      this.compositelayer.setData({ max: 1000, data: newdata });
    } else {
      this.compositelayer.setData({ max: 0, data: [] });
    }
  }
}
