# ポケモン図鑑

## 使用技術

* 言語
  * Node.js (11.10.0)
  * Typescript (3.5.3)

* バージョン管理
  * NVM
    * 参考：[Nodeのバージョンを切り替えられる「NVM」（Windows編）](http://blog.h2o-space.com/2016/11/1095/)

* フレームワーク
  * Express (4.17.1)

* ビルド
  * ttypescript (1.5.7)

* 静的検証ツール
  * ESLint (6.1.0)
  * airbnb (13.2.0)

* コードフォーマット
  * prettier (1.18.2)

* コードの静的分析
  * sonarqube

* スクレイピング
  * puppeteer (1.19.0)

* DB
  * PostgreSQL (9.6)

* ORM
  * typeorm (0.2.10-rc.1)

* テスト
  * jest (24.9.0)

## セットアップ

* 本プロジェクトのクローン

```
$ git clone https://github.com/pokemon-picture-book/pokemon-api.git pokemon-api
```

* プロジェクトに移動

```
$ cd pokemon-api
```

* パッケージのインストール

```
$ npm ci
```

* マイグレーション

[pokemon-compose](https://github.com/pokemon-picture-book/pokemon-compose) プロジェクトにおいて、docker イメージ作成の際にマイグレーションが走ります
