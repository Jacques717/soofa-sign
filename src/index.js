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
      { id: "googlefood", name: "Google food" },
      { id: "googlecommunity", name: "Google community" },
      { id: "googlebigshops", name: "Google big shops" },
      { id: "googlesmallshops", name: "Google small shops" },
      { id: "googletourist", name: "Google tourist" },
      { id: "googletransit", name: "Google transit" },
      { id: "yelpfood", name: "Yelp food" },
      { id: "yelpshopping", name: "Yelp shopping" },
      { id: "yelpcommunity", name: "Yelp community" },
      { id: "walkscore", name: "Walk score" },
      { id: "average", name: "Average" }
    ];

    this.initializeComponents();
  }

  /** Initialize Components with data and event listeners */
  initializeComponents() {
    // Initialize Info Panel
    this.infoComponent = new InfoPanel("info-panel-placeholder");

    // Initialize Map
    this.mapComponent = new Map("map-placeholder");

    //Initialize city dropdown
    this.dropdown = new DropDown("dropdown-panel-placeholder", {
      data: { apiService: this.api },
      events: {
        resultSelected: event => {
          this.layerPanel.resetLayerSelections();
          this.mapComponent.panToLocation();
        }
      }
    });

    // Initialize Layer Toggle Panel
    this.layerPanel = new LayerPanel("layer-panel-placeholder", {
      data: { layer: [...this.locationPointTypes] },
      events: {
        layerToggle:
          // Toggle layer in map controller on "layerToggle" event
          event => {
            this.mapComponent.toggleLayer(event.detail);
          }
      }
    });
  }
}

window.ctrl = new ViewController();
