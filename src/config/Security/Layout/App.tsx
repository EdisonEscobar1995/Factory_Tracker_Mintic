import React, { FC, Suspense } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { IAppProps } from '../../../Interfaces';
import Loading from '../../../Components/Shared/Loading';
import Layout from '../../../Components/Security/Layout/LayoutContainer';

const App: FC<IAppProps> = ({ language }: IAppProps) => {
  return (
    <ConfigProvider locale={language}>
      <Router>
        <Suspense fallback={<Loading loading />}>
          <Layout />
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;
