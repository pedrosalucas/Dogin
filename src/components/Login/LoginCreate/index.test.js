import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../utils/test-utils";
import configureStore from "redux-mock-store";

import LoginCreate from "./index.js";

import { userLogin } from "../../../providers/user";
import useFetch from "../../../hooks/useFetch";

jest.mock("../../../hooks/useFetch");

jest.mock("../../../providers/user", () => ({
  ...jest.requireActual("../../../providers/user"),
  userLogin: jest.fn(),
}));

const mockStore = configureStore([]);
let store;

const setup = ({
  loadingUseFetch = false,
  errorUseFetch = false,
  responseOk = true,
  requestFn = jest.fn(),
}) => {
  useFetch.mockReturnValue({
    loading: loadingUseFetch,
    error: errorUseFetch,
    request: requestFn.mockResolvedValue({ response: { ok: responseOk } }),
  });

  store = mockStore();
  store.dispatch = jest.fn();

  return render(<LoginCreate />, { store: store });
};

describe("<LoginCreate />", () => {
  test("with filled fields", async () => {
    const requestFn = jest.fn();
    setup({ requestFn });

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dogUsername");
    expect(inputUsername).toHaveAttribute("value", "dogUsername");

    const inputEmail = screen.getByLabelText("Email");
    userEvent.type(inputEmail, "dog@email.com");
    expect(inputEmail).toHaveAttribute("value", "dog@email.com");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dogPassword");
    expect(inputPassword).toHaveAttribute("value", "dogPassword");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(userLogin).toHaveBeenCalledWith({
        username: "dogUsername",
        password: "dogPassword",
      });
    });
  });

  test("without filled all fields", async () => {
    const requestFn = jest.fn();
    setup({ errorUseFetch: "Dados incompletos", responseOk: false, requestFn });

    const inputUsername = screen.getByLabelText("Usuário");
    expect(inputUsername).toHaveAttribute("value", "");

    const inputEmail = screen.getByLabelText("Email");
    expect(inputEmail).toHaveAttribute("value", "");

    const inputPassword = screen.getByLabelText("Senha");
    expect(inputPassword).toHaveAttribute("value", "");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(1);

    expect(screen.getByText("Dados incompletos")).toBeInTheDocument();

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  test("when the email field was filled in a wrong format", async () => {
    setup({});

    const inputEmail = screen.getByLabelText("Email");
    userEvent.type(inputEmail, "dog_@emailcom");
    expect(inputEmail).toHaveAttribute("value", "dog_@emailcom");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);

    expect(screen.getByText("Preencha um email válido.")).toBeInTheDocument();
  });

  test("when loading is true", async () => {
    const requestFn = jest.fn();
    setup({ loadingUseFetch: true, requestFn });

    const createButton = screen.getByRole("button");
    expect(createButton).toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });

  test("when error has message", () => {
    setup({ errorUseFetch: "Error message" });

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });

  test("when response.ok is false", async () => {
    const requestFn = jest.fn();
    setup({ responseOk: false, requestFn });

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dogUsername");
    expect(inputUsername).toHaveAttribute("value", "dogUsername");

    const inputEmail = screen.getByLabelText("Email");
    userEvent.type(inputEmail, "dog@email.com");
    expect(inputEmail).toHaveAttribute("value", "dog@email.com");

    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dogPassword");
    expect(inputPassword).toHaveAttribute("value", "dogPassword");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
