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
                HouseModel.findOne({ externalId: { $eq: houseId }}, {}, function(err, matchingHouse) {
                    if(err) return console.error(err);
                    // if(!matchingHouse || matchingHouse.priceText !== houseTile.price){
						enterHouse(houseTile, matchingHouse, houseUrl, houseId);
					// }
                });
            });
        }
    }));
}).catch(function(err){
    console.log(err);
});

function enterHouse(houseTile, existingHouse, houseUrl, houseId){
	doScrape(houseUrl, "houseModel", (page => {
		console.log('Entering house '+houseUrl);
		var newHouse = {
			priceText: houseTile.price,
			externalId: houseId,
		};
		if(!existingHouse){
			var newHouseToInsert = new HouseModel(newHouse);
			newHouseToInsert.save(function(err){
				if(err) console.error(err);
			});
		}else{
			newHouse.updated_at = Date.now;
			existingHouse.update(newHouse, function(err, numberAffected, rawResponse){
				if(err) console.error(err);
			});
		}

	}));
}
