var sumJoltage = 0;
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

// Get solution (part 1)
getInput().then(function () {
	for (var i = 0; i < input.length; i++) {
		let battery = input[i];
		let outstr = 'Battery: ' + battery + ' -> ';
		let joltage1 = 0;
		let joltage2 = 0;
		
		// Find first digit
		for (let j = 9; j >= 1 && joltage1 == 0; j--) {
			let searchRes = battery.slice(0, battery.length - 1).search(j);
			
			if (searchRes >= 0) {
				joltage1 = Number(j);
				battery = battery.slice(searchRes+1);
				break;
			}
		}
		
		// Find second digit
		for (let j = 9; j >= 1 && joltage2 == 0; j--) {
			let searchRes = battery.search(j);
			
			if (searchRes >= 0) {
				joltage2 = Number(j);
				break;
			}
		}
		
		sumJoltage += (joltage1*10 + joltage2);
		
		outstr += 'Joltage: ' + (joltage1*10 + joltage2).toString();
		console.log(outstr);
	}

	console.log('Solution: ' + sumJoltage);

});

