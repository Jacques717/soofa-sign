import "./layer-panel.scss";
import template from "./layer-panel.html";
import { Component } from "../component";

/**
 * Layer Panel Component
 * Render and control layer-toggle side-panel
 */
export class LayerPanel extends Component {
  constructor(placeholderId, props) {
    super(placeholderId, props, template);

    // Toggle layer panel on click (mobile only)
    this.refs.toggle.addEventListener("click", () => this.toggleLayerPanel());

    // Add a toggle button for each layer
    props.data.layer.forEach(name => this.addLayerButton(name));
  }

  /** Create and append new layer button DIV */
  addLayerButton(layer) {
    let layerItem = document.createElement("div");
    layerItem.textContent = `${layer.name}`;
    layerItem.setAttribute("ref", `${layer.id}-toggle`);
    layerItem.addEventListener("click", e => this.toggleMapLayer(layer.id));
    this.refs.buttons.appendChild(layerItem);
  }

  /** Toggle the info panel (only applies to mobile) */
  toggleLayerPanel() {
    this.refs.panel.classList.toggle("layer-panel-active");
  }

  /** Toggle map layer visibility */
  toggleMapLayer(layerId) {
    // Toggle active UI status
    this.componentElem
      .querySelector(`[ref=${layerId}-toggle]`)
      .classList.toggle("toggle-active");

    // Trigger layer toggle callback
    this.triggerEvent("layerToggle", layerId);
  }

  resetLayerSelections() {
    const layers = this.refs.buttons.children;
    for (let i = 0; i < layers.length; i++) {
      layers[i].classList.remove("toggle-active");
    }
  }
}
