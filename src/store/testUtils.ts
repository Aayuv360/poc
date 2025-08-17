/* eslint-disable */

// testUtils.tsx
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store/rootReducer";
import { AppStore } from "@/store";

export function renderWithStore(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: {
    preloadedState?: any;
    store?: AppStore;
  } = {}
) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(Provider, { store, children });
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
