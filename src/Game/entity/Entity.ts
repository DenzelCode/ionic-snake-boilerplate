import { Position } from '../vector/Position';
import { IEntity } from './IEntity';

export abstract class Entity extends Position implements IEntity {
	protected default = {
		x: 0,
		y: 0,
	};

	constructor(
		public ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number
	) {
		super(x, y, width, height);

		this.default = {
			x,
			y,
		};
	}

	init(): void {}

	update(): void {}

	destroy(): void {}

	handleCollision(entity: IEntity): void {}
}
