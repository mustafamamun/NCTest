import React from "react";
import { shallow } from "enzyme";
import App from "../component/App";

const setUp = () => {
  const component = shallow(<App />);
  return component;
};

describe("App Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const app = component.find(".App");
    expect(app.length).toBe(1);
  });
});
