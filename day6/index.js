var input = ['123 328  51 64 ', ' 45 64  387 23 ', '  6 98  215 314', '*   +   *   +  '];
//var input = [];
var operations = [];
var results = [];


// Get input
async function getInput() {
	try {
		const response = await fetch('./input.txt');
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		const result = await response.text();
		input = result.split(/\r?\n/);
		
	} catch (error) {
		console.error(error.message);
	}	
}

function trasposeMat(mat) {
	let newMat = [];
	
	for (let i = 0; i < mat[0].length; i++) {
		let newArr = [];
		
		for (let j = 0; j < mat.length; j++) {
			newArr.push(mat[j][i]);
		}
		newMat.push(newArr);
	}
	
	return newMat;
}

function processInput() {
	operations = input[input.length - 1].trim().split(/\s+/);
	input.pop();
	
	for (let i = 0; i < input.length; i++) {
		input[i] = input[i].trim().split(/\s+/).map(Number);
	}
	input = trasposeMat(input);
}

// Get solution (part 1)
getInput().then(function () {
	processInput();
	console.log('Input has been processed');
	
	for (let i = 0; i < input.length; i++) {
		if (operations[i] == '+') {
			results.push( input[i].reduce((sum, currentNumber) => sum + currentNumber) );
		} else {
			results.push( input[i].reduce((product, currentNumber) => product * currentNumber) );
		}
	}
	
	let finalResult = results.reduce((sum, currentNumber) => sum + currentNumber);
	
	console.log('Solution: ' + finalResult);

});