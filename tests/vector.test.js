const assert = require('assert');
const { Vector } = require('../index');

describe('Vector Class: Validate Input', () => {
	it('Should fail: No arguments', () => {
		assert.throws(() => {
			new Vector();
		}, /Vector can't be empty/);
	});

	it('Should fail: Strings included', () => {
		assert.throws(() => {
			new Vector(4, 5,7, 'jh');
		}, /Vector can only contain numbers/);
	});
});

describe('Vector: add', () => {
	it('Should fail -- provided arg is not a Vector instance', () => {
		const v = new Vector(1, 3, 5);
		assert.throws(() => {
			v.add([1, 3, 5]);
		}, /Provided argument must be a Vector instance/);
	});

	it('Should fail -- vectors aren\'t same size', () => {
		const v1 = new Vector(1, 2, 3);
		const v2 = new Vector(1, 2);
		assert.throws(() => {
			v1.add(v2);
		}, /Vectors must be the same length/);
	});

	it('Should add & return two vectors', () => {
		const v1 = new Vector(1, 2, 3);
		const v2 = new Vector(4, 5, 6);
		const result = v1.add(v2);
		assert(result instanceof Vector);
		assert.deepStrictEqual(result.data, [5, 7, 9]);
	});
});
