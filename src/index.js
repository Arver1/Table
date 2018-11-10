import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import './css/style.css';
import workers from './workers';

render(<Root workers={workers} />, document.getElementById('container'));
