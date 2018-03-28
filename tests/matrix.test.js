/* eslint no-new: 0 */
const assert = require('assert');
const { describe, it } = require('mocha');
const { Matrix, Vector } = require('../index');

describe('Matrix Class: Validate new Matrix input', () => {
	it('Should throw an error -- input array is too short', () => {
		assert.throws(() => {
			new Matrix([2]);
		}, /Matrix must have at least two columns/, 'Expected validation to fail.');
	});

	it('Should throw an error -- input does not contain nested arrays', () => {
		assert.throws(() => {
			new Matrix(2, 3, 2);
		}, /Matrix must be formed of arrays/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays are empty', () => {
		assert.throws(() => {
			new Matrix([], []);
		}, /Matrix arrays cannot be empty/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays have different lengths', () => {
		assert.throws(() => {
			new Matrix([3, 2], [4, 90], [9]);
		}, /Matrix arrays must all be the same length/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays contains string', () => {
		assert.throws(() => {
			new Matrix([6, 'h'], [9, 9]);
		}, /Matrix columns should comprise numbers only/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays contains array', () => {
		assert.throws(() => {
			new Matrix([[5]], [9]);
		}, /Matrix columns should comprise numbers only/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays contains object', () => {
		assert.throws(() => {
			new Matrix([{}], [9]);
		}, /Matrix columns should comprise numbers only/, 'Expected validation to fail.');
	});

	it('Should throw an error -- nested arrays contains Boolean', () => {
		assert.throws(() => {
			new Matrix([true], [9]);
		}, /Matrix columns should comprise numbers only/, 'Expected validation to fail.');
	});

	it('Should NOT throw an error -- create a ', () => {
		const m = new Matrix([3, 7], [9, 3], [4, 5]);
		assert(m instanceof Matrix);
	});
});

describe('Matrix: multiplyWithVector', () => {
	it('Should fail -- not passing instance of vector', () => {
		const m = new Matrix([1, 2], [3, 4]);
		assert(m instanceof Matrix);
		assert.throws(() => {
			m.multiplyWithVector(6);
		}, /Argument must be a Vector instance/);
	});

	it('Should fail -- vector size does not match matrix size', () => {
		const m = new Matrix([1, 2], [3, 4], [5, 6]);
		const v = new Vector(1, 2);
		assert.throws(() => {
			m.multiplyWithVector(v);
		}, /Vector must have same number of rows as the matrix has columns/);
	});

	it('Should return a new vector', () => {
		const m = new Matrix([2, 3], [4, 5]);
		const v = new Vector(2, 4);

		const newVector = m.multiplyWithVector(v);
		assert(newVector instanceof Vector);
		assert.deepStrictEqual(newVector.data, [20, 26]);
	});
});

describe('Matrix: multiplyWithMatrix', () => {
	it('Should throw an error -- provided argument isn\'t a matrix instance', () => {
		const m = new Matrix([1, 2], [3, 4]);
		assert.throws(() => {
			m.multiplyWithMatrix([2, 3], [6, 9]);
		}, /Argument must be a Matrix instance/);
	});

	it('Should fail -- Matrices aren\'t corresponding sizes', () => {
		const m1 = new Matrix([1, 2], [3, 4], [4, 5]);
		const m2 = new Matrix([1, 2], [2, 3]);
		assert.throws(() => {
			m2.multiplyWithMatrix(m1);
		}, /Error: Provided matrix has 3 columns & 'this' matrix has 2 rows: the two numbers need to match./);
	});

	it('Should create a new matrix', () => {
		const m1 = new Matrix([2, 3], [4, 5]);
		const m2 = new Matrix([6, 7], [8, 9]);
		const result = m2.multiplyWithMatrix(m1);
		assert(result instanceof Matrix);
		assert.deepStrictEqual(result.data, [[40, 53], [52, 69]]);
	});
});
