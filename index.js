"use strict"

const scrapeIt = require("scrape-it");
const pageModel = require("./page_models/models");
const db = require('./database');
const houseSchema = require('./models/house');
const HouseModel = require('mongoose').model('Houses', houseSchema);

let doScrape = function (url, model, cb) {
    scrapeIt(url, pageModel[model]).then(cb);
};

db.connect().then(function(){
    doScrape("http://www.gallito.com.uy/inmuebles/venta", "houseTileModel", (page => {
        if (page.houseTiles !== null && page.houseTiles !== undefined && page.houseTiles.length > 0) {
            page.houseTiles.forEach(function (houseTile) {
                let houseUrl = houseTile.url;
                let houseUrlParts = houseTile.url.split('-');
                let houseId = houseUrlParts[houseUrlParts.length - 1];
                doScrape(houseUrl, "houseModel", (page => {
                    HouseModel.findOne({ externalId: { $eq: houseId }}, {}, function(err, matchingHouse) {
                        if(err) return console.error(err);
                        if(!matchingHouse){
                            var newHouse = new HouseModel({
                                priceText: 'USD200000'
                            });
                            newHouse.save(function (err) {if (err) console.error(err)});
                        }else if(matchingHouse.priceText !== houseTile.price){
                            matchingHouse.priceText = houseTile.price;
                            matchingHouse.save(function (err) {if (err) console.error(err)});
                        }
                    });
                }));
                return;
            });
        }
    }));
}).catch(function(err){
    console.log(err);
});
