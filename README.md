# React + TypeScript + Vite

このテンプレートは、Vite で React を使用するための最小限のセットアップを提供し、HMR と Biome によるコード整形を含んでいます。

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

# Biome でコードをフォーマットする
npm run format

# Biome でコードの問題をチェックする
npm run lint

# TypeScript の型チェックを実行する
npm run typecheck
```

## Biome の設定

本プロジェクトでは、コードの整形とリントに [Biome](https://biomejs.dev/) を使用しています。Biome は高速で設定が簡単な JavaScript/TypeScript のツールチェインです。

設定は `biome.json` で管理されており、以下のような機能が有効になっています:

- コードフォーマット
- リント
- インポートの整理

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
