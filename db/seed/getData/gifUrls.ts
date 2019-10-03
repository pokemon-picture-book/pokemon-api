import * as puppeteer from 'puppeteer';

import { ScrapingNewPage } from '@/@types/scraping';
import Pokemons from '@/entities/Pokemons';
import GifUrls from '@/entities/Gifs';
import { GifUrlsWithPokemons } from '@/@types/seed';

import ProgressBar = require('progress');

process.setMaxListeners(Infinity);

/**
 * 新規のページインスタンスを作成します.
 * @returns {Promise<ScrapingNewPage>}
 */
const getNewPage = async (): Promise<ScrapingNewPage> => {
  const launchOption: puppeteer.LaunchOptions = {
    timeout: 60000,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };
  if (process.env.CHROME_BIN) {
    // for Docker
    launchOption.executablePath = process.env.CHROME_BIN;
  }

  const browser: puppeteer.Browser = await puppeteer.launch(launchOption);
  const page: puppeteer.Page = await browser.newPage();

  return { browser, page };
};

/**
 * ページインスタンスを削除します.
 * @param {puppeteer.Browser} browser
 */
const closePage = async (browser: puppeteer.Browser): Promise<void> => {
  await browser.close();
};

/**
 * GifUrls オブジェクトへマッピングします.
 * @param {Pokemons} pokemon ポケモンデータ
 * @param {GifUrlsWithPokemons} gifUrlsWithPokemons スクレイピングで取得した gif url
 * @returns {GifUrls[]}
 */
const mappingGifUrls = (
  pokemon: Pokemons,
  gifUrlsWithPokemons: GifUrlsWithPokemons[]
): GifUrls[] =>
  gifUrlsWithPokemons.map(
    gifUrlsWithPokemon => new GifUrls(gifUrlsWithPokemon.url, pokemon.id)
  );

/**
 * サイト pokestadium から gif url を取得します.
 * @param {puppeteer.Page} page
 * @param {string} pokemonCode
 * @returns {Promise<GifUrlsWithPokemons[]>}
 */
const getGifUrlsWithPokemons = async (
  page: puppeteer.Page,
  pokemonCode: string
): Promise<GifUrlsWithPokemons[]> => {
  await page.reload({
    waitUntil: 'domcontentloaded'
  });

  await page.type('input[name="search-query"]', pokemonCode);

  await page.click('input[value="official-art"]');

  await page.click('input[value="main-series"]');

  await page.waitForSelector('div.sprite200 > img');

  const gifUrlsWithPokemons: GifUrlsWithPokemons[] = await page.$$eval(
    'div.sprite200 > img',
    (imgs: HTMLImageElement[]): GifUrlsWithPokemons[] =>
      imgs
        .filter(img => /.gif/.test(img.src))
        .map(img => ({
          url: img.src
        }))
  );

  return gifUrlsWithPokemons.length
    ? gifUrlsWithPokemons
    : getGifUrlsWithPokemons(page, pokemonCode);
};

/**
 * サイト pokestadium からデータをスクレイピングします.
 * @param {puppeteer.Page} page
 * @param {Pokemons[]} pokemons
 * @returns {Promise<GifUrls[]>}
 */
const scrapingPokeStadium = async (
  page: puppeteer.Page,
  pokemons: Pokemons[]
): Promise<GifUrls[]> => {
  const bar = new ProgressBar('  Processing [:bar] :rate/bps :percent :etas', {
    width: 40,
    total: pokemons.length,
    complete: '\u001b[42m \u001b[0m',
    incomplete: '\u001b[41m \u001b[0m'
  });

  await page.goto('http://www.pokestadium.com/tools/sprites', {
    waitUntil: 'domcontentloaded'
  });

  const gifUrls: GifUrls[][] = [];

  for (const pokemon of pokemons) {
    gifUrls.push(
      mappingGifUrls(pokemon, await getGifUrlsWithPokemons(page, pokemon.code))
    );

    bar.tick();
  }
  return gifUrls.flat();
};

/**
 * サイト pokestadium へのスクレイピングを実行します.
 * @param {Pokemons[]} pokemons
 * @returns {Promise<GifUrls[]>}
 */
export default async (pokemons: Pokemons[]): Promise<GifUrls[]> => {
  const newPage: ScrapingNewPage = await getNewPage();

  return scrapingPokeStadium(newPage.page, pokemons)
    .then((gifUrls: GifUrls[]) => gifUrls)
    .catch(err => {
      throw new Error(err);
    })
    .finally(async () => {
      await closePage(newPage.browser);
    });
};
