// This will manage the http calls to the iTunes api
// https://itunes.apple.com/search?parameterkeyvalue
// Where parameterkeyvalue can be one or more parameter key and value pairs 
// indicating the details of your query.
// Refer to https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
// for documentation on the API

const express = require('express');
const router = express.Router();
const https = require('https');


router.post('/', (req, res) => {
    const searchUrl = 'https://itunes.apple.com/search/?term=' + req.body.text + '&country=ZA&media=' + req.body.entity;
    
    https.get(searchUrl, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            const myObj = Object.assign(JSON.parse(data));
            const mySongList = [];
            for (let i = 0; i < myObj.results.length; i++){
                mySongList.push({ number: i, 
                    trackName: myObj.results[i].trackName, 
                    albumName: myObj.results[i].collectionName,
                    artistName: myObj.results[i].artistName
                });
            }
            res.send(mySongList)
        });


    }).on('error', (err) => {
        res.send(err);
    })
})


module.exports = router;