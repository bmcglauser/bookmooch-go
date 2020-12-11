import React, { FunctionComponent } from 'react';
import './confirmAdd.scss';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import Header from '../../components/Header';
import ErrorPage from '../errorPage';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import queryService from '../../services/queryService';
import { Book } from '../../services/queryService/queryServiceInterfaces';

type TParams = {
  asin: string
}

interface Data {
  getBookByAsin: Book
}

const ConfirmAddPage: FunctionComponent<RouteComponentProps<TParams>> = props => {
  const asin = props.match.params.asin;
  const query = queryService.GET_SIMPLE_BOOK(asin);

  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <RandomCenterLoader />;
  if (error) return <ErrorPage message={error.message} ctx={props}/>;

  return (
    <>
    <Header title="Confirm your add" />
    <div className="confirm-add-page-grand-wrapper">
      <div className="top-block">
        <p className="top-text">You're adding the following<br />to your bookshelf, to give away:</p>
        {data && <ActiveItem book={data.getBookByAsin} />}
      </div>
      <p className="condition-prompt-text">You can also add notes on the condition of your copy, if you'd like</p>
      <form className="confirm-add-form">
        <textarea placeholder="Cover scuffed, light markings inside..."/>
        <Link to={`/controller/add/${asin}`} style={{textDecoration: "none"}}>
          <div className='button-wrapper'>
            <button className="confirm button">
              <div className="confirm-icon" />
              <p>Confirm add</p>
            </button>
          </div>
        </Link>
      </form>
      <div onClick={()=>props.history.goBack()} className='button-wrapper'>
        <button className="back button">
          <div className="back-icon" />
          <p>Go back</p>
        </button>
      </div>
      <div className="confirm-add-footer">
        <p>You'll get 1/10th of a point just for adding this book!</p>
      </div>
    </div>
    </>
  );
}

export default ConfirmAddPage;