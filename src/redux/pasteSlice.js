import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addPaste: (state, action) => {
      console.log(state, action);
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    updatePaste: (state, action) => {
      const index = state.pastes.findIndex(
        (paste) => paste.id === action.payload.id
      );
      state.pastes[index] = action.payload;
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
    },
    deletePaste: (state, action) => {
      const index = state.pastes.findIndex(
        (paste) => paste.id === action.payload.id
      );
      state.pastes.splice(index, 1);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste deleted successfully");
    },
  },
});

export const { addPaste, updatePaste, deletePaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
