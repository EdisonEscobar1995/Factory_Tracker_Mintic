import antdLocales from './antdLocales';
import App from './App';

const AppContainer = () => {
  return <App language={antdLocales('es')} />;
};

export default AppContainer;
