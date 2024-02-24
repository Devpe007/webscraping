const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Carrega o conteúdo HTML de um arquivo
const htmlPath = path.join(__dirname, 'views', 'index.html');

// Carrega o conteúdo HTML do arquivo
const html = fs.readFileSync(htmlPath, 'utf-8');

const $ = cheerio.load(html);

$('h1').each((index, element) => {
  console.log($(element).text());
});

const app = express();

app.use(cors())

const fetchData = async(url) => {
  const result = await axios.get(url);

  return result.data;
};

app.get('/villagers' , async (request, response) => {
  const content = await fetchData("https://stardewvalleywiki.com/Villagers");
  const $ = cheerio.load(content);

  let villagers = [];

  $('li.gallerybox').each((index, element) => {
    const title = $(element).find('.gallerytext > p > a').text();
    const avatar = `https://stardewvalleywiki.com${$(element).find('.thumb > div > a > img').attr("src")}`
    const link = `https://stardewvalleywiki.com${$(element).find('.gallerytext > p > a').attr("href")}`;

    const data = {
      title,
      avatar,
      link,
    }

    villagers.push(data);
  });

  return response.json(villagers);
})

app.get('/animals', async (request, response) => {
  const content = await fetchData("https://stardewvalleywiki.com/Animals");
  const $ = cheerio.load(content);

  let animals = [];

  $('table.wikitable.roundedborder > tbody > tr').each((index, element) => {
    const image = `https://stardewvalleywiki.com${$(element).find('td > a > img').attr('src')}`;
    const name = $(element).find('td > a').text();
    const link = `https://stardewvalleywiki.com${$(element).find('td > a').attr('href')}`;

    const data = {
      image,
      name,
      link
    };

    animals.push(data);
  })
  
  return response.json(animals);
})

app.listen(3333, () => console.log('Server is running on port 3333'))