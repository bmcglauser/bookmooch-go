const axios = require('axios').default;
const qs = require('qs');
require('dotenv').config();


const AUTH = {
  user: process.env.USERNAMEA,
  pw: process.env.PWA
};

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
exports.GetUserByUsername = (username, self = AUTH.user, pw = AUTH.pw) => {
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
exports.GetConfidentialPendingById = (id, self=AUTH.user, pw=AUTH.pw) => {
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
exports.LoginUser = (self = AUTH.user, pw = AUTH.pw) => {
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
  }).then(res => res.data.success)
    .catch(e => e.message);
};
exports.AddBookToBookshelf = (asin, self = AUTH.user, pw = AUTH.pw) => {
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
exports.RemoveBookFromBookshelf = (asin, self = AUTH.user, pw = AUTH.pw) => {
  return axios ({
    method: 'post',
    url: 'http://bookmooch.com/api/userbook',
    headers: {
      'mode': 'no-cors',
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      asin: `${asin}`,
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
exports.RequestAskFirst = (asin, giverid, self = AUTH.user, pw = AUTH.pw) => {
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
exports.MoochNow = (asin, giverid, selfAddress, selfCountry = 'US', self = AUTH.user, pw = AUTH.pw) => {
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
exports.GiveFeedback = (pendingID, score, comment = '', self = AUTH.user, pw = AUTH.pw) => {
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
  }).then(res => res.data[0])
    .catch(e => e.message);
};
// Allows for newStatus = 'sent', 'reject', 'received'
exports.MarkSent = (pendingID, self = AUTH.user, pw = AUTH.pw) => {
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
exports.MarkReject = (pendingID, self = AUTH.user, pw = AUTH.pw) => {
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

exports.AcceptMooch = (requester, asin, self = AUTH.user, pw = AUTH.pw) => {
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