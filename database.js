module.exports = {
    connect: function(){
        const http = require ('http');
        const mongoose = require ("mongoose");
        const config = require('./config');

        // Here we find an appropriate database to connect to, defaulting to
        // localhost if we don't find one.
        let mongoUrl = config.mongoUrl;

        // Makes connection asynchronously.  Mongoose will queue up database
        // operations and release them when the connection is complete.
        let promise = mongoose.connect(mongoUrl, {
          useMongoClient: true
        });

        return promise;
    }
}
