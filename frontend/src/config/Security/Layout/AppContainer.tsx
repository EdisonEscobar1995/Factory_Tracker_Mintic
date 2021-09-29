import React, { FC } from 'react';
import antdLocales from './antdLocales';
import App from './App';

const AppContainer: FC = () => {
  return <App language={antdLocales('es')} />;
};

export default AppContainer;
