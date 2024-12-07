import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/Input";

describe("Input Component", () => {
  it("renders correctly without optional props", () => {
    render(<Input id="test-input" />);

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).not.toHaveAttribute("data-error", "true");
    expect(inputElement).not.toHaveAttribute("data-error", "false");
  });

  it("renders with label", () => {
    const label = "Test Label";
    render(<Input id="test-input" label={label} />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute("for", "test-input");
  });

  it("applies custom class correctly", () => {
    const customClass = "custom-class";
    render(<Input id="test-input" customClass={customClass} />);

    const inputElement = screen.getByTestId("input");
    expect(inputElement).toHaveClass(customClass);
  });

  it("displays error message when error is true", () => {
    const errorMessage = "This field is required.";
    render(
      <Input
        id="test-input"
        error="true"
        errorMessage={errorMessage}
      />
    );

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-700");
  });

  it("does not display error message when error is false", () => {
    render(
      <Input
        id="test-input"
        error="false"
        errorMessage="This field is required."
      />
    );

    const errorElement = screen.queryByText("This field is required.");
    expect(errorElement).not.toBeInTheDocument();
  });

  it("allows input value to be entered", async () => {
    render(<Input id="test-input" name="test" />);
    const inputElement = screen.getByTestId("input");

    await userEvent.type(inputElement, "Hello World");
    expect(inputElement).toHaveValue("Hello World");
  });
});
