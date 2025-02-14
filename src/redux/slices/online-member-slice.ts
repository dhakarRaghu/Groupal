import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateProps = {
  members: { id: string }[];
};

const initialState: InitialStateProps = {
  members: [],
};

export const onlineTracking = createSlice({
  name: "online",
  initialState,
  reducers: {
    onOnline: (state, action: PayloadAction<InitialStateProps>) => {
      // Check for duplicates: for each incoming member, add it if not already present
      action.payload.members.forEach(newMember => {
        if (!state.members.find(member => member.id === newMember.id)) {
          state.members.push(newMember);
        }
      });
    },
    onOffline: (state, action: PayloadAction<InitialStateProps>) => {
      // Remove all members present in action.payload.members
      state.members = state.members.filter(
        (member) =>
          !action.payload.members.find((m) => m.id === member.id)
      );
    },
  },
});

export const { onOnline, onOffline } = onlineTracking.actions;
export default onlineTracking.reducer;
