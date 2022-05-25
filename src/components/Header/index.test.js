import "@testing-library/jest-dom";
import { render, screen } from "../../utils/test-utils";
import configureStore from "redux-mock-store";

import Header from "./index.js";

const mockStore = configureStore([]);
let store;

const setup = ({ dataUser = null }) => {
  store = mockStore({
    user: { data: dataUser },
  });
  store.dispatch = jest.fn();

  return render(<Header />, { store: store });
};

describe("<Header />", () => {
  test("without data", async () => {
    setup({});

    expect(screen.getByText("Login / Criar")).toBeInTheDocument();
  });

  test("with data", async () => {
    setup({ dataUser: { nome: "Name" } });

    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});
