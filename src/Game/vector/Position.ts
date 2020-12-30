import { IEntity } from '../entity/IEntity';
import { Game } from '../Game';

export class Position {
	constructor(public x: number, public y: number, public width: number, public height: number) {}

	isCollision(position: IEntity): boolean {
		return (
			this.x + this.width >= position.x &&
			this.x - this.width <= position.x &&
			this.y + this.width >= position.y &&
			this.y - this.width <= position.y
		);
	}

	static getRandomPosition(width: number, height: number) {
		const game = Game.getInstance();

		const x = Math.floor(Math.random() * (game.width / width)) * width;

		const y = Math.floor(Math.random() * (game.height / height)) * height;

		return new Position(x, y, width, height);
	}
}
