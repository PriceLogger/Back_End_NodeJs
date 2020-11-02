const http = require('https');

const fetchItem = (url, tag) => {
  url = extractUrl(url);

  const options = {
    host: url.hostname,
    port: 443,
    path: url.path
  };

  return new Promise((resolve) => {
    http.get(options, (res) => {
      res.setEncoding("utf8");
      let body;
      res.on("data", (chunk) => {
        body += chunk;
      })
      res.on("end", () => {
        resolve({...extractInformation(body, tag), provider: url.hostname});
      })
    });
  })
}

const extractInformation = (data, tag) => {
  let get = (tag) => {
    let start = data.indexOf(tag) + tag.length;
    while (start < data.length && data.charAt(start) !== '>') {
      start++;
    }

    let end = start + 1;
    while (end < data.length && data.charAt(end) !== '<') {
      end++;
    }

    return data.substring(start + 1, end);
  }

  let name = get(tag.nameTag)
  let price = get(tag.priceTag).replace(/([^\d.,])/gi, ""); //keep only number , comma and dot

  return {name: name, price: price};
}

const extractUrl = (url) => {
  let hostname;
  let path;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove "?"
  hostname = hostname.split('?')[0];

  path = url.substring(url.indexOf(hostname) + hostname.length, url.length);

  return {hostname: hostname, path: path};
}

module.exports = {fetchItem, extractUrl}