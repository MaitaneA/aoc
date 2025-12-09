var freshIDs = 0;
//var input = '3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32';
//var input = ['3-5', '10-14', '16-20', '12-18', '', '1', '5', '8', '11', '17', '32'];
var input = [];
var freshRanges = [];
var availableIDs = [];


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
	let rangesProcessing = true;
	for (let i = 0; i < input.length; i++) {
		if (input[i] == '') {
			rangesProcessing = false;
		} else if (rangesProcessing) {
			let tempArr = input[i].split('-');
			freshRanges.push([Number(tempArr[0]), Number(tempArr[1])]);
		} else {
			availableIDs.push(Number(input[i]));
		}
	}
}

// Get solution (part 1)
getInput().then(function () {
	processInput();
	console.log('Input has been processed');
	
	for (let i = 0; i < availableIDs.length; i++) {
		console.log('> ID: ' + availableIDs[i]);
		
		for (let j = 0; j < freshRanges.length; j++) {
			if (availableIDs[i] >= freshRanges[j][0]  &&  availableIDs[i] <= freshRanges[j][1]) {
				freshIDs++;
				console.log('---> In range: ' + freshRanges[j][0] + '-' + freshRanges[j][1]);
				break;
			}
		}
	}
	
	
	console.log('Solution: ' + freshIDs);

});