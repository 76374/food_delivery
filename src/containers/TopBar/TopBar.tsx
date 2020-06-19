import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/NavBar';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
  const { user, appState } = useStore();
  const location = useLocation();

  const signInClickHandler = useCallback(() => {
    appState.setAuthPopup('signIn');
  }, [appState]);

  const signUpClickHandler = useCallback(() => {
    appState.setAuthPopup('signUp');
  }, [appState]);

  return (
    <Navbar expand="sm">
      <Nav className="mr-auto" activeKey={location.pathname}>
        {getLink(AppPath.ORDER, Locale.get(LocaleKey.TOP_BAR_BT_ORDER))}
        {getLink(AppPath.CHECKOUT, Locale.get(LocaleKey.TOP_BAR_BT_CHECKOUT))}
      </Nav>
      {user.isSignedIn ? (
        <Button>{Locale.get(LocaleKey.TOP_BAR_BT_LOGOUT, user.firstName)}</Button>
      ) : (
        <ButtonGroup>
          <Button variant="outline-primary" onClick={signInClickHandler}>
            {Locale.get(LocaleKey.TOP_BAR_BT_SIGN_IN)}
          </Button>
          <Button onClick={signUpClickHandler}>{Locale.get(LocaleKey.TOP_BAR_BT_SIGN_UP)}</Button>
        </ButtonGroup>
      )}
    </Navbar>
  );
};

export default observer(TopBar);
