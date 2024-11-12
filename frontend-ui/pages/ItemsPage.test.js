import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ItemsPage from "./ItemsPage";
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../store/slices/itemSlice";

const mockItems = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
  preloadedState: {
    items: { items: mockItems, isLoading: false, error: null },
  },
});

describe("ItemsPage", () => {
  it("Item page should show an item listing of all items", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ItemsPage />
        </BrowserRouter>
      </Provider>,
    );

    const itemsPage = getByTestId("items").textContent;
    expect(itemsPage).toEqual("Items Listing");
  });
});
