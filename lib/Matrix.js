const Vector = require('./Vector');

module.exports = class Matrix {
	constructor(...input) {
		this.validateInput(input);
		this.data = input;
	}

	multiplyWithVector(vector) {
		if (!(vector instanceof Vector)) throw new Error('Argument must be a Vector instance.');
		if (vector.data.length !== this.data.length) throw new Error('Vector must have same number of rows as the matrix has columns.');

		const result = new Array(vector.data.length).fill(0);
		for (let i = 0; i < result.length; i++) {
			const vectorElement = vector.data[i];
			for (let r = 0; r < result.length; r++) {
				const matrixElement = this.data[i][r];
				result[r] += matrixElement * vectorElement;
			}
		}
		return new Vector(...result);
	}

	multiplyWithMatrix(m1) {
		// Order: m1 x this
		if (!(m1 instanceof Matrix)) throw new Error('Argument must be a Matrix instance.');
		if (m1.data.length !== this.data[0].length) throw new Error(`Provided matrix has ${m1.data.length} columns & 'this' matrix has ${this.data[0].length} rows: the two numbers need to match.`);
		const data = this.data.map(col => new Vector(...col))
			.map(v => m1.multiplyWithVector(v).data);
		return new Matrix(...data);
	}

	validateInput(input) {
		if (Array.isArray(input)) {
			if (input.length < 2) throw new Error('Matrix must have at least two columns.');
			if (!input.every(el => Array.isArray(el))) throw new Error('Matrix must be formed of arrays.');
			if (!input[0].length) throw new Error('Matrix arrays cannot be empty.');
			if (!input.every(el => el.length === input[0].length)) throw new Error('Matrix arrays must all be the same length.');
			if (!input.every(col => col.every(el => typeof el === 'number'))) throw new Error('Matrix columns should comprise numbers only.');
			return true;
		}
		throw new Error('Matrix should be an array.');
	}
};
