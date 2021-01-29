# ポケモン図鑑（API）

## 使用技術

* 言語
  * Node.js (14.0.0)
  * Typescript (4.1.3)

* バージョン管理
  * NVM
    * 参考：[Nodeのバージョンを切り替えられる「NVM」（Windows編）](http://blog.h2o-space.com/2016/11/1095/)
  * NVM
    * 参考：[NodebrewでNodeをインストールする（Mac）](https://qiita.com/mame_daifuku/items/373daf5f49ee585ea498)

* フレームワーク
  * Express (4.17.1)

* ビルド
  * webpack (5.10.1)

* 静的検証ツール
  * ESLint (7.15.0)
  * airbnb (14.2.1)

* コードフォーマット
  * prettier (2.2.1)

* コードの静的分析
  * sonarqube

* DB
  * MySQL (5.7)

* ORM
  * typeorm (0.2.29)

* テスト
  * jest (26.6.3)

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
