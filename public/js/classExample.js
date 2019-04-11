const cheerio = require("cheerio");
const axios = require("axios");

axios.get("https://old.reddit.com/r/webdev/").then(function(response)) {
  // console.log(response)
  const $ = cheerio.load(response.data);
  const results = [];

  $("p.title").each(function(i, el) => {
    const title = $(el).text();
    const link = $(el).children().attr("href");
    results.push({
      title: title,
      link: link
    });
  });

}
