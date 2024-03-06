import { createSlice } from "@reduxjs/toolkit";

const storedDarkTheme = localStorage.getItem("darkTheme");
const initialState = {
  darkTheme: storedDarkTheme ? JSON.parse(storedDarkTheme) : false,
};

const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("darkTheme", JSON.stringify(state.darkTheme));
    },
  },
});

export const darkThemeActions = darkThemeSlice.actions;

export default darkThemeSlice.reducer;
