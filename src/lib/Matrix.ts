import Vector from './Vector';

export default class Matrix {
	public data: number[][];
	constructor(...input: number[][]) {
		this.validateInput(input);
		this.data = input;
	}

	public multiplyWithVector(vector: Vector): Vector {
		// if (!(vector instanceof Vector)) throw new Error('Argument must be a Vector instance.');
		if (vector.data.length !== this.data.length) {
			throw new Error('Vector must have same number of rows as the matrix has columns.');
		}

		const result: number[] = new Array(vector.data.length).fill(0);
		for (let i = 0; i < result.length; i++) {
			const vectorElement = vector.data[i];
			for (let r = 0; r < result.length; r++) {
				const matrixElement = this.data[i][r];
				result[r] += matrixElement * vectorElement;
			}
		}
		return new Vector(...result);
	}

	public multiplyWithMatrix(m1: Matrix): Matrix {
		// Order: m1 x this
		// if (!(m1 instanceof Matrix)) {
		// 	throw new Error('Argument must be a Matrix instance.');
		// }
		if (m1.data.length !== this.data[0].length) {
			throw new Error(`Provided matrix & 'this' matrix do not match.`);
		}
		const data: number[][] = this.data.map(col => new Vector(...col))
			.map(v => m1.multiplyWithVector(v).data);
		return new Matrix(...data);
	}

	private validateInput(input: number[][]): boolean {
		// if (Array.isArray(input)) {
			if (input.length < 2) {
				throw new Error('Matrix must have at least two columns.');
			}
			// if (!input.every(el => Array.isArray(el))) {
			// 	throw new Error('Matrix must be formed of arrays.');
			// }
			if (!input[0].length) {
				throw new Error('Matrix arrays cannot be empty.');
			}
			if (!input.every(el => el.length === input[0].length)) {
				throw new Error('Matrix arrays must all be the same length.');
			}
			// if (!input.every(col => col.every(el => typeof el === 'number'))) {
			// 	throw new Error('Matrix columns should comprise numbers only.');
			// }
			return true;
		// } else {
		// 	throw new Error('Matrix should be an array.');
		// }
	}
}
