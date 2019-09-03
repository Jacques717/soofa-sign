import { CancelToken, get } from "axios";

/** API Wrapper Service Class */
export class ApiService {
  constructor(url) {
    this.url = url;
    this.cancelToken = CancelToken.source();
  }

  async httpGet(endpoint = "") {
    this.cancelToken.cancel("Cancelled Ongoing Request");
    this.cancelToken = CancelToken.source();
    const response = await get(`${this.url}${endpoint}`, {
      cancelToken: this.cancelToken.token
    });
    return response.data;
  }

  getSoofaData(city) {
    var myScript = document.createElement("script");
    myScript.setAttribute(
      "src",
      `${this.url}SoofaData${city}.js`
    );
    document.head.appendChild(myScript);
  }

  getLocations(type) {
    return this.httpGet(`locations/${type}`);
  }

  getLocationSummary(id) {
    return this.httpGet(`locations/${id}/summary`);
  }

  getKingdoms() {
    return this.httpGet("kingdoms");
  }

  getKingdomSize(id) {
    return this.httpGet(`kingdoms/${id}/size`);
  }

  getCastleCount(id) {
    return this.httpGet(`kingdoms/${id}/castles`);
  }

  getKingdomSummary(id) {
    return this.httpGet(`kingdoms/${id}/summary`);
  }

  async getAllKingdomDetails(id) {
    return {
      kingdomSize: await this.getKingdomSize(id),
      castleCount: await this.getCastleCount(id),
      kingdomSummary: await this.getKingdomSummary(id)
    };
  }
}
