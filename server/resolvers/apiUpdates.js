// @ts-nocheck
const axios = require('axios').default;
const qs = require('qs');
const jwt = require('jsonwebtoken');

exports.LoginUser = (self, pw) => {
  return axios ({
    method: 'post',
    url: 'http://bookmooch.com/api/login',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => {
    if (res.data.success !== '1') throw new Error();
    const token = jwt.sign({ self, pw },process.env.JWT_SECRET);
    return { token }
  })
    .catch(e => e.message);
};


exports.RequestAskFirst = async (asin, giverid, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)

  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/askfirst',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      asin: `${asin}`,
      giverid: `${giverid}`,
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data)
    .catch(e => e.message);
};

exports.GiveFeedback = async (pendingID, score, comment = '', token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)

  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/pending_action',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      id: `${pendingID}`,
      action: 'received',
      comment: `${comment}`,
      param1: `${score}`,
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data.result_text)
    .catch(e => e.message);
};
exports.MarkSent = async (pendingID, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)

  return axios({
    method: 'post',
    url: 'http://bookmooch.com/api/pending_action',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      id: `${pendingID}`,
      action: 'sent',
      o: 'json'
    }),
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data.result_text)
    .catch(e => e.message);
};

exports.AcceptMooch = async (requester, asin, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)

  return axios({
    method: 'get',
    url: `http://bookmooch.com/m/askme_yes?userid=${requester}&asin=${asin}`,
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: `${self}`,
      password: `${pw}`
    },
  }).then(res => res.data)
    .catch(e => e.message);
};