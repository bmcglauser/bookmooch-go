import React, { FunctionComponent } from 'react';
import './Footer.scss';
import buttons from '../FooterButtons';
import { RouteComponentProps } from 'react-router-dom';

function whichButton(
  inputStr?: string,
  props?: RouteComponentProps
): JSX.Element {
  if (inputStr === 'back' && props) {
    return <buttons.BackButton ctx={props} />;
  }
  switch (inputStr) {
    case 'circleAdd':
      return <buttons.CircleAddButton />;
    case 'search':
      return <buttons.SearchButton />;
    case 'userHome':
      return <buttons.UserHomeButton />;
    default:
      return <div />;
  }
}

type FooterProps = {
  leftBut?: string;
  centerBut?: string;
  rightBut?: string;
  ctx?: RouteComponentProps;
};

const Footer: FunctionComponent<FooterProps> = (props) => {
  return (
    <div className="footer-grand-wrapper">
      <div className="small-button">
        {whichButton(props.leftBut, props.ctx)}
      </div>
      {whichButton(props.centerBut, props.ctx)}
      <div className="small-button">
        {whichButton(props.rightBut, props.ctx)}
      </div>
    </div>
  );
};

export default Footer;
