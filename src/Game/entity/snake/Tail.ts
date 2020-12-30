import { Game } from '../../Game';
import { Entity } from '../Entity';
import { IEntity } from '../IEntity';
import { Snake } from './Snake';

export class Tail extends Entity {
	constructor(private snake: Snake, x: number, y: number, width: number, height: number) {
		super(snake.ctx, x, y, width, height);
	}

	isCollision(entity: Snake): boolean {
		return this.x === entity.x && this.y === entity.y;
	}

	handleCollision(entity: IEntity): void {
		if (entity instanceof Snake) {
			const game = Game.getInstance();

			game.reset();
		}
	}
}
