import { Link } from 'react-router-dom';
import './learnMore.scss';
import Header from '../../components/Header';

export default function LearnMorePage (props) {
  return (
    <>
    <Header title="BookMooch is:" />
    <div className="learn-more-page-wrapper">
      <div className="learn-more-top-block">
        <div className="left-text">
          <h4>So big!</h4>
          <h4>So free.</h4>
          <h4>So easy.</h4>
        </div>
        <div className="right-text">
          <p>Join over <b>300,000 members</b><br />already on BookMooch.com</p>
          <p>You'll never pay to join<br />or to get books.</p>
          <p>Give away books you have.<br />Get books you want.</p>
        </div>
      </div>
      <div className="learn-more-bottom-block">
        <div className="bottom-block-text">
          <h2>BookMooch Go</h2>
          <p>
            is the first mobile-friendly way to join this <i>worldwide</i> bookswapping community
          </p>
        </div>
        <div className="buttons-wrapper">
          <Link className="button-link" to='/join' style={{textDecoration:'none'}}>
            <button className="wide-button">
              <p>
                Sign up
              </p>
            </button>
          </Link>
          <Link className="button-link" to='/search' style={{textDecoration:'none'}}>
            <button className="wide-button">
              <p>
                Find a Book
              </p>
            </button>
          </Link>
        </div>
        <div className="bottom-faq-text">
          <p>Not sure yet? read some of our</p>
          <Link to="/faq">
            <h4>Frequently Asked Questions</h4>
          </Link>
        </div>
      </div>
      <div className="learn-more-footer">
        <p>
          Already have an account? Log in <Link to='/login'>here</Link>
        </p>
      </div>
    </div>
    </>
  );
};
