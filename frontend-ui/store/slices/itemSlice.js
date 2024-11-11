import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/apiService";
import { toast } from "react-toastify";

export const fetchItems = createAsyncThunk("items/fetchItems", async (_, { rejectWithValue }) => {
  try {
    const response = await apiService.request({
      method: "GET",
      url: "/items",
    });
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await apiService.request({
        method: "GET",
        url: `/items/${itemId}`,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createItem = createAsyncThunk(
  "items/createItem",
  async (itemData, { rejectWithValue }) => {
    try {
      console.log("itemData", itemData);
      const response = await apiService.request({
        method: "POST",
        url: "/items",
        data: itemData,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("data,", data);
      console.log("id,", id);
      const response = await apiService.request({
        method: "PATCH",
        url: `/items/${id}`,
        data: data,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await apiService.request({
        method: "DELETE",
        url: `/items/${itemId}`,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
    selectedItem: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(createItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Created successfully");
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Item updated successfully");
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedItem } = itemSlice.actions;

export default itemSlice.reducer;
