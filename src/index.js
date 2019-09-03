import "./styles/main.scss";
import template from "./main.html";

import { InfoPanel } from "./components/info-panel/info-panel";
import { DropDown } from "./components/drop-down/drop-down";

import { Map } from "./components/map/map";
import { LayerPanel } from "./components/layer-panel/layer-panel";
import { ApiService } from "./services/api";

/** Main UI Controller Class */
class ViewController {
  /** Initialize Application */
  constructor() {
    document.getElementById("app").outerHTML = template;

    // Initialize API service
    this.api = new ApiService("https://soofaiap.firebaseapp.com/DataFiles/");

    this.locationPointTypes = [
      "googlefood",
      "googlecommunity",
      "googlebigshops"
    ];

    this.initializeComponents();
    this.loadMapData();
  }

  /** Initialize Components with data and event listeners */
  initializeComponents() {
    // Initialize Info Panel
    this.infoComponent = new InfoPanel("info-panel-placeholder");

    // Initialize Map
    this.mapComponent = new Map("map-placeholder");

    //Initialize city dropdown
    this.dropdown = new DropDown("dropdown-panel-placeholder", {
      //data: { searchService: this.searchService },
      data: { apiService: this.api },
      events: {
        resultSelected: event => {
          this.mapComponent.panToLocation();
        }
      }
    });

    // Initialize Layer Toggle Panel
    this.layerPanel = new LayerPanel("layer-panel-placeholder", {
      data: { layerNames: ["site", ...this.locationPointTypes] },
      events: {
        layerToggle:
          // Toggle layer in map controller on "layerToggle" event
          event => {
            this.mapComponent.toggleLayer(event.detail);
          }
      }
    });
  }

  async loadMapData() {
    // // Download kingdom boundaries
    // const kingdomsGeojson = await this.api.getKingdoms()

    // // Add data to map
    // this.mapComponent.addKingdomGeojson(kingdomsGeojson)

    // // Show kingdom boundaries
    // this.layerPanel.toggleMapLayer('kingdom')

    // Download location point geodata
    for (let locationType of this.locationPointTypes) {
      // // Download GeoJSON + metadata
      //const geojson = await this.api.getLocations(locationType)
      //Get Heatmap Data
      //let newdata = AllScores[locationType];
      // // Add data to map
      //this.mapComponent.addLocationHeatmapData(locationType, newdata);
      // Display location layer
      //this.layerPanel.toggleMapLayer(locationType, newdata);
    }
  }
}

window.ctrl = new ViewController();
