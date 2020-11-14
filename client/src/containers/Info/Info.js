import React from 'react';
import './Info.scss';
import LoaderA from '../../components/Loaders/LoaderA';
// import LoaderB from '../../components/Loaders/LoaderB';
// import LoaderC from '../../components/Loaders/LoaderC';
// import LoaderD from '../../components/Loaders/LoaderD';
import { gql, useQuery } from '@apollo/client';

const TEST = gql`
  query {
    getUserByUsername (username: "spectrome") {
      username
      feedback_received (first: 10) {
        book {
          title
        }
        username_from
      }
    }
  }
`;

function Info() {

  const { loading, error, data } = useQuery(TEST);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }
  
  const gifts = data.getUserByUsername.feedback_received.map((piece, i) => 
    <div className="item" key={`feedback${i}`}>
      <h2>{piece.book.title}</h2>
      <h4>from {piece.username_from}</h4>
    </div>
  );

  return (
    <div className="fullList">
      {gifts}
    </div>
  );
}

export default Info;
