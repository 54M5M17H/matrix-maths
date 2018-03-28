# Matrix-Maths
### Simple Matrix Maths library written in JavaScript

## Use the library
`const { Matrix, Vector } = require('matrix-maths')`;

## Current Features
- Create & validate a matrix: `new Matrix` returns a Matrix instance, where each argument should be an array representing a column of your matrix. Each array must be the same length. The matrix data is stored in the instance `data` property. Each column must be the same length.

E.G. `const matrix1 = new Matrix([1, 2], [3, 4]);`

- Create & validate a vector: `new Vector` returns a Vector instance, where each argument should be a number. The vector data is stored in the vector's `data` property.

- Add two vectors. Returns a new Vector instance:
```
const v1 = new Vector(1, 2, 3);
const v2 = new Vector(4, 5, 6);
const result = v1.add(v2);
```

- Scale a vector. Returns a new Vector instance:
```
const v1 = new Vector(1, 2, 3);
const v2 = new Vector.scale(2);
// v2 data --> 2, 4, 6

- Multiply a Vector & a Matrix. Returns a new Vector instance. The vector must have as many columns (arguments) as the matrix has rows (array arguments), as a virtue of matrix multiplication.
```
const v = new Vector(1, 2);
const m = new Matrix([8, 7], [6, 5]);
const result = m.multiplyWithVector(v);
```

- Multiply two matrices. Returns a new Matrix instance.

	- For matrix multiplication, order is vital. `matrix1 * matrix2 != matrix2 * matrix1`. 
	- When calling this method, the instance on which the method is called is used as the right-most matrix, where matrix multiplication is done from right to left. 
	- Further, the matrix on which the method is called should have as many rows (length of each array passed) as the matrix given as the argument has columns (argument array provided). This is because inter-dimensional multiplication is not yet supported.
```
const m1 = new Matrix([1, 2], [3, 4]);
const m2 = new Matrix([8, 7], [6, 5]);
const result = m2.multiplyWithMatrix(m1);
```