import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; 
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/LandingPages/applicantLanding';
const userLang = navigator.language || navigator.language;
const isSpanish = userLang.startsWith("es");
document.title = isSpanish 
  ? "Portal de Empleo" 
  : "Portal";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Landing />} /> 
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);