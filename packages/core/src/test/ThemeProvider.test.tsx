import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../theme/ThemeProvider";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
);

describe("ThemeProvider", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-velora-theme");
    document.documentElement.classList.remove("dark");
    localStorage.clear();
  });

  it("sets data-velora-theme on documentElement", () => {
    render(<ThemeProvider defaultTheme="dark"><div /></ThemeProvider>);
    expect(document.documentElement.getAttribute("data-velora-theme")).toBe("dark");
  });

  it("adds .dark class for dark theme", () => {
    render(<ThemeProvider defaultTheme="dark"><div /></ThemeProvider>);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("removes .dark class for light theme", () => {
    render(<ThemeProvider defaultTheme="light"><div /></ThemeProvider>);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("provides theme context", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe("dark");
  });

  it("setTheme updates the theme", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme("light"));
    expect(result.current.theme).toBe("light");
  });

  it("resolves system theme based on prefers-color-scheme", () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    const { result } = renderHook(
      () => useTheme(),
      {
        wrapper: ({ children }) => (
          <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
        ),
      }
    );
    expect(result.current.resolvedTheme).toBe("dark");
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within a <ThemeProvider>"
    );
    consoleSpy.mockRestore();
  });

  it("lists all available themes", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.themes).toContain("dark");
    expect(result.current.themes).toContain("light");
    expect(result.current.themes).toContain("cyberpunk");
  });
});
