import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import AppPath from '../../const/AppPath';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import useStore from '../../hooks/useStore';

const getLink = (link: string, text: string) => (
  <Nav.Link as={Link} to={link} eventKey={link} key={`#navBarItem${link}`}>
    {text}
  </Nav.Link>
);

const TopBar = () => {
  const { user } = useStore();
  const location = useLocation();

  const signControls = user.isSignedIn
    ? getLink(AppPath.LOGOUT, Locale.get(LocaleKey.TOP_BAR_BT_LOGOUT, String(user.firstName)))
    : [
        getLink(AppPath.SIGN_IN, Locale.get(LocaleKey.TOP_BAR_BT_SIGN_IN)),
        getLink(AppPath.SIGN_UP, Locale.get(LocaleKey.TOP_BAR_BT_SIGN_UP)),
      ];

  return (
    <Navbar expand="sm">
      <Nav activeKey={location.pathname}>
        {getLink(AppPath.ORDER, Locale.get(LocaleKey.TOP_BAR_BT_ORDER))}
        {getLink(AppPath.CHECKOUT, Locale.get(LocaleKey.TOP_BAR_BT_CHECKOUT))}
        {signControls}
      </Nav>
    </Navbar>
  );
};

export default observer(TopBar);
