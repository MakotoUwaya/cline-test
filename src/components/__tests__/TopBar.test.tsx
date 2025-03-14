import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TopBar } from "../TopBar";
import * as useThemeModule from "../../hooks/useTheme";

// useTheme フックのモック
vi.mock("../../hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

describe("TopBar", () => {
  test("タイトルが表示されること", () => {
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
    });

    render(<TopBar />);
    expect(screen.getByText("Pokemon App")).toBeInTheDocument();
  });

  test("テーマ切り替えボタンがクリックできること", () => {
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
    });

    render(<TopBar />);
    const themeButton = screen.getByLabelText("テーマ切り替え");

    fireEvent.click(themeButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  test("テーマオプションを選択できること", () => {
    const setTheme = vi.fn();
    vi.mocked(useThemeModule.useTheme).mockReturnValue({
      theme: "light",
      setTheme,
    });

    render(<TopBar />);

    // メニューを開く
    fireEvent.click(screen.getByLabelText("テーマ切り替え"));

    // Darkテーマを選択
    fireEvent.click(screen.getByText("Dark"));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
