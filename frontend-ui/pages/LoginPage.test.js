import React from "react";
import authReducer from "../store/slices/authSlice";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

describe("LoginPage", () => {
  it("Login page should have a field label Username", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>,
    );

    const loginPage = getByTestId("username").textContent;
    expect(loginPage).toEqual("Username");
  });
});
