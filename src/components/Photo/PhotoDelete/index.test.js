import "@testing-library/jest-dom";
import { render, screen } from "../../../utils/test-utils";

import PhotoDelete from "./index.js";

import useFetch from "../../../hooks/useFetch";

jest.mock("../../../hooks/useFetch");

const setup = ({
  loadingUseFetch = false,
}) => {
  useFetch.mockReturnValue({
    loading: loadingUseFetch,
  });

  return render(<PhotoDelete />, {});
};

describe("<PhotoDelete />", () => {
  test("when loading is true", async () => {
    setup({ loadingUseFetch: true });

    const createButton = screen.getByRole("button");
    expect(createButton).toBeDisabled();
  });

  test("when loading is false", async () => {
    setup({});

    const createButton = screen.getByRole("button");
    expect(createButton).not.toBeDisabled();
  });
});
