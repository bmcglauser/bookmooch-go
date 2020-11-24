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
    const token = jwt.sign({ self, pw },process.env.JWT_SECRET)
    return { token }
  })
    .catch(e => e.message);
};
exports.AddBookToBookshelf = async (asin, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)
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
exports.RemoveBookFromBookshelf = async (asin, token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)
  
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
exports.MoochNow = async (asin, giverid, selfAddress, selfCountry = 'US', token) => {
  const { self, pw } = await jwt.verify(token, process.env.JWT_SECRET)
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
exports.MarkReject = async (pendingID, token) => {
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