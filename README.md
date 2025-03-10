# React + TypeScript + Vite

このテンプレートは、Vite で React を使用するための最小限のセットアップを提供し、HMR と ESLint ルールを含んでいます。

現在、2 つの公式プラグインが利用可能です:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) - [Babel](https://babeljs.io/) を使用した Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) - [SWC](https://swc.rs/) を使用した Fast Refresh

## 開発コマンド

開発に利用できる npm スクリプトは以下の通りです:

```bash
# 開発サーバーを起動する
npm run dev

# 本番用アプリケーションをビルドする
npm run build

# ローカルで本番ビルドをプレビューする
npm run preview

# ESLint でコードの問題をチェックする
npm run lint

# TypeScript の型チェックを実行する
npm run typecheck
```

## ESLint 設定の拡張

本番アプリケーションを開発している場合は、型を認識する lint ルールを有効にするために設定を更新することをお勧めします:

```js
export default tseslint.config({
  extends: [
    // ...tseslint.configs.recommended を削除して以下に置き換え
    ...tseslint.configs.recommendedTypeChecked,
    // または、より厳格なルールを使用
    ...tseslint.configs.strictTypeChecked,
    // オプションで、スタイルに関するルールを追加
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // その他のオプション...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

また、React 固有の lint ルールのために [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) と [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) をインストールすることもできます:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // react-x と react-dom プラグインを追加
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // その他のルール...
    // 推奨 TypeScript ルールを有効化
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

## プロジェクトセットアップ

このテンプレートを使い始めるには:

1. リポジトリをクローンする
2. 依存関係をインストール:
   ```bash
   npm install
   ```
3. 開発サーバーを起動:
   ```bash
   npm run dev
   ```

## 本番用ビルド

デプロイの準備ができたら:

```bash
npm run build
```

ビルドされたファイルは `dist` ディレクトリに生成され、お好みのホスティングサービスにデプロイできます。
