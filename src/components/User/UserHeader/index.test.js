import "@testing-library/jest-dom";
import { render, screen } from "../../../utils/test-utils";

import UserHeader from "./index.js";

jest.mock("../../../hooks/useMedia");

const setup = ({ mockLocation = '/' }) => {

  
  return render(<UserHeader />, { pathname: mockLocation});
};

describe("<UserHeader />", () => {
  test("when the pathname is /", () => {
    setup({});

    expect(screen.getByText("Minha Conta")).toBeInTheDocument();
  });

  test("when the pathname is /conta/estatisticas", () => {
    const mockLocation = "/conta/estatisticas";
    setup({ mockLocation });

    expect(screen.getByText("Estatísticas")).toBeInTheDocument();
  });

  test("when the pathname is /conta/postar", () => {
    const mockLocation = "/conta/postar";
    setup({ mockLocation });

    expect(screen.getByText("Poste Sua Foto")).toBeInTheDocument();
  });
});
