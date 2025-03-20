import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";

describe("ErrorBoundary", () => {
  test("エラーが発生していない場合、childrenを正常にレンダリングすること", () => {
    render(
      <ErrorBoundary fallback={(error) => <div>Error: {error.message}</div>}>
        <div>Normal Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Normal Content")).toBeInTheDocument();
  });

  test("エラーが発生した場合、fallbackコンポーネントを表示すること", () => {
    const ThrowError = () => {
      throw new Error("Test Error");
    };

    render(
      <ErrorBoundary fallback={(error) => <div>Error: {error.message}</div>}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText("Error: Test Error")).toBeInTheDocument();
  });
});
