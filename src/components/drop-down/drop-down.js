import "./drop-down.scss";
import template from "./drop-down.html";
import { Component } from "../component";

/**
 * Drop down Component
 * Render and manage city select results.
 * @extends Component
 */
export class DropDown extends Component {
  /** SearchBar Component Constructor
   * @param { Object } props.events.resultSelected Result selected event listener
   * @param { Object } props.data.searchService SearchService instance to use
   */
  constructor(placeholderId, props) {
    super(placeholderId, props, template);

    this.api = props.data.apiService;

    // Trigger search function for new input in searchbar
    this.refs.input.addEventListener("change", e =>
      this.onSelect(e.target.value)
    );
  }

  /** Receive soofa api data and debounce by 500 ms */
  onSelect(value) {
    this.api.getSoofaData(value);
    clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.citySelected(value), 500);
  }

  /** Display the selected result  */
  citySelected(value) {
    // Send selected result to listeners
    this.triggerEvent("resultSelected");

    let cityDropdownList = this.refs.input;
    for (let i = 0; i < cityDropdownList.options.length; i++) {
      if (cityDropdownList.options[i].value == value) {
        cityDropdownList.options[i].selected = true;
        break;
      }
    }
  }
}
