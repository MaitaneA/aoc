var accessibleRolls = 0;
//var input = ['..@@.@@@@.','@@@.@.@.@@','@@@@@.@.@@','@.@@@@..@.','@@.@@@@.@@','.@@@@@@@.@','.@.@.@.@@@','@.@@@.@@@@','.@@@@@@@@.','@.@.@@@.@.'];
var input = [];

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

// Get solution (part 2)
getInput().then(function () {
	let keepGoing = true;
	
	while (keepGoing) {
		keepGoing = false;
		
		for (let row = 0; row < input.length; row++) {
			console.log(input[row]);
			let newRow = '';
			
			for (let col = 0; col < input[row].length; col++) {
				if (input[row][col] == '.') {
					newRow += input[row][col];
					continue;
				}
				
				let adjacentCount = 0;
				
				for (let i = row-1; i <= row+1; i++) {
					for (let j = col-1; j<= col+1; j++) {
						if (i >= 0 && i < input.length && j >= 0 && j < input[row].length) {
							if ((i != row || j != col) && input[i][j] == '@') {
								adjacentCount++;
							}
						}
					}
				}
				
				if (adjacentCount < 4) {
					accessibleRolls++;
					newRow += '.';
					keepGoing = true;
				} else {
					newRow += '@';
				}
			}
			
			input[row] = newRow;
		}
		
		console.log('--------------------- Iteration end - count so far: ' + accessibleRolls);
	}
	
	console.log('Solution: ' + accessibleRolls);

});

// Get solution (part 1)
/*getInput().then(function () {
	for (let row = 0; row < input.length; row++) {
		console.log('Row ' + row);
		for (let col = 0; col < input[row].length; col++) {
			if (input[row][col] == '.') {
				console.log('Position ' + row + ' ' + col + ' does not have a scroll in it.');
				continue;
			}
			
			let adjacentCount = 0;
			
			for (let i = row-1; i <= row+1; i++) {
				for (let j = col-1; j<= col+1; j++) {
					if (i >= 0 && i < input.length && j >= 0 && j < input[row].length) {
						if ((i != row || j != col) && input[i][j] == '@') {
							adjacentCount++;
						}
					}
				}
			}
			
			if (adjacentCount < 4) {
				accessibleRolls++;
			}
			
			console.log('Rol ' + row + ' ' + col + ' -> ' + adjacentCount + ' | Accessible rolls count: ' + accessibleRolls);
		}
	}

	console.log('Solution: ' + accessibleRolls);

});*/