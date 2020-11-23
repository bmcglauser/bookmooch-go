import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import BookDetailsPage   from './pages/bookDetails';
import BookshelfPage     from './pages/bookshelf';
import LandingPage       from './pages/landing';
import LoginPage         from './pages/login';
import UserProfilePage   from './pages/userProfile';
import SearchPage        from './pages/search';
import JoinPage          from './pages/join';
import LearnMorePage     from './pages/learnMore';
import FAQPage           from './pages/faq';
import FindAddPage       from './pages/findAdd';
import SearchResultsPage from './pages/searchResults';
import ChooseMoochPage   from './pages/chooseMooch';
import PendingPage       from './pages/pending';
import MoochSendPage     from './pages/moochSend';
import MoochReceivePage  from './pages/moochReceive';
import FeedbackPage      from './pages/feedback';
import ConfirmAddPage    from './pages/confirmAdd';
import ConfirmMoochPage  from './pages/confirmMooch';
import ErrorPage         from './pages/errorPage';
import ActionControllerPage    from './pages/actionController';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

function App(): JSX.Element {
    return (
    <ApolloProvider client={apolloClient}>
      <Router>        
        <div className="route">
          <Switch>
            <Route path="/" exact                          component={LandingPage} />
            <Route path="/landing"                        component={LandingPage} />
            <Route path="/login"                          component={LoginPage} />
            <Route path="/profile/:username?"             component={UserProfilePage} />
            <Route path="/bookshelf/:username?"            component={BookshelfPage} />
            <Route path="/pending/:username?"              component={PendingPage} />
            <Route path="/search"                         component={SearchPage} />
            <Route path="/details/:asin?"                 component={BookDetailsPage} />
            <Route path="/confirmadd/:asin"               component={ConfirmAddPage} />
            <Route path="/join"                           component={JoinPage} />
            <Route path="/about"                          component={LearnMorePage} />
            <Route path="/faq"                            component={FAQPage} />
            <Route path="/findadd"                        component={FindAddPage} />
            <Route path="/searchresults/:string?/:toadd?" component={SearchResultsPage} />
            <Route path="/choose/:asin?"                  component={ChooseMoochPage} />
            <Route path="/confirmmooch/:user/:asin"       component={ConfirmMoochPage} />
            <Route path="/sending/:user/:number"          component={MoochSendPage} />
            <Route path="/receiving/:user/:number"        component={MoochReceivePage} />
            <Route path="/feedback/:user/:number"         component={FeedbackPage} />
            <Route path="/controller/:action/:itemid?/:username?/:pw?/:score?/:giverid?/:textBlock?" component={ActionControllerPage} />
            <Route component={ErrorPage} />
          </Switch>
        </div>
        <div className="backdrop"> 
          <div className="cream" />
          <div className="green" />
        </div>
      </Router>
    </ApolloProvider>);
}

export default App;
