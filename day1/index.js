var currentVal = 50;
var nZeros = 0;
var input = [];

// Get input
async function getInput(getPassword) {
	try {
		const response = await fetch('./input.txt');
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		const result = await response.text();
		input = result.split(/\r?\n/);
		
		getPassword();
		
	} catch (error) {
		console.error(error.message);
	}	
}

// Check password
function getPassword() {
	for (var i = 0; i < input.length; i++) {
		if (input[i].slice(0,1) == 'R') {
			currentVal = (currentVal + Number(input[i].slice(1))) % 100;
		} else {
			currentVal = (currentVal - Number(input[i].slice(1))) % 100;
			if (currentVal < 0) {
				currentVal +=100;
			}
		}

		console.log('The dial is rotated ' + input[i] + ' to point at ' + currentVal + '.');
		
		if (!currentVal) {
			nZeros++;
			console.log('Number of zeros: ' + nZeros);
		}
	}

	console.log('Password: ' + nZeros);
}

function getPassword2() {
	for (var i = 0; i < input.length; i++) {
		let ticks = Number(input[i].slice(1));
		if (input[i].slice(0,1) == 'L') {
			while (ticks > 0) {
				currentVal--;
				if (currentVal == 0) {
					nZeros++;
				} else if (currentVal == -1) {
					currentVal = 99;
				}
				ticks--;
			}
		} else {
			while (ticks > 0) {
				currentVal++;
				if (currentVal == 100) {
					nZeros++;
					currentVal = 0;
				}
				ticks--;
			}
		}
		
		console.log('The dial is rotated ' + input[i] + ' to point at ' + currentVal + '. ' + nZeros + ' zeros so far.');*/
		
		
		/*let direction = 1;
		if (input[i].slice(0,1) == 'L') {
			direction = -1;
			if (currentVal == 0) nZeros--;  // If we started in 0 and went to the left, I need to avoid counting the initial 0 (avoid counting twice) - non-pretty solution but hopefully will do the job!
		}
		currentVal += direction * Number(input[i].slice(1));
		nZeros += direction * Math.floor(currentVal / 100);
		currentVal = currentVal % 100;
		if (currentVal < 0) {
			currentVal +=100;
		}

		console.log('The dial is rotated ' + input[i] + ' to point at ' + currentVal + '. ' + nZeros + ' zeros so far.');*/
	}

	console.log('Password v2: ' + nZeros);
}

// Run things
getInput(getPassword2);