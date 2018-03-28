module.exports = class Vector {
	constructor(...nums) {
		this.validateInput(nums);
		this.data = nums;
	}

	add(v2) {
		if (!(v2 instanceof Vector)) throw new Error('Provided argument must be a Vector instance.');
		if (v2.data.length !== this.data.length) throw new Error('Vectors must be the same length');
		const arr = this.data.map((el, i) => el + v2.data[i]);
		return new Vector(...arr);
	}

	scale(n) {
		if (typeof n !== 'number') throw new Error('The argument passed to scale must be a scalar');
		return this.data.map(el => el * n);
	}

	// scale

	validateInput(nums) {
		if (!nums.length) throw new Error('Vector can\'t be empty');
		if (!nums.every(num => typeof num === 'number')) throw new Error('Vector can only contain numbers');
		return true;
	}
};
