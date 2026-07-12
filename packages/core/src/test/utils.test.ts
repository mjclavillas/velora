import { describe, it, expect } from "vitest";
import {
  cn,
  clamp,
  mapRange,
  formatFileSize,
  generateId,
  isObject,
} from "../utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deduplicates Tailwind conflicting classes", () => {
    expect(cn("px-2 px-4")).toBe("px-4");
  });

  it("handles undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("handles arrays", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });
});

describe("clamp", () => {
  it("clamps to min", () => expect(clamp(-5, 0, 100)).toBe(0));
  it("clamps to max", () => expect(clamp(150, 0, 100)).toBe(100));
  it("returns value within range", () => expect(clamp(50, 0, 100)).toBe(50));
  it("handles equal min and max", () => expect(clamp(5, 10, 10)).toBe(10));
});

describe("mapRange", () => {
  it("maps 0 to target low", () => expect(mapRange(0, 0, 100, 0, 1)).toBe(0));
  it("maps 100 to target high", () => expect(mapRange(100, 0, 100, 0, 1)).toBe(1));
  it("maps midpoint correctly", () => expect(mapRange(50, 0, 100, 0, 1)).toBe(0.5));
  it("maps negative ranges", () =>
    expect(mapRange(0, -100, 100, 0, 1)).toBe(0.5));
});

describe("formatFileSize", () => {
  it("formats bytes", () => expect(formatFileSize(0)).toBe("0 B"));
  it("formats KB", () => expect(formatFileSize(1024)).toBe("1 KB"));
  it("formats MB", () => expect(formatFileSize(1024 * 1024)).toBe("1 MB"));
  it("formats GB", () =>
    expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB"));
  it("formats decimals", () =>
    expect(formatFileSize(1500)).toBe("1.5 KB"));
});

describe("generateId", () => {
  it("generates unique IDs", () => {
    const a = generateId();
    const b = generateId();
    expect(a).not.toBe(b);
  });

  it("uses custom prefix", () => {
    const id = generateId("btn");
    expect(id).toMatch(/^btn-\d+$/);
  });
});

describe("isObject", () => {
  it("returns true for plain objects", () =>
    expect(isObject({ a: 1 })).toBe(true));
  it("returns false for null", () => expect(isObject(null)).toBe(false));
  it("returns false for arrays", () => expect(isObject([])).toBe(false));
  it("returns false for primitives", () => {
    expect(isObject("string")).toBe(false);
    expect(isObject(42)).toBe(false);
  });
});
