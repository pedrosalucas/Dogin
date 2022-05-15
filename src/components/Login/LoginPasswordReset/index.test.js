import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../utils/test-utils";

import LoginPasswordReset from "./index.js";

import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

jest.mock("../../../hooks/useFetch");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const setup = ({
  loadingUseFetch = false,
  errorUseFetch = false,
  responseOk = true,
  requestFn = jest.fn(),
  navigate = jest.fn(),
}) => {
  useFetch.mockReturnValue({
    loading: loadingUseFetch,
    error: errorUseFetch,
    request: requestFn.mockResolvedValue({ response: { ok: responseOk } }),
  });

  useNavigate.mockReturnValue(navigate);

  return render(<LoginPasswordReset />, {});
};

describe("<LoginPasswordLost />", () => {
  test("with fill field", () => {
    const requestFn = jest.fn();
    setup({ responseOk: false, requestFn });

    const inputPassword = screen.getByLabelText("Nova Senha");
    userEvent.type(inputPassword, "password123");
    expect(inputPassword).toHaveAttribute("value", "password123");

    const resetButton = screen.getByRole("button");
    expect(resetButton).not.toBeDisabled();

    userEvent.click(resetButton);
    expect(requestFn).toHaveBeenCalledTimes(1);
  });

  test("when request response is truly", async () => {
    const requestFn = jest.fn();
    const navigate = jest.fn();

    setup({ responseOk: true, requestFn, navigate });

    expect(screen.getByText("Resete a Senha")).toBeInTheDocument();

    const inputPassword = screen.getByLabelText("Nova Senha");
    userEvent.type(inputPassword, "password123");
    expect(inputPassword).toHaveAttribute("value", "password123");

    const resetButton = screen.getByRole("button");
    expect(resetButton).not.toBeDisabled();

    userEvent.click(resetButton);
    expect(requestFn).toHaveBeenCalledTimes(1);

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/login"));
  });

  test("when the field was not filled", () => {
    const requestFn = jest.fn();
    setup({ requestFn });

    const inputPassword = screen.getByLabelText("Nova Senha");
    expect(inputPassword).toHaveAttribute("value", "");

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();

    userEvent.click(createButton);
    expect(requestFn).toHaveBeenCalledTimes(0);

    expect(screen.getByText("Preencha um valor.")).toBeInTheDocument();
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
