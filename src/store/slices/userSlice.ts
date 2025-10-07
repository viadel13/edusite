import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface InfosUser {
  name: string;
  sexe: string;
}

const initialState: InfosUser = {
  name: "Viadel",
  sexe: "Masculin",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateInfos: (state, action: PayloadAction<{ sexe: string }>) => {
      state.sexe = action.payload.sexe;
    },
  },
});

export const { updateInfos } = usersSlice.actions;

export const selectUser = (state: RootState) => state.user.sexe;

export default usersSlice.reducer;
