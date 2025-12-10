var freshIDs = 0;
//var input = '3-5\n10-14\n16-20\n12-18\n\n1\n5\n8\n11\n17\n32';
//var input = ['3-5', '10-14', '16-20', '12-18', '15-22', '23-23', '23-23', '10-10', '14-14', '', '1', '5', '8', '11', '17', '32'];
var input = [];
var freshRanges = [];
// Only needed for part 1 -> var availableIDs = [];


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

function compareArrs(a, b) {
    return a[0] - b[0];
}

function processInput2() {
	let rangesProcessing = true;
	for (let i = 0; i < input.length; i++) {
		if (input[i] == '') {
			rangesProcessing = false;
		} else if (rangesProcessing) {
			let tempArr = input[i].split('-');
			freshRanges.push([Number(tempArr[0]), Number(tempArr[1])]);
		}
	}
	
	freshRanges.sort(compareArrs);
	console.log('Sorting finished');
}

// Get solution (part 2)
getInput().then(function () {
	processInput2();
	console.log('Input has been processed & sorted');

	let cleanedRangeList = [];
	
	cleanedRangeList.push(freshRanges[0]);
	
	for (let i = 1; i < freshRanges.length; i++) {
			
		// [a,b] & [c,d]
		let a = cleanedRangeList[cleanedRangeList.length - 1][0];
		let b = cleanedRangeList[cleanedRangeList.length - 1][1];
		let c = freshRanges[i][0];
		let d = freshRanges[i][1];
		
		console.log('Range [' + a + ', ' + b + '] vs [' + c + ', ' + d + ']');
		if (c > b) {
			cleanedRangeList.push(freshRanges[i]);
		} else if (c <= b && c > a && d > b) {
			console.log('Situation 2');
			cleanedRangeList[cleanedRangeList.length - 1][1] = freshRanges[i][1];
		} else if (c < b && c >= a && d <= b) {
			console.log('Situation 3');
			continue;
		} else if (c < b && c == a && d > b) {
			console.log('Situation 4');
			cleanedRangeList.pop();
			cleanedRangeList.push(freshRanges[i]);
		}
	}
	
	for (let i = 0; i < cleanedRangeList.length; i++) {
		freshIDs += (cleanedRangeList[i][1] - cleanedRangeList[i][0] + 1);
	}
	
	console.log('Solution: ' + freshIDs);
});

function processInput1() {
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
/*getInput().then(function () {
	processInput1();
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

});*/