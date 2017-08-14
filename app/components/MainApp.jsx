import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

var $ = require('jquery'); 

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		// var arr = [];
		var arr = [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1,-1,-1, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1,-1,-1, 2, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1,-1,-1, 0, 0, 2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1, 0, 0, 2, 0, 2, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1, 0,-1, 0,-1,-1, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1, 0, 0, 0,-1, 0,-1,-1, 0,-1,-1,-1,-1,-1, 0, 0, 3, 3,-1],
				   [-1, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3,-1],
				   [-1,-1,-1,-1,-1, 0,-1,-1,-1, 0,-1, 0,-1,-1, 0, 0, 3, 3,-1],
				   [-1,-1,-1,-1,-1, 0, 0, 0, 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
				   ];
		// for(var i = 0; i < arr.length; i++) {
		// 	var b = [];
		// 	for(var j = 0; j < arr[i].length; j++) {
		// 		if(((j === 0) || (j === arr[i].length-1))
		// 		 || ((i === 0) || (i === 11))) {
		// 			b.push(-1);
		// 		} else {
		// 			b.push(0);
		// 		}
		// 	}
		// 	arr = [...arr, b];
		// }
		// arr[1][1] = 1;
		this.state = {
			mapa: [...arr],
			hero: [11,8],
		}
		this.handleKeyDown = this.handleKeyDown.bind(this);
		$(document.body).on('keydown', this.handleKeyDown);
	}

	handleKeyDown(e) {
		var player = this.state.hero;
		var mapa = this.state.mapa;
		var code = e.originalEvent.key;
		var x = player[1];
		var y = player[0];

		var checkDir = (dx,dy) => {
			var one = mapa[x+dx][y+dy];
			if(one !== -1) {
				if(one === 2 || one === 5) {
					var two = mapa[x+dx*2][y+dy*2];
					if(two !== -1 && two !== 2 && two !== 5) {
						player[1] += dx;
						player[0] += dy;
						mapa[x+dx*2][y+dy*2] += 2;
						mapa[x+dx][y+dy] -= 2;
					}
				} else {
					player[1] += dx;
					player[0] += dy;
				}
			}

			this.setState({
				mapa: [...mapa],
				hero: [player[0],player[1]],
			});
		}

		// console.log(code);

		switch(code) {
			case 'ArrowUp':
				var dx = -1;
				var dy = 0;
				checkDir(dx,dy);
				break;

			case 'ArrowDown':
				var dx = 1;
				var dy = 0;
				checkDir(dx,dy);
				break;

			case 'ArrowLeft':
				var dx = 0;
				var dy = -1;
				checkDir(dx,dy);
				break;

			case 'ArrowRight':
				var dx = 0;
				var dy = 1;
				checkDir(dx,dy);
				break;
		}
	}

	render() {
		var player = this.state.hero;
		var renderMapa = (arr) => {
			var y = -1;
			// console.log('arr',arr)
			var renderRow = (arr) => {
				return (arr.map((e) => {
					y++;
					var x = -1;
					var renderElem = (e) => {
						return e.map((elem) => {
							x++;
							// console.log('x:' + x + '; y:' + y);
							if(player[0] === x && player[1] === y) {
								elem = 1;
								// console.log('match!');
							}
							// var color = elem === 0 ? '#292' : (elem === 1 ? '#992' : '#4ff');
							var color = '#444';
							switch(elem) {
								case 0:	color = '#aaa';	break;
								case 1:	color = '#d22';	break;
								case 2:	color = '#dd2';	break;
								case 3:	color = '#ddd';	break;
								case 5:	color = '#2d2';	break;
								// case 4:	color = '#2d2';	break;

							}
							return (
								<div className='cardGap centerText' key={uuid()} style={{backgroundColor:color}}>
									 
								</div>
							)
						})
					}
					return (
						<div className='cardGap cardFlex centerFlex' key={uuid()}>
							{renderElem(e)}
						</div>
					)
				}));
			}
			return (
				<div className='cardGap cardFlex columnOrder'>
					{renderRow(arr)}
				</div>
			)
		}
		return (
			<div className='cardFlex columnOrder'>
				<h1 className='page-title'>SUDOKU</h1>
				<div className='cardGap cardFlex'>
					{renderMapa(this.state.mapa)}	
				</div>
			</div>
		);
	}
}

export default MainApp;