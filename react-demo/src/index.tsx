import React from 'react';
import { createRoot } from 'react-dom/client';
import 'milligram';
import './App.scss';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
