import { Food } from './entity/food/Food';
import { IEntity } from './entity/IEntity';
import { Snake } from './entity/snake/Snake';
import { Direction } from './key/Direction';
import { Position } from './vector/Position';

export class Game {
	private ctx: CanvasRenderingContext2D;
	public width = window.innerWidth;
	public height = window.innerHeight / 2;
	private entities: IEntity[] = [];
	private pause = false;
	private interval: number;
	private grid = 25;
	private static instance: Game;

	constructor(private canvas: HTMLCanvasElement) {
		Game.instance = this;

		this.ctx = canvas.getContext('2d');

		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.scheduleUpdate();
	}

	static getInstance(): Game {
		return this.instance;
	}

	init() {
		this.pause = false;

		this.initEntities();
	}

	reset() {
		this.destroy();
		this.init();
	}

	initEntities(): void {
		this.addEntity(new Snake(this.ctx, 0, 0, this.grid, this.grid));

		this.addFood();
	}

	setDirection(direction: Direction) {
		this.entities.forEach((entity) => {
			if (entity instanceof Snake) {
				entity.setDirection(direction);
			}
		});
	}

	addFood(): void {
		const position = Position.getRandomPosition(this.grid, this.grid);

		this.addEntity(
			new Food(
				this.ctx,
				position.x,
				position.y,
				position.width,
				position.height,
				0,
				1,
				5,
				'#27ae60'
			)
		);
	}

	addEntity(entity: IEntity) {
		this.entities.push(entity);

		entity.init();
	}

	getEntities(): IEntity[] {
		return this.entities;
	}

	getEntity(x: number, y: number): IEntity {
		return null;
	}

	scheduleUpdate(): void {
		this.update();

		if (this.pause === false) {
			if (this.interval != null) {
				this.cancelInterval();
			}

			this.interval = requestAnimationFrame(() => this.scheduleUpdate());
		}
	}

	cancelInterval(): void {
		cancelAnimationFrame(this.interval);

		this.interval = null;
	}

	update() {
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);

		this.entities.forEach((entity) => entity.update());
	}

	destroy() {
		this.cancelInterval();
		this.entities.forEach((entity) => entity.destroy());
		this.entities.splice(0, this.entities.length);
		this.ctx.fillStyle = '#fff';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.pause = true;
	}
}
