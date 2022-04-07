import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../utils/test-utils";

import LoginForm from "./index.js";

import { userLogin } from "../../../providers/user";

const setup = () => {
  jest.clearAllMocks();

  let state = {
    token: { loading: true },
    user: { loading: true },
  };

  return render(<LoginForm />, {
    initialState: { token: { loading: true} }
  });
};

describe("Do login", () => {
  test("with login data right.", () => {
    setup();

    const titleLogin = screen.getByText("Login");
    expect(titleLogin).toBeInTheDocument();

    const inputUsername = screen.getByLabelText("Usuário");
    userEvent.type(inputUsername, "dog");
    const inputPassword = screen.getByLabelText("Senha");
    userEvent.type(inputPassword, "dog");

    const loginButton = screen.getByRole("button");
    expect(loginButton).toBeDisabled();
    // userEvent.click(loginButton);

    // expect(titleLogin).not.toBeInTheDocument();
  });
});
