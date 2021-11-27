import ReactDOM from 'react-dom';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './styles/style.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import { pages } from './pages';
import { store } from './app/store';

const Router = (window as any).cordova ? HashRouter : BrowserRouter;

function renderReactDom() {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Routes>
          {pages.map((Page) => (
            <Route
              key={Page.pathname}
              path={Page.pathname}
              element={<Page />}
            />
          ))}
        </Routes>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

if ((window as any).cordova) {
  document.addEventListener(
    'deviceready',
    () => {
      renderReactDom();
    },
    false
  );
} else {
  renderReactDom();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
