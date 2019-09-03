import "./map.scss";
import L from "leaflet";

import HeatmapOverlay from "leaflet-heatmap";

import { Component } from "../component";

const template = '<div ref="mapContainer" class="map-container"></div>';
let layersactive = [];

/**
 * Leaflet Map Component
 * Render GoT map items, and provide user interactivity.
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

    //compositegroup.addTo();

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
    this.map.panTo(new L.LatLng(lat, lng));
    // for (var i = 0; i < markercontainer.length; i++) {
    //   this.map.removeLayer(markercontainer[i]);
    // }
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
      var newdata = this.clone(AllScores[this.layersactive[0]].data);

      //not sure what this block is doing yet....
      for (var j = 1; j < this.layersactive.length; j++) {
        var adder = this.clone(AllScores[this.layersactive[j]].data);
        for (var i = 0; i < newdata.length; i++) {
          newdata[i].count = newdata[i].count + adder[i].count;
        }
      }
      //set the heat map layer data
      this.compositelayer.setData({ max: 1000, data: newdata });
    } else {
      this.compositelayer.setData({ max: 0, data: [] });
    }
    //let data = AllScores[layerName];
    //this.compositelayer.setData(data);

    // const layer = this.layers[layerName];
    // if (this.map.hasLayer(layer)) {
    //   this.map.removeLayer(layer);
    // } else {
    //   this.map.addLayer(layer);
    // }
  }
  clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      var copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      var copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      var copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  }

  /** Add location geojson to the leaflet instance */
  // addLocationGeojson(layerTitle, geojson) {
  //   // Initialize new geojson layer
  //   this.layers[layerTitle] = L.geoJSON(geojson, {
  //     // Show marker on location
  //     pointToLayer: (feature, latlng) => {
  //       return L.marker(latlng, {
  //         title: feature.properties.name
  //       });
  //     },
  //     onEachFeature: this.onEachLocation.bind(this)
  //   });
  // }

  // addLocationHeatmapData(layerTitle, data) {
  //   // Initialize new geojson layer
  //   //this.compositelayer.setData(layerTitle, { max: 1000, data: data });
  //   //this.compositelayer.setData({ max: 1000, data: data });
  //   //this.layers[layerTitle] = L.layerGroup(this.compositelayer);
  // }

  /** Toggle map layer visibility */
  // toggleLayer(layerName) {
  //   let layer = this.layers[layerName];
  //   if (this.map.hasLayer(layer)) {
  //     this.map.removeLayer(layer);
  //   } else {
  //     this.map.addLayer(layer);

  //     const newdata = clone(AllScores[layersactive[0]].data);
  //     compositelayer.setData({ max: 1000, data: newdata });
  //   }
  // }

  // toggleLayer(layerName) {
  //   //is the layer in the array? If not add it otherwise remove it
  //   index = this.layersactive.indexOf(layerName);
  //   if (index > -1) {
  //     layersactive.splice(index, 1);
  //   } else {
  //     layersactive.push(layerName);
  //   }
  //   //if we have some layers
  //   if (layersactive.length > 0) {
  //     //clone a object copy of that layers data (heat map coords)
  //     var newdata = clone(AllScores[layersactive[0]].data);

  //     //not sure what this block is doing yet....
  //     for (var j = 1; j < layersactive.length; j++) {
  //       var adder = clone(AllScores[layersactive[j]].data);
  //       for (var i = 0; i < newdata.length; i++) {
  //         newdata[i].count = newdata[i].count + adder[i].count;
  //       }
  //     }
  //     //set the heat map layer data
  //     compositelayer.setData({ max: 1000, data: newdata });
  //   } else {
  //     compositelayer.setData({ max: 0, data: [] });
  //   }
  // }
}
