import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.scss'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './localization/i18n.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
          <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
