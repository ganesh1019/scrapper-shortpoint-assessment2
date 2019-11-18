
const axios = require("axios");
const cheerio = require("cheerio");

const url = 'https://demos.shortpoint.com/Pages/Home.aspx';
const baseUrl = 'https://demos.shortpoint.com';


async function getAllLinks(url) {
  try {
    let result = await axios.get(url);
    $ = cheerio.load(result.data);
    links = [];
    $("#DeltaTopNavigation a").each((i, link) => {
      links.push(link.attribs.href);
    });
    return links;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function crawlPage() {
  let list = await getAllLinks(url);

  for (let link of list) {
      let linkurl;
    try {
      let resp = {};
        linkurl = baseUrl + link;
        console.log('url: ' + linkurl);
        resp = await axios.get(baseUrl + link);
      console.log(
        "Valid Url: " +
        linkurl +
          " returned status: " +
          resp.status
      );
    } catch (err) {
      console.log("Not a valid URL: " + linkurl);
    }
  }
}

crawlPage();