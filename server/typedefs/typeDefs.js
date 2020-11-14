const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    getBookByAsin(asin: String!): Book,
    getUserByUsername(username: String!, self: String, pw: String): User,
    getPendingById(pending_id: String!): Mooch,
    getConfidentialPendingById(pending_id: String!): Mooch,
    getSearch(text: String!, pageNum: Int): [Book],
    getSearchRecent: [Book],

    addBookToBookshelf      (asin: String!, self: String, pw: String): String,
    removeBookFromBookshelf (asin: String!, self: String, pw: String): String,
    requestAskFirst         (asin: String!, giverid: String!, self: String, pw: String): String,
    acceptMooch             (requester: String!, asin: String!, self: String, pw: String) : String,
    moochNow                (asin: String!, giverid: String!, selfAddress: String!, selfCountry: String, self: String, pw: String) : String,
    markSent                (pendingID: String!, self: String, pw: String) : String,
    markReject              (pendingID: String!, self: String, pw: String) : String,
    giveFeedback            (pendingID: String!, score: String!, self: String, pw: String) : String,
  }

  type Book {
    asin: String,
    title: String,
    author: String,
    cover_art_url: String,
    topics: [String],
    publisher: String,
    usernamesWith: [String],
    availCount: String,
    usersWith: [User],
    summary: String
  }

  type User {
    username: String!,
    display_name: String!,
    country: String,
    bio: String,
    joined: String,
    last_seen: String,
    status_message: String,
    postal_address: String,
    zip_code: String,
    points: String,
    feedback_received(first: Int, after: Int): [Feedback],
    feedback_score: String,
    willsend: String,
    listingCount: Int,
    listings(asin: String): [Listing],
    history_given(first: Int, after: Int): [Mooch],
    history_received(first: Int, after: Int): [Mooch],
    pending_give: [Mooch],
    pending_receive: [Mooch],
  }

  type Listing {
    asin: String!,
    book: Book,
    listed_on: String!,
    condition: String
  }

  type Mooch {
    transaction_name: String!,
    asin: String!,
    book: Book,
    status: String!,
    giverUsername: String!,
    giver: User,
    receiverUsername: String!,
    receiver: User,
    receiver_address: String,
    points_to_giver: String!,
    points_from_receiver: String!,
    created_on: String!,
    sent_on: String,
    closed_on: String,
    condition: String,
    receiver_comments: String,
  }

  type Feedback {
    username_from: String!
    user_from: User,
    asin: String!,
    book: Book,
    date_written: String!,
    feedback_score: String!,
    feedback_comment: String,
  }
`;