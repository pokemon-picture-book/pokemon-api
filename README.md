# ポケモン図鑑

## 使用技術

* 言語
  * Node.js (11.10.0)
  * Typescript (3.5.3)

* バージョン管理
  * NVM
    * 参考：[Nodeのバージョンを切り替えられる「NVM」（Windows編）](http://blog.h2o-space.com/2016/11/1095/)

* フレームワーク
  * micro (9.3.4)
  * microrouter (3.1.3)

* ビルド
  * ttypescript (1.5.7)

* 静的検証ツール
  * ESLint (6.1.0)
  * airbnb (13.2.0)

* コードの静的分析
  * sonarqube

* スクレイピング
  * puppeteer (1.19.0)

* DB
  * PostgreSQL (11.4)

* ORM
  * typeorm (0.2.18)

* テスト
  * jest (24.9.0)

## セットアップ

* 本プロジェクトのクローン

```
$ git clone https://github.com/noriyuki-shimizu/pokemon.git pokemon
```

* プロジェクトに移動

```
$ cd pokemon
```

* パッケージのインストール

```
$ (npm OR yarn) install
```

---
※ インストールでエラーが出る場合  
`image-to-ascii` のインストールで失敗している可能性が高い  
そのため、 `graphicsmagick` をインストールし、再度インストールしなおせば、正常にインストールが完了する

* Mac OS
```
$ brew install graphicsmagick
```

* Windows OS  
[こちらのサイトからインストールを行う](http://www.graphicsmagick.org/INSTALL-windows.html)
---

* マイグレーション

  * PostgreSQL 設定

  ```
  host: localhost
  port: 5432
  database: pokemon
  username: pokemon
  password: pokemon
  ```

  * 実行

  ```
  $ (npm run OR yarn) migrate:run
  ```

* 初期データ構築

```
$ (npm run OR yarn) initialize:data
```

* 初期データ構築完了後

<img src="https://github.com/noriyuki-shimizu/images/blob/master/pokemon_initdata_script.png?raw=true">
