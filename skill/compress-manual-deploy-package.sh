#!/bin/bash

# デプロイモジュール作成

# パッケージファイル名
declare filename='alexa-jarajara-node.zip'

# デプロイモジュール格納フォルダ作成
mkdir -p ./Deploy

# 作業ディレクトリ移動
cd ./lambda/custom

# パッケージ再インストール
rm -rf ./node_modules && npm install

# トランスパイル
npm run build

# node_modules削除
rm -rf ./node_modules

# パッケージ再インストール
npm install --production --loglevel error

# 既存ファイル削除
rm -rf ../../Deploy/$filename

# デプロイモジュール作成
zip -9 -q ../../Deploy/$filename \
-r \
./config \
./dist/src \
./node_modules \
file \
./package.json \
-x \
./node_modules/aws-sdk/**\* \
"*.DS_Store" \
"*.js.map"

# ビルド（戻し）
npm install
