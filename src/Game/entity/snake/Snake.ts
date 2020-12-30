import { Game } from '../../Game';
import { Direction } from '../../key/Direction';
import { Keys } from '../../key/Key';
import { Entity } from '../Entity';
import { Tail } from './Tail';

export class Snake extends Entity {
	private direction: Direction = Direction.UNKNOWN;

	private keyHandler = (e: KeyboardEvent) => {
		if (Keys.UP.indexOf(e.key) > 0 && this.direction !== Direction.DOWN) {
			e.preventDefault();

			this.direction = Direction.UP;
		}

		if (Keys.DOWN.indexOf(e.key) > 0 && this.direction !== Direction.UP) {
			e.preventDefault();

			this.direction = Direction.DOWN;
		}

		if (Keys.LEFT.indexOf(e.key) > 0 && this.direction !== Direction.RIGHT) {
			e.preventDefault();

			this.direction = Direction.LEFT;
		}

		if (Keys.RIGHT.indexOf(e.key) > 0 && this.direction !== Direction.LEFT) {
			e.preventDefault();

			this.direction = Direction.RIGHT;
		}
	};

	private speed = 5;

	private tails: Tail[] = [];

	constructor(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		private defaultTails = 5
	) {
		super(ctx, x, y, width, height);
	}

	init(): void {
		window.addEventListener('keydown', this.keyHandler);

		this.reset();
	}

	getTails(): Tail[] {
		return this.tails;
	}

	addTail() {
		const dir = {
			x: this.x - this.width * this.tails.length,
			y: this.y - this.width * this.tails.length,
		};

		const movement = this.getMovement();

		const lastTail = this.tails[this.tails.length - 1];

		if (lastTail != null) {
			dir[movement[0]] = lastTail[movement[0]] + -movement[1];
		}

		const tail = new Tail(this, dir.x, dir.y, this.width, this.height);

		this.tails.push(tail);

		tail.init();
	}

	addTails(amount: number) {
		for (let i = 0; i < amount; i++) {
			this.addTail();
		}
	}

	addDefaultTails() {
		this.addTails(this.defaultTails);
	}

	update(): void {
		const head = this.getHead();

		if (head == null) return;

		const movement = this.getMovement();

		for (let i = this.tails.length; i >= 0; i--) {
			const current = this.tails[i];
			const next = this.tails[i - 1];

			if (next == null || current == null || current === head) continue;

			current.x = Math.floor(next.x);
			current.y = Math.floor(next.y);

			this.ctx.fillStyle = '#34495e';
			this.ctx.fillRect(current.x, current.y, current.width, current.height);
		}

		head[movement[0]] += movement[1];

		this.x = Math.floor(head.x);
		this.y = Math.floor(head.y);

		this.ctx.fillStyle = '#e74c3c';
		this.ctx.fillRect(head.x, head.y, head.width, head.height);

		this.checkCollision();
	}

	getHead(): Tail {
		return this.tails[0];
	}

	destroy(): void {
		this.x = this.default.x;
		this.y = this.default.y;
		this.speed = 5;
		this.direction = Direction.UNKNOWN;
		window.removeEventListener('keydown', this.keyHandler);
	}

	getMovement(): ['x' | 'y', number] {
		if (this.direction === Direction.UP || this.direction === Direction.DOWN) {
			return ['y', (this.direction === Direction.UP ? -1 : 1) * this.speed];
		}

		if (this.direction === Direction.RIGHT || this.direction === Direction.LEFT) {
			return ['x', (this.direction === Direction.LEFT ? -1 : 1) * this.speed];
		}

		return ['x', 0];
	}

	checkCollision(): void {
		const game = Game.getInstance();

		if (
			this.x < 0 ||
			this.x + this.width >= game.width ||
			this.y < 0 ||
			this.y + this.height >= game.height
		) {
			game.reset();
		}

		const head = this.getHead();

		game.getEntities().forEach((entity) => {
			if (entity instanceof Snake && this.tails.length > this.defaultTails + 2) {
				for (const tail of entity.getTails()) {
					if (tail.isCollision(this) && tail !== head) {
						tail.handleCollision(this);
					}
				}

				return;
			}

			if (this.isCollision(entity) && this !== entity) {
				entity.handleCollision(this);
			}
		});
	}

	addSpeed(speed: number) {
		this.speed += speed;
	}

	setDirection(direction: Direction) {
		this.direction = direction;
	}

	reset() {
		this.direction = Direction.UNKNOWN;
		this.speed = 5;
		this.x = this.default.x;
		this.y = this.default.y;
		this.addDefaultTails();
	}
}
