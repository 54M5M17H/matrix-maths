export default class Vector {
	public data: number[];
	constructor(...nums: number[]) {
		this.validateInput(nums);
		this.data = nums;
	}

	public add(v2: Vector): Vector {
		// if (!(v2 instanceof Vector)) {
		// 	throw new Error('Provided argument must be a Vector instance.');
		// }
		if (v2.data.length !== this.data.length) {
			throw new Error('Vectors must be the same length');
		}
		const arr: number[] = this.data.map((el, i) => el + v2.data[i]);
		return new Vector(...arr);
	}

	// scale

	private validateInput(nums: number[]): boolean {
		if (!nums.length) {
			throw new Error('Vector can\'t be empty');
		}
		// if (!nums.every(num => typeof num === 'number')) {
		// 	throw new Error('Vector can only contain numbers');
		// }
		return true;
	}
}
