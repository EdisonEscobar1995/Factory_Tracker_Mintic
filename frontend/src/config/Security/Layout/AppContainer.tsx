import React from 'react';
import antdLocales from './antdLocales';
import App from './App';
import { firebaseConfig } from '../../../utils/firebaseConfig'

firebaseConfig();

const AppContainer: React.FC = () => {
  return <App language={antdLocales('es')} />;
};

export default AppContainer;
