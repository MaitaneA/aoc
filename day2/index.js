var sumInvalidIDs = 0;
//var input = "492410748-492568208,246-390,49-90,16-33,142410-276301,54304-107961,12792-24543,3434259704-3434457648,848156-886303,152-223,1303-1870,8400386-8519049,89742532-89811632,535853-567216,6608885-6724046,1985013826-1985207678,585591-731454,1-13,12067202-12233567,6533-10235,6259999-6321337,908315-972306,831-1296,406-824,769293-785465,3862-5652,26439-45395,95-136,747698990-747770821,984992-1022864,34-47,360832-469125,277865-333851,2281-3344,2841977-2953689,29330524-29523460";

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
					console.log(outputStr);
					
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

