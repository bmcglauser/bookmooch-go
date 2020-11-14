import './chooseMooch.scss'
import Header from '../../components/Header';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import BackButton from '../../components/Buttons/BackButton';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import UserWithItem from '../../containers/UserWithItem';
import { gql, useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';

const falseSelf = {
  username: 'spectrome',
  display_name: 'Brett G',
  country: 'UK',
  points: '12'
};

export default function ChooseMoochPage (props) {
  const asin = props.match.params.asin
  const GET_MOOCH_CHOICE = gql`
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
  const { loading, error, data } = useQuery(GET_MOOCH_CHOICE);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }
  
  const book = data.getBookByAsin;
  
  const usersArr = book.usersWith.map( user => 
    <UserWithItem key={user.username} self={falseSelf} other={user} asin={asin}/>
  )

  return (
    <>
    <Header title="Get this book!" />
    <div className="choose-mooch-page-grand-wrapper">
      <div className="active-item-wrapper">
        <ActiveItem book={book} />
      </div>
      <div className="users-with-wrapper">
        {usersArr}
        <div className="extra-space" />
      </div>
      <div className="choose-mooch-footer">
        <BackButton ctx={props} />
        <UserHomeButton />
      </div>
    </div>
    </>
  );
};
