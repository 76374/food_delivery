import locale from '../../data/locale';
import { localeReady, authSubmited } from '../../store/actions/appState';
import { initMenu } from '../../store/actions/order';

const initApp = (dispatch) => {
  locale.init(() => {
    dispatch(localeReady());
  });

  dispatch(initMenu());

  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  if (firstName && lastName) {
    dispatch(authSubmited({ firstName, lastName }));
  }
};

export default initApp;
