/** API Wrapper Service Class */
export class ApiService {
  constructor(url) {
    this.url = url;
  }
  getSoofaData(city) {
    var myScript = document.createElement("script");
    myScript.setAttribute("src", `${this.url}SoofaData${city}.js`);
    document.head.appendChild(myScript);
  }
}
