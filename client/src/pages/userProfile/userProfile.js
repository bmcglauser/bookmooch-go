import { Link } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import './userProfile.scss';
import Header from "../../components/Header";
import ProfileInfo from '../../containers/ProfileInfo';
import LoaderA from '../../components/Loaders/LoaderA';


export default function UserProfilePage () {
  const username = "spectrome";
  const GET_USER = gql`
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
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  return (
    <>
    <Header title="Your profile" />
    <div className="profile-grand-wrapper">
      <div className="profile-info-wrapper">
        <ProfileInfo user={data.getUserByUsername}/>
      </div>
      <div className="profileButtons">
        <div className="buttonColLeft">
          <div className="findButtonWrapper">
            <Link to="/search">
              <button className="find lateral-button">
                <div className="white-find-icon" />
              </button>
            </Link>
          </div>
          <p>Find a Book</p>
        </div>
        <div className="buttonColCenter">
          <div className="centerButtons">
            <div className="pendingButtonWrapper">
              <Link to="/pending/spectrome">
                <button className="pending center-button">
                  <div className="white-pending-icon" />
                </button>
              </Link>
              <p>See pending Mooches</p>
            </div>
            <div className="faqButtonWrapper">
              <Link to="/faq">
                <button className="faq center-button">
                  <div className="white-faq-icon" />
                </button>
              </Link>
              <p>See F.A.Q.s</p>
            </div>
          </div>
        </div>
        <div className="buttonColRight">
          <div className="addButtonWrapper">
            <Link to="/findadd">
              <button className="add lateral-button">
                <div className="horizontal-bar"></div>
                <div className="vertical-bar"></div>
              </button>
            </Link>
          </div>
          <p>Add a Book</p>
        </div>
      </div>
      <div className="bottomLogoutWrapper">
        <p className="bottomLogoutLink">Not your profile? All done? Log out <Link to="/">here</Link></p>
      </div>
    </div>
    </>
  )
};
