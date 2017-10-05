"use strict"

const scrapeIt = require("scrape-it");
const pageModel = require("./page_models/models.js");

let doScrape = function (url, model, cb) {
    scrapeIt(url, pageModel[model]).then(cb);
};


doScrape("http://www.gallito.com.uy/inmuebles/venta", "houseTileModel", (page => {
    if (page.houseTiles !== null && page.houseTiles !== undefined && page.houseTiles.length > 0) {
        page.houseTiles.forEach(function (houseTile) {
            let houseUrl = houseTile.url;
            let houseUrlParts = houseTile.url.split('-');
            let houseId = houseUrlParts[houseUrlParts.length - 1];
            doScrape(houseUrl, "houseModel", (page => {
                console.log(page.bedrooms);
            }));
        });
    }
}));
