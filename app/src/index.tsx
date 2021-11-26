import ReactDOM from 'react-dom';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './styles/style.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { pages } from './pages';

function renderReactDom() {
  ReactDOM.render(
    <HashRouter>
      <Routes>
        {pages.map((Page) => (
          <Route key={Page.pathname} path={Page.pathname} element={<Page />} />
        ))}
      </Routes>
    </HashRouter>,
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
