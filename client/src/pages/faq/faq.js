import React from 'react';
import Header from '../../components/Header';
import BackButton from '../../components/Buttons/BackButton';
import './faq.scss';

export default function FAQPage(props) {
  return (
    <>
    <Header title="Frequently Asked Questions" />
    <div className="faq-page-grand-wrapper">
      <div className="question-list">
        <div className="question-block">
          <h2 className="question-text">Are the books really free? What’s the catch?</h2>
          <p className="answer-text">The books really are free! There is never nor will there ever be a charge to use BookMooch. Users just like you are sending them, free of charge. The only catch is that when it’s your turn to send a book, it’s also your turn to pay the postage (which can vary from country to country). In the US, you should ask for Media Mail rate, which is usually under $3.00, regardless of the book’s size.</p>
        </div>
        <div className="question-block">
          <h2 className="question-text">Can you explain the points system more?</h2>
          <p className="answer-text">Sure. If you and the other user are in the same country, 1 point is exchanged between the two of you. You’ll earn 3 points for shipping a book to a different country, and likewise will have to spend 3 points for a book to be sent across international borders. Finally, adding books to your bookshelf alone can get you points! For each book you add to be given away, you’ll earn 1/10th of a point. These can add up, so be sure to register as many books as you want to get rid of. They have new homes waiting for them!</p>
        </div>
        <div className="question-block">
          <h2 className="question-text">What’s a feedback score? Does it matter?</h2>
          <p className="answer-text">When you mark a book you’ve asked for as received, you’re asked to rate how well the sender did. Timeliness and accuracy of the book’s condition notes are what you’re asked to consider. You can rate them Badly, which gives their feedback score -1, Fine, which does not change their feedback score, or Good, which gives their feedback score +1. You can look at a user’s feedback score to determine who you should mooch from when more than one user has the book you want.</p>
        </div>
        <div className="question-block">
          <h2 className="question-text">Who even thought of this?</h2>
          <p className="answer-text">BookMooch is conceived, designed, written and administered by John Buckman, who also runs the online record label Magnatune. This mobile adaptation is designed and developed by Brett Glauser for the sole purpose of accessibility to those wishing to use BookMooch from their mobile devices.</p>
        </div>
        <div className='blank' />
      </div>
      <div className="faq-page-footer">
        <BackButton ctx={props}/>
      </div>
    </div>
    </>
  );
}