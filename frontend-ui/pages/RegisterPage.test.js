import React from "react";
import authReducer from "../store/slices/authSlice";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("RegisterPage", () => {
  it("Register page should have a field to enter your password", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterPage />
        </BrowserRouter>
      </Provider>,
    );

    const registerPage = getByTestId("password").textContent;
    expect(registerPage).toEqual("Password");
  });
});
