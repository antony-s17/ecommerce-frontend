import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  login,
  register,
  logout,
  getProfile,
} from "../api/auth";

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();

      if (!response.ok) {
        return rejectWithValue(
          response.message ||
            "No se pudo obtener el perfil"
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No hay una sesión activa"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      if (!response.ok) {
        return rejectWithValue(
          response.message ||
          "No se pudo iniciar sesión"
        );
      }
      const profileResponse = await getProfile();

      if (!profileResponse.ok) {
        return rejectWithValue(
          profileResponse.message ||
          "No se pudo obtener el perfil"
        );
      }
      return profileResponse.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Credenciales incorrectas"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);

      if (!response.ok) {
        return rejectWithValue(
          response.message ||
            "No se pudo registrar el usuario"
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo registrar el usuario"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();

      if (!response.ok) {
        return rejectWithValue(
          response.message ||
            "No se pudo cerrar sesión"
        );
      }

      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "No se pudo cerrar sesión"
      );
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH PROFILE
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;

        // No mostramos error porque puede ser simplemente
        // que el usuario todavía no haya iniciado sesión.
        state.error = null;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error =
          action.payload ||
          "No se pudo iniciar sesión";
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error =
          action.payload ||
          "No se pudo registrar el usuario";
      })

      // LOGOUT
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "No se pudo cerrar sesión";
      });
  },
});

export const {
  clearAuthError,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;