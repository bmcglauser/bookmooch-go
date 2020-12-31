// @ts-nocheck
const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'a';


exports.RemoveBookFromBookshelf = async (asin, token) => {
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
      action: 'del',
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data[0])
    .catch(e => e.message);
};

exports.MarkReject = async (pendingID, token) => {
  const { self, pw } = await jwt.verify(token, SECRET)

  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/pending_action',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      id: `${pendingID}`,
      action: 'reject',
      comment: 'sorry',
      param1: 'l',
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data.result_text)
    .catch(e => e.message);
};