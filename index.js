

var request = require('request');
var argv = require('yargs').argv;

// var query = 'physics';
var query = argv.q || 'english';
var searchurl = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`;
var contentUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=`;


request(searchurl, function (err, response, body){
    if (err) {
        var error = "cannot connect to the server";
        console.log(error);
    } else {
        var data = JSON.parse(body);
        let len = data[1].length;
        let index = Math.floor(Math.random(len));
        let title = data[1][index];
        title = title.replace(/\s+/g, '_');
        let url = contentUrl + title;
        // let response = fetch(url);
        request(url, function(err, response, body){
            var cont = JSON.parse(body);
            let page = cont['query']['pages'];
            let pageId = Object.keys(page)[0];
            let content = page[pageId]['revisions'][0]['*'];
            let wordRegex = /\b\w{4,}\b/g;
            var words = content.match(wordRegex);
            var word = Math.random(words);
            // let pageId = Object.values(cont);
            console.log(content);
        });
        // for (var i = 0; i < wiki[1].length; i++) {
        //     var data = `You searched for ${wiki[1][i]}: And these are the details — ${wiki[2][i]} Follow this link to read more — ${wiki[3][i]}` + "\n";
        //     console.log(data);
        // }
    }});