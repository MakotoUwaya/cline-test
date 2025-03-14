import "@testing-library/jest-dom";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// @testing-library/jest-dom のマッチャーを追加
expect.extend(matchers as any);

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});
