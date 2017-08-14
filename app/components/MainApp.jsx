import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

var $ = require('jquery'); 

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		var start = this.generateLevel('1');
		this.state = {
			mapa: [...start.arr],
			// hero: [11,8], for fake and real level-1
			hero: [...start.hero],
		}
		this.handleKeyDown = this.handleKeyDown.bind(this);
		$(document.body).on('keydown', this.handleKeyDown);
	}

	generateLevel(val) {
		switch(val) {
			case '1':
				return {
					arr:[[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
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
					   ],
					hero: [11,8],
				}
			case '2':
				return {
					arr: [[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
					   [-1, 3, 3, 0, 0,-1, 0, 0, 0, 0, 0,-1,-1,-1],
					   [-1, 3, 3, 0, 0,-1, 0, 2, 0, 0, 2, 0, 0,-1],
					   [-1, 3, 3, 0, 0,-1, 2,-1,-1,-1,-1, 0, 0,-1],
					   [-1, 3, 3, 0, 0, 0, 0, 0, 0,-1,-1, 0, 0,-1],
					   [-1, 3, 3, 0, 0,-1, 0,-1, 0, 0, 2, 0,-1,-1],
					   [-1,-1,-1,-1,-1,-1, 0,-1,-1, 2, 0, 2, 0,-1],
					   [-1,-1,-1, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0,-1],
					   [-1,-1,-1, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0,-1],
					   [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
					   ],
					hero: [7,4],
				}
		}
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
		var count = 0;
		// var checkWin = () => {
			for (var i = 0; i < this.state.mapa.length; i++) {
				for (var j = 0; j < this.state.mapa[i].length; j++) {
					if(this.state.mapa[i][j]===3) {
						count++;
					}
				}
			}
		// }
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
							if(elem === 3) {
								count++;
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
			<div className='cardFlex columnOrder justifyAround'>
				<h1 className='page-title'>{count!==0?'SUDOKU':'YOU WIN'}</h1>
				<div className='cardGap cardFlex'>
					<div className='cardGap'></div>
					<div className='cardGap3 cardFlex'>
						{renderMapa(this.state.mapa)}
					</div>
					<div className='cardGap'></div>
				</div>
				<div className='cardGap'> </div>
				<div className='cardGap'>
				<select onChange={(e) => {
					var level = this.generateLevel(e.target.value);
					this.setState({
						mapa:[...level.arr],
						hero:[...level.hero],
					})
				}}>
					<option disabled selected>Select level</option>
					<option value='1'>Level 1</option>
					<option value='2'>Level 2</option>
				</select>
				</div>
			</div>
		);
	}
}

export default MainApp;