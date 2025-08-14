import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: Record<string, number>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items[id] = (state.items[id] || 0) + 1;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id] -= 1;
        if (state.items[id] <= 0) {
          delete state.items[id];
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
