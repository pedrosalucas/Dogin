import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../utils/test-utils";

import LoginPasswordLost from "./index.js";

import useFetch from "../../../hooks/useFetch";

jest.mock("../../../hooks/useFetch");

const setup = ({
  dataUseFetch = {},
  loadingUseFetch = false,
  errorUseFetch = false,
  requestFn = jest.fn(),
}) => {
  useFetch.mockReturnValue({
    data: dataUseFetch,
    loading: loadingUseFetch,
    error: errorUseFetch,
    request: requestFn,
  });

  return render(<LoginPasswordLost />, {});
};

describe("<LoginPasswordLost />", () => {
  test("with fill field", () => {
    const requestFn = jest.fn();
    setup({ requestFn });

    const inputEmail = screen.getByLabelText("Email ou Usuário");
    userEvent.type(inputEmail, "dog@email.com");
    expect(inputEmail).toHaveAttribute("value", "dog@email.com");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(1);
  });

  test("when the field was not filled", () => {
    const requestFn = jest.fn();
    setup({ requestFn });

    const inputLogin = screen.getByLabelText("Email ou Usuário");
    expect(inputLogin).toHaveAttribute("value", "");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(0);

    expect(screen.getByText("Preencha um valor.")).toBeInTheDocument();
  });

  test("when return data from request", () => {
    setup({ dataUseFetch: "Data message" });

    expect(screen.getByText("Data message")).toBeInTheDocument();
  });

  test("when loading is true", () => {
    const requestFn = jest.fn();
    setup({ loadingUseFetch: true, requestFn });

    const createButton = screen.getByRole("button");
    expect(createButton).toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(0);
  });

  test("when error has message", () => {
    setup({ errorUseFetch: "Error message" });

    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
});
