// @ts-nocheck
const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.GetBookByAsin = (asin) => {
  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/asin',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      asins: `${asin}`,
      o: 'json',
    })
  }).then((res) => res.data[0])
    .catch((e) => e.message);
};
exports.GetUserByUsername = async (username, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)
  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/userid',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      userids: `${username}`,
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data[0])
    .catch(e => e.message);
};
exports.GetPendingById = (id) => {
  return axios({
    method: 'post',
    url: 'http://api.bookmooch.com/api/pending',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      ids: `${id}`,
      o: 'json'
    })
  }).then(res => res.data[0])
    .catch(e => e.message);
};
exports.GetConfidentialPendingById = async (id, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)
  return axios({
    method: 'post',
    url: 'http://api.bookmooch.com/api/pending_confidential',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      ids: `${id}`,
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data[0])
    .catch(e => e.message);
};
exports.GetSearch = (text, pageNum) => {
  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/search',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      txt: `${text}`,
      db: 'bm',
      page: `${pageNum}`,
      o: 'json'
    }),
  }).then(res => res.data)
    .catch(e => e.message);
};
exports.GetSearchRecent = () => {
  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/recent',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      o: 'json',
    })
  }).then(res => res.data)
    .catch((e) => e.message);
};