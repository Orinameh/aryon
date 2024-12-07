import Login from "@/pages/login";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@tanstack/react-query", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    actual,
    useMutation: vi.fn().mockReturnValue({
      mutate: vi.fn(),
    }),
  };
});

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

afterEach(() => {
  vi.clearAllMocks();
});
describe("Login component", () => {
  it("renders form with username and password fields", () => {
    render(<Login />);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

//   it("renders error message for invalid username", async () => {
//     render(<Login />);
//     const usernameInput = screen.getByLabelText("Username");
//     fireEvent.change(usernameInput, { target: { value: "invalid" } });
//     await waitFor(() =>
//       expect(screen.getByText("Username is required")).toBeInTheDocument()
//     );
//   });

//   it("renders error message for invalid password", async () => {
//     render(<Login />);
//     const passwordInput = screen.getByLabelText("Password");
//     fireEvent.change(passwordInput, { target: { value: "invalid" } });
//     await waitFor(() =>
//       expect(screen.getByText("Password is required")).toBeInTheDocument()
//     );
//   });

//   it("calls API with correct credentials when form is submitted", async () => {
//     server.use(
//       http.post(api.defaults.baseURL + "/login", () => {
//         return HttpResponse.json({ message: "Login successful" });
//       })
//     );

//     render(<Login />);
//     const usernameInput = screen.getByLabelText("Username");
//     const passwordInput = screen.getByLabelText("Password");
//     const submitButton = screen.getByRole("button");

//     fireEvent.change(usernameInput, { target: { value: "admin" } });
//     fireEvent.change(passwordInput, { target: { value: "password" } });
//     fireEvent.click(submitButton);

//     await waitFor(() =>
//       expect(screen.getByText("Login successful")).toBeInTheDocument()
//     );
//   });

//   it("displays loading state when form is submitted", async () => {
//     server.use(
//       http.post(api.defaults.baseURL + "/login", async () => {
//         await delay();
//       })
//     );

//     render(<Login />);
//     const usernameInput = screen.getByLabelText("Username");
//     const passwordInput = screen.getByLabelText("Password");
//     const submitButton = screen.getByTestId("button");

//     fireEvent.change(usernameInput, { target: { value: "admin" } });
//     fireEvent.change(passwordInput, { target: { value: "password" } });
//     fireEvent.click(submitButton);

//     await waitFor(() => expect(submitButton).toBeDisabled());
//   });
});
