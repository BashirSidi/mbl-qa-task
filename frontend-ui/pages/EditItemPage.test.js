import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, MemoryRouter } from "react-router-dom";
import EditItemPage from "./EditItemPage";
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

describe("EditItemPage", () => {
  it("should render and display the correct item details for editing", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/items/3"]}>
          <Routes>
            <Route path="/items/:id" element={<EditItemPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const editItemTitle = getByTestId("editItem").textContent;
    expect(editItemTitle).toEqual("Edit Item");
  });
});
