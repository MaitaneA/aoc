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

// Get solution (part 2)
getInput().then(function () {
	const IDranges = input.split(',');
	
	for (let i = 0; i < IDranges.length; i++) {
		let range = IDranges[i].split('-');
		let rangeStart = Number(range[0]);
		let rangeEnd = Number(range[1]);

		let outputStr = 'Range: ' + range[0] + ' to ' + range[1];
		let numInvalids = 0;
		
		for (let j = rangeStart; j<= rangeEnd; j++) {
			let ID = j.toString();
			let maxDivider = Math.floor(ID.length/2);
			
			let invalid = false;
			for (let div = 1; div <= maxDivider; div++) {
				if (ID.length % div == 0) {
					let parts = ID.length / div;
					
					for (let k = 1; k < parts; k++) {
						if (ID.slice(0, div) != ID.slice(k*div, k*div + div)) {
							invalid = false;
							break;
						}
						invalid = true;
					}
				}
				
				if (invalid) {
					numInvalids++;
					
					if (numInvalids == 1) {
						outputStr += ' -->  Invalid ID(s): ';
					} else if (numInvalids > 1) {
						outputStr += ', ';
					}
					outputStr += ID;
					
					sumInvalidIDs += j;
					
					break;
				}
			}
			
		}
		console.log(outputStr);
	}

	console.log('Solution: ' + sumInvalidIDs);

});

// Get solution (part 1)
/*getInput().then(function () {
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
		console.log(outputStr);
	}

	console.log('Solution: ' + sumInvalidIDs);

});*/



