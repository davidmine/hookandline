function main(){
	var file;
	var fileInput = document.getElementById("visualdatafile");

	if (fileInput.files.length > 0){
		file = fileInput.files[0];

		new Papa.parse(file, {
            skipEmptyLines: true,
			complete: function(results) {
                document.getElementById("outputstring").innerHTML = generateInstructions(loopGrid(results.data));
			}
		});
	}
}

function example(){
	Papa.parse("https://hookandline.davidmine.com/assets/spiderman.csv", {
		download: true,
		complete: function(results) {
			var json = JSON.stringify(results.data);
			var blob = new Blob([json], {type: "octet/stream"});
			var url = window.URL.createObjectURL(blob);
			var a = document.createElement("a");

			document.body.appendChild(a);
			a.style = "display: none";
			a.href = url;
			a.download = "spider.csv";
			a.click();
			window.URL.revokeObjectURL(url);
			//console.log(results);
		}
	});
}

/*
input : 2d array (diagonal 2d array of instruction set)
output : string (readable instruction set)
description: This function turns the diagonal path through the visual design into a readable instruction set
*/
function generateInstructions(input){
	var output = "";

	for (var iteration = 0; iteration < input.length; iteration++) {
        
		var iterationCommand = "Row " + (iteration + 1) + ": " + input[iteration].length + " pixels<br />";
		
		var currentPixel = input[iteration][0];
		var pixelCount = 1;
		for (var pixel = 1; pixel < input[iteration].length; pixel++) {
			if (currentPixel == input[iteration][pixel]){
				pixelCount++;
			}
			else {
				iterationCommand += pixelCount + " " + currentPixel + "<br />";
				currentPixel = input[iteration][pixel];
				pixelCount = 1;
			}
		}
        iterationCommand += pixelCount + " " + currentPixel + "<br /><br />";
		output += iterationCommand;
	}
	return output;
}

/*
input : 2d array (orthoginal 2d array of visual design)
output : 2d array (diagonal 2d array of instruction set)
description: This function traverses a grid diagonally. Every other diagonal row is inverted
*/
function loopGrid(input) {

	var cols = input[0].length;
	var rows = input.length;
	var output = []; // output array
	for (var k = 0; k <= cols + rows - 2; k++) {
		var rowString = "";
		
		for (var j = 0; j <= k; j++) {
			var i = k - j;
			if (i < rows && j < cols) {
				rowString += input[i][j];
			}
		}
		
		if (k % 2 != 0) {
			rowString = flipRow(rowString);
		}
        output.push(rowString);
	}
	return output;
}


/*
input : string
output : string
description: this funciton reversed a string
*/
function flipRow (input) {
	var output = "";
	
	for (var i = 0; i < input.length; i++) {
		output += input[input.length - (i + 1)]
	}
	
	return output;
}