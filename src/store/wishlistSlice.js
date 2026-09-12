import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../api/wishlist";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();

      if (!response.ok) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo obtener la lista de favoritos"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const response = await addToWishlist(productId);

      if (!response.ok) {
        return rejectWithValue(response.message);
      }

      dispatch(fetchWishlist());

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo agregar el producto a favoritos"
      );
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProductFromWishlist",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const response = await removeFromWishlist(productId);

      if (!response.ok) {
        return rejectWithValue(response.message);
      }

      dispatch(fetchWishlist());

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo eliminar el producto de favoritos"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },

    clearWishlistError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.items = Array.isArray(action.payload)
          ? action.payload
          : [];
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addProductToWishlist.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        addProductToWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeProductFromWishlist.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(
        removeProductFromWishlist.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearWishlist,
  clearWishlistError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;