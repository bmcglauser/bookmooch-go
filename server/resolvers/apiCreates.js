// @ts-nocheck
const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'a';

exports.AddBookToBookshelf = async (asin, token) => {
  const { self, pw } = await jwt.verify(token, SECRET)
  return axios ({
    method: 'post',
    url: 'http://bookmooch.com/api/userbook',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      asins: `${asin}`,
      target: 'inventory',
      action: 'add',
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data[0])
    .catch(e => e.message);
};

exports.MoochNow = async (asin, giverid, selfAddress, selfCountry = 'US', token) => {
  const { self, pw } = await jwt.verify(token, SECRET)
  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/mooch',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      asin: `${asin}`,
      giverid: `${giverid}`,
      address: `${selfAddress}`,
      country: `${selfCountry}`,
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data.result_text)
    .catch(e => e.message);
};

// currently missing appkey param
exports.Join = () => {            // takes (dataObj) input
  //   return axios({
  //     method: 'post',
  //     url: 'http://bookmooch.com/api/join',
  //     headers: {
  //       'mode': 'no-cors',
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     data: qs.stringify({
  //       username: `${dataObj.username}`,
  //       displayname: `${dataObj.displayname}`,
  //       email: `${dataObj.email}`,
  //       pw: `${dataObj.pw}`,
  //       country: `${dataObj.country}`,
  //       postal: `${dataObj.postal}`,
  //       zip: `${dataObj.zip}`,
  //       secret_question: `${dataObj.secret_question}`,
  //       secret_answer: `${dataObj.secret_answer}`,
  //       appkey:  `DO NOT HAVE YET`,
  //       o: 'json'
  //     }),
  //   }).then(res => res.data[0])
  //     .catch(e => e.message);
  };