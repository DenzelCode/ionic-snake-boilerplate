import { Position } from '../../vector/Position';
import { Entity } from '../Entity';
import { IEntity } from '../IEntity';
import { Snake } from '../snake/Snake';

export class Food extends Entity {
	constructor(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		private speed: number,
		private score: number,
		private tails: number,
		private color: string
	) {
		super(ctx, x, y, width, height);
	}

	init(): void {}

	update(): void {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	destroy(): void {}

	handleCollision(entity: IEntity): void {
		if (entity instanceof Snake) {
			const position = Position.getRandomPosition(this.width, this.height);

			this.x = position.x;
			this.y = position.y;

			entity.addTails(this.tails);
			entity.addSpeed(this.speed);
		}
	}
}
