import "@testing-library/jest-dom";
import { render, screen } from "../../../utils/test-utils";
import userEvent from "@testing-library/user-event";

import UserHeaderNav from "./index.js";
import useMedia from "../../../hooks/useMedia";

jest.mock("../../../hooks/useMedia");

const setup = ({ useMediaReturn = false }) => {
  useMedia.mockReturnValue(useMediaReturn);

  return render(<UserHeaderNav />, {});
};

describe("<UserHeaderNav />", () => {
  test("when the device is not mobile", () => {
    setup({});

    expect(screen.getByRole("navigation").className).toContain("navDesktop");
  });

  test("when the device is mobile", () => {
    setup({ useMediaReturn: true });

    expect(screen.getByRole("navigation").className).toContain("navMobile");
    expect(screen.getByRole("navigation").className).not.toContain(
      "navMobileActive"
    );

    const menuButton = screen.getByRole("button", { name: "Menu" });
    userEvent.click(menuButton);

    expect(screen.getByRole("navigation").className).toContain(
      "navMobileActive"
    );
  });
});
