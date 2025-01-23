# Browser Use Demo v2

## 概要
このプロジェクトは、Browser-use を使用したデモアプリケーションです。
以下のデモ動画の通り、ユーザーがWEBブラウザ上でやりたいタスクを入力し、LLMがそのタスクを自動実行します。

[![Demo Video]](https://drive.google.com/file/d/1bg16_FQcVuJ6hsI5CxYMnoJvmXomTUKK/view?usp=sharing)

## 目次
1. [開発環境のセットアップ](#開発環境のセットアップ)
2. [本番環境のビルドとデプロイ](#本番環境のビルドとデプロイ)

## 開発環境のセットアップ

### 必要なツール
- Node.js (v18以上)
- Python (v3.9以上)
- npm (v9以上)

### セットアップ手順
1. 依存パッケージのインストール
```bash
# フロントエンドの依存パッケージをインストール
npm install

# バックエンドの依存パッケージをインストール
pip install -r requirements.txt
```

2. バックエンドサーバーの起動
```bash
python app.py
```

3. フロントエンドサーバーの起動
```bash
npm run dev
```

4. アプリケーションにアクセス
- ブラウザで http://localhost:5173/ にアクセス

## 本番環境のビルドとデプロイ

### ビルド手順
```bash
npm run build
```

### プレビュー
```bash
npm run preview
```
- ブラウザで http://localhost:4173/ にアクセス

### デプロイ手順
1. `dist`ディレクトリに本番用ビルドファイルが生成されます
2. `dist`ディレクトリの内容を本番サーバーにデプロイ
3. 環境変数の設定
   - `.env.production`ファイルを作成
   - 必要な環境変数を設定（例：APIエンドポイント、認証情報など）
