import React from 'react';
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './Auth'

Bugsnag.start({
  apiKey: 'f2c95ccfa378c93b437a0d07e1619053',
  plugins: [new BugsnagPluginReact(React)]
})

const ErrorBoundary = Bugsnag.getPlugin('react')


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
