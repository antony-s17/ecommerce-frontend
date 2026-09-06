import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCart,
  addToCart,
  checkout,
} from "../api/cart";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();

      if (!response.ok) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo obtener el carrito"
      );
    }
  }
);
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const response = await addToCart({ productId });

      if (!response.ok) {
        return rejectWithValue(response.message);
      }
      dispatch(fetchCart());
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo agregar el producto"
      );
    }
  }
);
export const processCheckout = createAsyncThunk(
  "cart/processCheckout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkout();

      if (!response.ok) {
        return rejectWithValue(response.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo procesar el checkout"
      );
    }
  }
);

const initialState = {
  cartId: null,
  items: [],
  loading: false,
  error: null,
  order: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.cartId = null;
      state.items = [];
    },

    clearCartError: (state) => {
      state.error = null;
    },

    clearOrder: (state) => {
      state.order = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartId = action.payload.cartId;
        state.items = action.payload.items;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addProductToCart.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(processCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(processCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.cartId = null;
        state.items = [];
        state.order = action.payload;
      })

      .addCase(processCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearCart,
  clearCartError,
  clearOrder,
} = cartSlice.actions;

export default cartSlice.reducer;