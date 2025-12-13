var input = ['.......S.......', '...............', '.......^.......', '...............', '......^.^......', '...............', '.....^.^.^.....', '...............', '....^.^...^....', '...............', '...^.^...^.^...', '...............', '..^...^.....^..', '...............', '.^.^.^.^.^...^.', '...............'];
//var input = [];
var splits = 0;


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

function processInput() {
	for (let i = 1; i < input.length; i++) {
		input[i] = input[i].split('');
	}
}


// Get solution (part 1)
getInput().then(function () {
	processInput();
	
	let startPos = input[0].search('S');
	input[1][startPos] = '|';
	
	for (let i = 1; i < input.length - 1; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] == '|') {
				if (input[i+1][j] == '^') {
					splits++;
					input[i+1][j-1] = '|';
					input[i+1][j+1] = '|';
				} else {
					input[i+1][j] = '|';
				}
			}
		}
	}
	
	console.log('Solution: ' + splits);


});
