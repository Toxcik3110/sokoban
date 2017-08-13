import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

var $ = require('jquery'); 

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		
	}
	render() {
		
		return (
			<div className='cardFlex columnOrder'>
				<h1 className='page-title'>SUDOKU</h1>
			</div>
		);
	}
}

export default MainApp;