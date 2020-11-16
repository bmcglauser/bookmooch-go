import { gql } from '@apollo/client';

const LOGIN = (username, pw) => gql`
    query {
      login(self: "${username}", pw: "${pw}")
    }
  `;
const ADD_BOOK = (asin) => 
  gql`
    query {
      addBookToBookshelf(asin:"${asin}")
    }
  `;
const REMOVE_BOOK = (asin) => 
  gql`
    query {
      removeBookFromBookshelf(asin:"${asin}")
    }
  `;
const MOOCH_NOW = (asin, giverid, selfAddress) => 
  gql`
    query {
      moochNow(asin:"${asin}", giverid:"${giverid}", selfAddress:"${selfAddress}")
    }
  `;
const GIVE_FEEDBACK = (pendingID, score) => 
  gql`
    query {
      giveFeedback(pendingID: "${pendingID}", score:"${score}")
    }
  `;
const MARK_SENT = (pendingID) => 
  gql`
    query {
      markSent(pendingID: "${pendingID}")
    }
  `;
const REJECT_MOOCH = (pendingID) => 
  gql`
    query {
      markReject(pendingID: "${pendingID}")
    }
  `;

const actionService = {
  LOGIN, 
  ADD_BOOK, 
  REMOVE_BOOK, 
  MOOCH_NOW, 
  GIVE_FEEDBACK, 
  MARK_SENT, 
  REJECT_MOOCH, 
};

export default actionService;