const Controller = require('./controller');
const http = require('https');
const { hostname } = require('os');

class ItemController extends Controller {

    constructor() {
        super('Item');
    }

    create = (req, res, next) => {
        let item = this.getInfo(req.body.item.url);
        res.send(item);
        /* req.body.item = item;
        this.create(req, res, next); */
    }

    getInfo = (url) => {
        let hostname = this.extractHostname(url);
        let path = this.extractPath(url, hostname);
        var options = {
            host: hostname,
            port: 443,
            path: path
        };
        var req = http.get(options, function (res) {
            res.on("data", function(chunk) {
                console.log("BODY: " + chunk);
              });
        });
        
        return (
            {
                hostname: hostname,
                path: path,
            }
        );
    }

    extractHostname = (url) => {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    extractPath = (url, hostname) => {
        var path;
        //find & remove protocol (http, ftp, etc.) and get hostname
        path = url.substring(url.indexOf(hostname) + hostname.length, url.length);
        return path;
    }

}

module.exports = ItemController;