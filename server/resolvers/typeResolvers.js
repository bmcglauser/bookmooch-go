const {
  GetBookByAsin,
  GetUserByUsername,
  GetPendingById,
  GetConfidentialPendingById,
  GetSearch,
  GetSearchRecent
} = require('./apiFunctions');

exports.resolvers = {
  Query: {
    getBookByAsin:              (_, { asin }) => GetBookByAsin(asin),
    getUserByUsername:          (_, { username, self, pw }) => GetUserByUsername(username, self, pw),
    getPendingById:             (_, { pending_id }) => GetPendingById(pending_id),
    getConfidentialPendingById: (_, { pending_id }) => GetConfidentialPendingById(pending_id),
    getSearch:                  (_, { text }) => GetSearch(text, 1),
    getSearchRecent:            () => GetSearchRecent(),
  },
  Book: { 
    asin:          obj => obj.id,
    title:         obj => obj.Title,
    author:        obj => obj.Author,
    cover_art_url: obj => obj.LargeImage_URL,
    topics:        obj => obj.Topics,
    publisher:     obj => obj.Publisher,
    usernamesWith: obj => obj.userids || [],
    availCount:    obj => obj.userids ? obj.userids.length.toString() : '0',
    usersWith:     obj => obj.userids ? obj.userids.map(username => GetUserByUsername(username)) : [],
    summary:       function (obj) {
                      let str = "";
                      if (obj.comments) {
                        obj.comments.forEach(comment => {
                          if (comment.comment.length > 400) {
                            str = comment.comment;
                          }
                        })
                      }
                      return str;
                    }
  },

  User: {
    username:          obj => obj.id,
    display_name:      obj => obj.displayname,
    country:           obj => obj.country,
    status_message:    obj => obj.statusmsg,
    postal_address:    obj => obj.postal,
    zip_code:          obj => obj.zip,
    joined:            obj => new Date(parseInt(obj.now.padEnd(13, '0'))),
    last_seen:         obj => new Date(parseInt(obj.lastnow.padEnd(13, '0'))),
    bio:               obj => obj.bio,
    points:            obj => obj.points,
    feedback_received: (obj, { first = obj.feedback.length || 0, after = 0 }) => 
            obj.feedback ?
              obj.feedback
                .slice(after, first + after)
              : [],
    feedback_score:    obj => obj.feedback_score,
    willsend:          obj => obj.willsend,
    listingCount:      obj => obj.asins_listed ?  obj.asins_listed.length : 0,
    listings:         function (obj, {asin}) {
                        if (obj.asins_listed)
                          if (asin) {
                            for (let key in obj.asins_listed) {
                              if (obj.asins_listed[key].id === asin) { return [obj.asins_listed[key]]; }
                            }
                          }
                          else { return obj.asins_listed; }
                        else { return []; }
                      },
    history_given:    (obj, { first = obj.history_given.length || 0, after = 0 }) => 
            obj.history_given ?
              obj.history_given
                .slice(after, first + after)
              : [],
    history_received:  (obj, { first = obj.history_received.length || 0, after = 0 }) => 
            obj.history_received ?
              obj.history_received
                .slice(after, first + after)
              : [],
    pending_give:      obj => obj.pending_give.map( id => GetPendingById(id) ),
    pending_receive:   obj => obj.pending_receive.map( id => GetPendingById(id) ),
  },

  Listing: {
    asin:      obj => obj.id,
    book:      obj => GetBookByAsin(obj.id),
    listed_on: obj => new Date(parseInt(obj.now.padEnd(13, '0'))),
    condition: obj => obj.condition ? obj.condition : "",
  },
  
  Mooch: {
    transaction_name:     obj => obj.id,
    asin:                 obj => obj.asin,
    book:                 obj => GetBookByAsin(obj.asin),
    status:               obj => obj.status,
    giverUsername:        obj => obj.giver,
    giver:                obj => GetUserByUsername(obj.giver),
    receiverUsername:     obj => obj.receiver,
    receiver:             obj => GetUserByUsername(obj.receiver),
    receiver_address:     obj => obj.receiver_address,
    points_to_giver:      obj => obj.points_to_giver,
    points_from_receiver: obj => obj.points_from_receiver,
    created_on:           obj => new Date(parseInt(obj.now.padEnd(13, '0'))),
    closed_on:            obj => obj.closedate ? new Date(parseInt(obj.closedate.padEnd(13, '0'))) : null,
    sent_on:              obj => obj.date_sent ? new Date(parseInt(obj.date_sent.padEnd(13, '0'))) : null,
    condition:            obj => obj.condition,
    receiver_comments:    obj => obj.recevier_comments,
  },

  Feedback: {
    username_from:    obj => obj.userid_from,
    user_from:        obj => GetUserByUsername(obj.userid_from),
    asin:             obj => obj.asin,
    book:             obj => GetBookByAsin(obj.asin),
    date_written:     obj => new Date(parseInt(obj.now.padEnd(13, '0'))),
    feedback_score:   obj => obj.feedback_score,
    feedback_comment: obj => obj.feedback_comment,
  }
};