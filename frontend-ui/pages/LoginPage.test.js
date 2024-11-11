import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import LoginPage from "./LoginPage";
import { loginUser } from "../store/slices/authSlice";
import { toast } from "react-toastify";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../store/slices/authSlice", () => ({
  loginUser: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockStore = {
  auth: {
    isLoading: false,
  },
};

const store = createStore((state) => state, mockStore);

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render LoginPage and handle form submission", async () => {
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue(mockStore.auth);
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    // Check if form elements are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        loginUser({ username: "testuser", password: "testpassword" }),
      );
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/items");
    });
  });

  it("should show error toast if login fails", async () => {
    const dispatch = jest.fn().mockRejectedValueOnce(new Error("Login failed"));
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockReturnValue(mockStore.auth);
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login failed: Error: Login failed");
    });
  });
});
