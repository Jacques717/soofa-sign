import "./drop-down.scss";
import template from "./drop-down.html";
import { Component } from "../component";

/**
 * Search Bar Component
 * Render and manage search-bar and search results.
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

  /** Receive search bar input, and debounce by 500 ms */
  onSelect(value) {
    this.api.getSoofaData(value);

    // var myScript = document.createElement("script");
    // myScript.setAttribute("src", `src/services/Datafiles/SoofaData${value}.js`);
    // document.head.appendChild(myScript);

    clearTimeout(this.searchDebounce);
    //this.searchDebounce = setTimeout(() => this.search(value), 500);
    this.searchDebounce = setTimeout(() => this.citySelected(value), 500);
  }

  /** Search for the input term, and display results in UI */
  search(term) {
    // // Clear search results
    // this.refs.results.innerHTML = "";
    // // Get the top ten search results
    // this.searchResults = this.searchService.search(term).slice(0, 10);
    // // Display search results on UI
    // this.searchResults.forEach(result => this.displaySearchResult(result));
  }

  /** Add search result row to UI */
  displaySearchResult(searchResult) {
    let layerItem = document.createElement("div");
    layerItem.textContent = searchResult.name;
    layerItem.addEventListener("click", () =>
      this.searchResultSelected(searchResult)
    );
    this.refs.results.appendChild(layerItem);
  }

  /** Display the selected search result  */
  citySelected(value) {
    // Clear search input and results
    //this.refs.input.value = "";
    //this.refs.results.innerHTML = "";

    // Send selected result to listeners
    this.triggerEvent("resultSelected");

    let ddl = this.refs.input;
    var opts = ddl.options.length;
    for (var i = 0; i < opts; i++) {
      if (ddl.options[i].value == value) {
        ddl.options[i].selected = true;
        break;
      }
    }
    //this.triggerEvent("resultSelected", searchResult);
  }
}
