var sumInvalidIDs = 0;
var input = "";

// Get input
async function getInput() {
	try {
		const response = await fetch('./input.txt');
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		
		input = await response.text();
		
	} catch (error) {
		console.error(error.message);
	}	
}

// Get solution
getInput().then(function () {
	const IDranges = input.split(',');
	
	for (var i = 0; i < IDranges.length; i++) {
		let range = IDranges[i].split('-');
		let rangeStart = Number(range[0]);
		let rangeEnd = Number(range[1]);

		let outputStr = 'Range: ' + range[0] + ' to ' + range[1];
		let numInvalids = 0;
		
		for (var j = rangeStart; j<= rangeEnd; j++) {
			let ID = j.toString();
			let midSize = ID.length;
			
			if (midSize % 2) continue;  // If the number of digits is odd, the ID cannot be invalid - skip it
			
			if (ID.slice(0, midSize/2) == ID.slice(midSize/2)) {
				console.log('Invalid ID: ' + ID);
				numInvalids++;
				if (numInvalids == 1) {
					outputStr += ' -->  Invalid ID(s): ';
				} else if (numInvalids > 1) {
					outputStr += ', ';
				}
				outputStr += ID;
				
				sumInvalidIDs += j;
			}
		}
	}

	console.log('Solution: ' + sumInvalidIDs);
});