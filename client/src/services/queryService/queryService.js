import { gql } from '@apollo/client';

const GET_BOOK_DETAILS = (asin) => gql`
  query {
    getBookByAsin (asin: "${asin}") {
      asin
      title
      author
      cover_art_url
      availCount
      summary
      usernamesWith
    }
  }
  `;

const GET_BOOKSHELF = (username) => gql`
  query {
    getUserByUsername (username: "${username}") {
      username
      listings {
        asin
        book {
          title
          author
        }
        listed_on
      }
    }
  }
  `;

const GET_MOOCH_CHOICE = (asin) => gql`
  query {
    getBookByAsin (asin: "${asin}") {
      asin
      title
      author
      cover_art_url
      summary
      usersWith {
        username
        display_name
        country
        feedback_score
        willsend
        listings(asin: "${asin}") {
          asin
          listed_on
          condition
        }
      }
    }
  }
`;

const GET_SIMPLE_BOOK = (asin) => gql`
  query {
    getBookByAsin (asin: "${asin}") {
      asin
      title
      author
      cover_art_url
    }
  }
  `;

  const GET_CONFIRM_MOOCH = (username, asin) => gql`
    query {
      getUserByUsername (username: "${username}") {
        username
        display_name
        country
        willsend
        listings(asin: "${asin}") {
          asin
          listed_on
          condition
        }
      },
      getBookByAsin(asin: "${asin}") {
        asin
        title
        author
      }
    }
  `;

  const GET_TRANSACTION = (id) => gql`
  query {
    getPendingById (pending_id: "${id}") {
      transaction_name
      asin
      book {
        title
        author
        cover_art_url
      }
      giverUsername      
    }
  }
`;

const GET_CONF_PENDING_RECEIVE = (id) => gql`
  query {
    getConfidentialPendingById (pending_id: "${id}") {
      transaction_name
      asin
      book {
        title
        author
      }
      giverUsername
      points_to_giver
      points_from_receiver
      created_on
      sent_on
      condition
      status
    }
  }
  `;

  const GET_CONF_PENDING_GIVE = (id) => gql`
  query {
    getConfidentialPendingById (pending_id: "${id}") {
      transaction_name
      asin
      book {
        title
        author
      }
      receiver_address
      points_to_giver
      points_from_receiver
      created_on
      sent_on
      condition
      status
    }
  }
  `;

  const GET_ALL_PENDING = (username) => gql`
    query {
      getUserByUsername (username: "${username}") {
        username
        pending_give {
          transaction_name
          asin
          book {
            title
            author
          }
          status
          receiverUsername
          created_on
        }
        pending_receive {
          transaction_name
          asin
          book {
            title
            author
          }
          status
          giverUsername
          created_on
        }
      }
    }
  `;

  const GET_RECENT = () => gql`
      query {
        getSearchRecent {
          asin
          title
          author
          cover_art_url
          usernamesWith
          availCount
          summary
        }
      }
    `

    const GET_SEARCH = (string) => gql`
    query {
      getSearch (text: "${string}") {
        asin
        title
        author
        cover_art_url
        usernamesWith
        availCount
        summary
      }
    }
  `;

  const GET_USER = (username) => gql`
  query {
    getUserByUsername (username: "${username}") {
      display_name
      username
      points
      listingCount
      feedback_score
    }
  }
`;

const queryService = {
  GET_BOOK_DETAILS,
  GET_BOOKSHELF,
  GET_MOOCH_CHOICE,
  GET_SIMPLE_BOOK,
  GET_CONFIRM_MOOCH,
  GET_TRANSACTION,
  GET_CONF_PENDING_RECEIVE,
  GET_CONF_PENDING_GIVE,
  GET_ALL_PENDING,
  GET_RECENT,
  GET_SEARCH,
  GET_USER,
  
};

export default queryService;