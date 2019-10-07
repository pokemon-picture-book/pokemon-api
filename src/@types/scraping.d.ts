import * as puppeteer from 'puppeteer';

declare type ScrapingNewPage = {
    browser: puppeteer.Browser;
    page: puppeteer.Page;
};

declare type ScrapingExecutionParams = {
    moduleKey: string;
    actionKey: string;
    param: any;
};
