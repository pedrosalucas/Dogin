import "@testing-library/jest-dom";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../utils/test-utils";
import configureStore from "redux-mock-store";

import LoginForm from "./index.js";

import { userLogin } from "../../../providers/user";

jest.mock("../../../providers/user", () => ({
  ...jest.requireActual("../../../providers/user"),
  userLogin: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Does login", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      token: { loading: false },
      user: { loading: false },
    });

    store.dispatch = jest.fn();

    render(<LoginForm />, { store: store });
  });
  test("with filled fields", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dogUsername");
    expect(inputUsername).toHaveAttribute("value", "dogUsername");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dogPassword");
    expect(inputPassword).toHaveAttribute("value", "dogPassword");

    const loginButton = screen.getByRole("button");
    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(userLogin).toHaveBeenCalledTimes(1);
  });

  test("without filled fields", () => {
    expect(screen.getByText("Login")).toBeInTheDocument();

    const inputUsername = screen.getByLabelText("Usuário");
    expect(inputUsername).toHaveAttribute("value", "");

    const inputPassword = screen.getByLabelText("Senha");
    expect(inputPassword).toHaveAttribute("value", "");

    const loginButton = screen.getByRole("button");
    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(userLogin).toHaveBeenCalledTimes(0);

    const userContainer = within(screen.getByTestId("usernameContainer"));
    expect(userContainer.getByText("Preencha um valor.")).toBeTruthy();
  });
});
