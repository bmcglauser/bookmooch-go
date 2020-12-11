import { gql, DocumentNode } from '@apollo/client';

const LOGIN = (username: string, pw: string): DocumentNode => gql`
    query {
      login(self: "${username}", pw: "${pw}") {
        token
      }
    }
  `;
const ADD_BOOK = (asin: string): DocumentNode =>
  gql`
    query {
      addBookToBookshelf(asin:"${asin}")
    }
  `;
const REMOVE_BOOK = (asin: string): DocumentNode =>
  gql`
    query {
      removeBookFromBookshelf(asin:"${asin}")
    }
  `;
const MOOCH_NOW = (asin: string, giverid: string, selfAddress: string): DocumentNode =>
  gql`
    query {
      moochNow(asin:"${asin}", giverid:"${giverid}", selfAddress:"${selfAddress}")
    }
  `;
const GIVE_FEEDBACK = (pendingID: string, score: string): DocumentNode =>
  gql`
    query {
      giveFeedback(pendingID: "${pendingID}", score:"${score}")
    }
  `;
const MARK_SENT = (pendingID: string): DocumentNode =>
  gql`
    query {
      markSent(pendingID: "${pendingID}")
    }
  `;
const REJECT_MOOCH = (pendingID: string): DocumentNode =>
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