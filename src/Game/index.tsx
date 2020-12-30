import React, { Component, createRef } from 'react';
import { Game } from './Game';
import { Direction } from './key/Direction';
import './styles.scss';

interface Props {}
interface State {}

export class GameComponent extends Component<Props, State> {
	state = {};

	canvas = createRef<HTMLCanvasElement>();

	game: Game;

	componentDidMount() {
		this.game = new Game(this.canvas.current);

		this.game.init();
	}

	componentWillUnmount() {
		this.game.destroy();
	}

	render() {
		return (
			<div className="game-container">
				<canvas ref={this.canvas}></canvas>

				<div className="buttons">
					<button onClick={() => this.game.setDirection(Direction.UP)}>Up</button>
					<div className="rl">
						<button onClick={() => this.game.setDirection(Direction.LEFT)}>Left</button>
						<button onClick={() => this.game.setDirection(Direction.RIGHT)}>Right</button>
					</div>
					<button onClick={() => this.game.setDirection(Direction.DOWN)}>Down</button>
				</div>
			</div>
		);
	}
}
