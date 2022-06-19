import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { reducer } from "../providers/configureStore";

const customRender = (
  ui,
  {initialState = {}, store = configureStore({ reducer, initialState }), pathname = '/', ...renderOptions }
) => {

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[pathname]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";

export { customRender as render };
