import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

export type Locale = "it" | "en" | "sc" | "nap" | "vec";

interface UIState {
  locale: Locale;
  bookingStep: number;
}

const uiSlice = createSlice({
  name: "ui",
  initialState: { locale: "it", bookingStep: 0 } as UIState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
    },
    setBookingStep(state, action: PayloadAction<number>) {
      state.bookingStep = action.payload;
    },
  },
});

export const { setLocale, setBookingStep } = uiSlice.actions;

export const store = configureStore({
  reducer: { ui: uiSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
