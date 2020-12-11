const {
  GetBookByAsin,
  GetUserByUsername,
  GetPendingById,
  GetConfidentialPendingById,
  GetSearch,
  GetSearchRecent,
} = require('./apiReads');
const {
  AddBookToBookshelf,
  MoochNow,
} = require('./apiCreates');
const {
  RemoveBookFromBookshelf,
  MarkReject,
} = require('./apiDeletes');
const {
  RequestAskFirst,
  LoginUser,
  AcceptMooch,
  MarkSent,
  GiveFeedback,
} = require('./apiUpdates');

const resolvers = {
  Query: {
    getBookByAsin:              (_, { asin })                   => GetBookByAsin(asin),
    getUserByUsername:          (_, { username }, { token })    => GetUserByUsername(username, token),
    getPendingById:             (_, { pending_id })             => GetPendingById(pending_id),
    getConfidentialPendingById: (_, { pending_id }, { token })  => GetConfidentialPendingById(pending_id, token),
    getSearch:                  (_, { text })                   => GetSearch(text, 1),
    getSearchRecent:            ()                              => GetSearchRecent(),

    addBookToBookshelf:         (_, { asin }, { token })                  => AddBookToBookshelf(asin, token),
    removeBookFromBookshelf:    (_, { asin }, { token })                  => RemoveBookFromBookshelf(asin, token),
    requestAskFirst:            (_, { asin, giverid }, { token })         => RequestAskFirst(asin, giverid, token),
    acceptMooch:                (_, { requester, asin }, { token })       => AcceptMooch(requester, asin, token),
    moochNow:                   (_, { asin, giverid, selfAddress, selfCountry }, { token }) => MoochNow(asin, giverid, selfAddress, selfCountry, token),
    markSent:                   (_, { pendingID }, { token })             => MarkSent(pendingID, token),
    markReject:                 (_, { pendingID }, { token })             => MarkReject(pendingID, token),
    giveFeedback:               (_, { pendingID, score }, { token })      => GiveFeedback(pendingID, score, token),
    login:                      (_, { self, pw })                         => LoginUser(self, pw),
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
    usersWith:     (obj, _, { token }) => obj.userids ? obj.userids.map(username => GetUserByUsername(username, token)) : [],
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
    pending_give:      obj => obj.pending_give ? obj.pending_give.map( id => GetPendingById(id) ) : [],
    pending_receive:   obj => obj.pending_receive ? obj.pending_receive.map( id => GetPendingById(id) ) : [],
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
    giver:                (obj, _, { token }) => GetUserByUsername(obj.giver, token),
    receiverUsername:     obj => obj.receiver,
    receiver:             (obj, _, { token }) => GetUserByUsername(obj.receiver, token),
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
    user_from:        (obj, _, { token }) => GetUserByUsername(obj.userid_from, token),
    asin:             obj => obj.asin,
    book:             obj => GetBookByAsin(obj.asin),
    date_written:     obj => new Date(parseInt(obj.now.padEnd(13, '0'))),
    feedback_score:   obj => obj.feedback_score,
    feedback_comment: obj => obj.feedback_comment,
  }
};

module.exports = resolvers;