import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import 'antd/dist/antd.css';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<BounceLoader 
        css={override}
        size={150} 
        color={'#2e5f84'}
      />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);