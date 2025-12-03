var sumInvalidIDs = 0;
var input = "";

// Get input
async function getInput(getSolution) {
	try {
		const response = await fetch('./input.txt');
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		input = await response.text();
		
		getSolution();
		
	} catch (error) {
		console.error(error.message);
	}	
}

// Get solution
function getSolution() {
	const IDranges = input.split(',');
	
	for (var i = 0; i < IDranges.length; i++) {
		let range = IDranges[i].split('-');
		console.log('Range: ' + range[0] + ' to ' + range[1]);
		
		rangeStart = Number(range[0]);
		rangeEnd = Number(range[1]);
		
		for (var j = rangeStart; j<= rangeEnd; j++) {
			let ID = j.toString();
			let midSize = ID.length;
			
			if (midSize % 2) continue;  // If the number of digits is odd, the ID cannot be invalid - skip it
			
			if (ID.slice(0, midSize/2) == ID.slice(midSize/2)) {
				console.log('Invalid ID: ' + ID);
				sumInvalidIDs += j;
			}
		}
	}

	console.log('Solution: ' + sumInvalidIDs);
}


// Run things
getInput(getSolution);