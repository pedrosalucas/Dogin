import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, within } from "../../../utils/test-utils";
import configureStore from "redux-mock-store";

import LoginForm from "./index.js";

import { userLogin } from "../../../providers/user";

jest.mock("../../../providers/user", () => ({
  ...jest.requireActual("../../../providers/user"),
  userLogin: jest.fn(),
}));

const mockStore = configureStore([]);
let store;

const setup = ({ loadingToken = false, errorToken =  null, loadingUser = false, errorUser = null }) => {
  store = mockStore({
    token: { loading: loadingToken, error: errorToken },
    user: { loading: loadingUser, error: errorUser },
  });

  store.dispatch = jest.fn();

  return render(<LoginForm />, { store: store });
};

describe("<LoginForm />", () => {
  test("with filled fields", () => {
    setup({});

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
    expect(userLogin).toHaveBeenCalledWith({ username: "dogUsername", password: "dogPassword" });
  });

  test("without filled all fields", () => {
    setup({});
    
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

  test("without filled user field", () => {
    setup({});
    
    const inputUsername = screen.getByLabelText("Usuário");
    expect(inputUsername).toHaveAttribute("value", "");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "somePassword");
    expect(inputPassword).toHaveAttribute("value", "somePassword");

    const loginButton = screen.getByRole("button");
    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(userLogin).toHaveBeenCalledTimes(0);

    const userContainer = within(screen.getByTestId("usernameContainer"));
    expect(userContainer.getByText("Preencha um valor.")).toBeTruthy();
  });

  test("without filled password field", () => {
    setup({});
    
    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "someUsername");
    expect(inputUsername).toHaveAttribute("value", "someUsername");

    const inputPassword = screen.getByLabelText("Senha");
    expect(inputPassword).toHaveAttribute("value", "");

    const loginButton = screen.getByRole("button");
    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);
    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(userLogin).toHaveBeenCalledTimes(0);

    const passwordContainer = within(screen.getByTestId("passwordContainer"));
    expect(passwordContainer.getByText("Preencha um valor.")).toBeTruthy();
  });

  test("when loading of token reducer is true", () => {
    setup({ loadingToken: true });

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dogUsername");
    expect(inputUsername).toHaveAttribute("value", "dogUsername");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dogPassword");
    expect(inputPassword).toHaveAttribute("value", "dogPassword");

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeDisabled();

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(userLogin).toHaveBeenCalledTimes(0);
  });

  test("when loading of user reducer is true", () => {
    setup({ loadingUser: true });

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dogUsername");
    expect(inputUsername).toHaveAttribute("value", "dogUsername");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dogPassword");
    expect(inputPassword).toHaveAttribute("value", "dogPassword");

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeDisabled();

    expect(store.dispatch).toHaveBeenCalledTimes(0);
    expect(userLogin).toHaveBeenCalledTimes(0);
  });

  test("when token reducer has error", () => {
    setup({ errorToken: true });

    expect(screen.getByText("Dados Incorretos.")).toBeInTheDocument();
  });

  test("when user reducer has error", () => {
    setup({ errorUser: true });
    
    expect(screen.getByText("Dados Incorretos.")).toBeInTheDocument();
  });
});
