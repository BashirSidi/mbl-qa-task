import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import AddItemPage from "./AddItemPage";
import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "../store/slices/itemSlice";

const mockItems = [
  { id: 1, name: "Item 3", description: "Description of Item 3" },
  { id: 2, name: "Item 4", description: "Description of Item 4" },
];

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
  preloadedState: {
    items: { items: mockItems, isLoading: false, error: null },
  },
});

describe("AddItemPage", () => {
  it("should render and display Create Item on the AddItemPage", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/items/create"]}>
          <Routes>
            <Route path="/items/create" element={<AddItemPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const createItemTitle = getByTestId("createItem").textContent;
    expect(createItemTitle).toEqual("Create Item");
  });
});

describe("AddItemPage", () => {
  it("should render and display Create Item Button on the AddItemPage", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/items/create"]}>
          <Routes>
            <Route path="/items/create" element={<AddItemPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const createItemButton = getByTestId("createItemButton");
    expect(createItemButton.tagName).toBe("BUTTON");
  });
});
