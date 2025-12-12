//var input = ['123 328  51 64 ', ' 45 64  387 23 ', '  6 98  215 314', '*   +   *   +  '];
var input = [];
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

function processInput2() {
	operations = input[input.length - 1];
	input.pop();
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

function processInput1() {
	operations = input[input.length - 1].trim().split(/\s+/);
	input.pop();
	
	for (let i = 0; i < input.length; i++) {
		input[i] = input[i].trim().split(/\s+/).map(Number);
	}
	input = trasposeMat(input);
}

// Get solution (part 2)
getInput().then(function () {
	processInput2();
	console.log('Input has been processed');
	
	let startPos = 0;
	let endPos = 0;
	
	while (endPos < operations.length) {
		endPos = operations.slice(startPos + 1).search(/\S/);
		
		if (endPos == -1) {
			endPos = operations.length;
		} else {
			endPos = startPos + endPos;
		}
		
		let problem = [];
		for (let i = 0; i < input.length; i++) {
			problem.push(input[i].slice(startPos, endPos));
		}
		
		problem = trasposeMat(problem);
		
		for (let i = 0; i < problem.length; i++) {
			problem[i] = problem[i].reduce((str, currentDig) => str + currentDig).trim();
		}
		
		if (operations[startPos] == '+') {
			results.push( problem.reduce((numb, currentStr) => numb + Number(currentStr), 0) );
			console.log('Problem starting in position ' + startPos + ' -> result = ' + results[results.length - 1]);
		} else if (operations[startPos] == '*') {
			results.push( problem.reduce((numb, currentStr) => numb * Number(currentStr), 1) );
			console.log('Problem starting in position ' + startPos + ' -> result = ' + results[results.length - 1]);
		} else {
			console.log('Something is wrong, startPos = ' + startPos + ' and the operation is missing');
		}
		
		startPos = endPos+1;
	}
	
	let finalResult = results.reduce((sum, currentNumber) => sum + currentNumber);
	
	console.log('Solution: ' + finalResult);

});

// Get solution (part 1)
/*getInput().then(function () {
	processInput1();
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

});*/