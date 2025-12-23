const axios = require("axios");

const API = process.env.LARAVEL_API;

async function getLatestArticle() {
  const response = await axios.get(`${API}/articles`);
  return response.data[0];
}

async function publishArticle(article) {
  return axios.post(`${API}/articles`, article);
}

module.exports = {
  getLatestArticle,
  publishArticle,
};
