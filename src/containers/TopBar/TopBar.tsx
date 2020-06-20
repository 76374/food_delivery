import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import AppPath from '../../const/AppPath';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import AuthControls from './AuthControls';

const getLink = (link: string, text: string) => (
  <Nav.Link as={Link} to={link} eventKey={link} key={`#navBarItem${link}`}>
    {text}
  </Nav.Link>
);

const TopBar = () => {
  const location = useLocation();

  return (
    <Navbar expand="sm">
      <Nav className="mr-auto" activeKey={location.pathname}>
        {getLink(AppPath.ORDER, Locale.get(LocaleKey.TOP_BAR_BT_ORDER))}
        {getLink(AppPath.CHECKOUT, Locale.get(LocaleKey.TOP_BAR_BT_CHECKOUT))}
      </Nav>
      <AuthControls/>
    </Navbar>
  );
};

export default observer(TopBar);
