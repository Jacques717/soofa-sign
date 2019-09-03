var helper = require("../src/helper");

describe("Clone object", () => {
  it("calulcate if the object is the same", () => {
    const x = { name: "Hello Soofa" };

    expect(helper.clone(x).name).toEqual(x.name);
  });
});
