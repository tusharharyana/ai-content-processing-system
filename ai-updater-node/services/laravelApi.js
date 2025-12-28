const axios = require("axios");

const API = process.env.LARAVEL_API;

async function getLatestArticle() {
  const response = await axios.get(`${API}/articles`);
  return response.data[0];
}

async function getOldestUnupdatedArticle() {
  const response = await axios.get(`${API}/articles/oldest-unupdated`);
  return response.data;
}

async function publishArticle(article) {
  return axios.post(`${API}/articles`, article);
}

async function updateArticle(id, article) {
  return axios.put(`${API}/articles/${id}`, article);
}

module.exports = {
  getLatestArticle,
  getOldestUnupdatedArticle,
  publishArticle,
  updateArticle,
};
