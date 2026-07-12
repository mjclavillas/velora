import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useDebounce,
  useToggle,
  useCopyToClipboard,
  useLocalStorage,
  usePrevious,
} from "../hooks";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("debounces updates", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "hello" } }
    );
    rerender({ value: "world" });
    expect(result.current).toBe("hello");
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe("world");
  });
});

describe("useToggle", () => {
  it("initializes with false by default", () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it("toggles state", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[1]());
    expect(result.current[0]).toBe(true);
    act(() => result.current[1]());
    expect(result.current[0]).toBe(false);
  });

  it("sets state directly", () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => result.current[2](true));
    expect(result.current[0]).toBe(true);
  });
});

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });
  afterEach(() => vi.useRealTimers());

  it("copies text and sets copied=true", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => result.current[1]("hello"));
    expect(result.current[0]).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("hello");
  });

  it("resets copied after timeout", async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));
    await act(async () => result.current[1]("hello"));
    expect(result.current[0]).toBe(true);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current[0]).toBe(false);
  });
});

describe("useLocalStorage", () => {
  beforeEach(() => localStorage.clear());

  it("returns initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default")
    );
    expect(result.current[0]).toBe("default");
  });

  it("persists value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default")
    );
    act(() => result.current[1]("updated"));
    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem("test-key")).toBe('"updated"');
  });

  it("removes value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default")
    );
    act(() => result.current[1]("set"));
    act(() => result.current[2]());
    expect(result.current[0]).toBe("default");
  });
});

describe("usePrevious", () => {
  it("returns undefined on first render", () => {
    const { result } = renderHook(() => usePrevious("hello"));
    expect(result.current).toBeUndefined();
  });

  it("returns previous value after update", () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: "first" } }
    );
    rerender({ value: "second" });
    expect(result.current).toBe("first");
  });
});
