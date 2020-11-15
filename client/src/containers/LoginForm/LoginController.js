import React from 'react'
import { gql, useQuery } from '@apollo/client';

export default function LoginController (props) {
  const username = props.match.params.username
  const pw = props.match.params.pw
  const query = gql`
    query {
      login(self: "${username}", pw: "${pw}")
    }
  `;
  const { loading, error, data } = useQuery(query);
    if (loading) return <p>loading</p>
    if (error) return <p>{error.message}</p>;
    if (data && data.login === '1') {
      props.history.push(`/profile/${username}`);
    }


    return (<div> the page is here </div>);
}