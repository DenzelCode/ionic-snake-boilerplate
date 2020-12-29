export class Game {
	private ctx: CanvasRenderingContext2D;

	constructor(private canvas: HTMLCanvasElement) {
		this.ctx = canvas.getContext('2d');
	}

	init() {}

	destroy() {}
}
