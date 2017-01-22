/**
 * Global variables and event listeners
 */

var jsPlus = document.getElementById('plus-icon');
var counter = 0;
var inputJsField = document.getElementById('text-input');
jsPlus.addEventListener('click', addRow);
inputJsField.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addRow();
    }
});

/**
 * This function adds new ToDo row and calls function addRowToBase() from app.js
 */

function addRow() {
	var	inputJs = inputJsField.value,
		line1 = '<tr id="' +counter+ '" class="row no-done">',
		line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)"></td>',
		line3 = '<td class="col-2 border-color"></td>',
		line4 = '<td class="col-3">' +inputJs+ '<img id="trash-ico" src="img/trash.png" alt="trash icon" onclick="deleteRow(this)"></td>',
		line5 = '</tr>';
		// Checks if input is empty - if it is throws an alert
		if (inputJs === '') { 
			alert('Pole nie może być puste!');
		} else {
			addRowToBase(inputJs, counter);
			counter++;
			$(line1 + line2 + line3 + line4 + line5).insertAfter('.main-row');
			$('#text-input').val('');
		}	
}

/**
 * This function gets the state of Checkbox change the class to correct one, and calls function isDone() or isNotDone() from app.js
 * @param {checkbox} Checbox status 
 */

function checkStatus(checkbox) {
	var colId = $(checkbox).closest('tr');

	if (checkbox.checked) {
		$(colId).addClass("is-done");
		$(colId).removeClass("no-done");
		isDone(colId);

	} else {
		$(colId).removeClass("is-done");
		$(colId).addClass("no-done");
		isNotDone(colId);
	}
}

/**
 * This function deletes ToDo row, and calls function deleteRowBase() from app.js
 * @param {trash} on clicked trash icon
 */

function deleteRow(trash) {
	var jsId = $(trash).closest('tr');
	deleteRowBase(jsId);
	$(jsId).remove();
}

/**
 * This function updates ToDo rows by the data recived from toDoList database
 * @param {row} id from database
 * @param {job} job from database
 * @param {isDone} job status from database
 */

function updateToDo(row,job,isDone) {
	var counter = row,
		inputJs = job,
		line3 = '<td class="col-2 border-color"></td>',
		line4 = '<td class="col-3">' +inputJs+ '<img id="trash-ico" src="img/trash.png" alt="trash icon" onclick="deleteRow(this)"></td>',
		line5 = '</tr>';

			if (isDone === false ) {
				line1 = '<tr id="' +counter+ '" class="row no-done">',
				line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)"></td>';
			} else {
				line1 = '<tr id="' +counter+ '" class="row is-done">',
				line2 = '<td class="col-1 border-color"><input id="check" name="check" type="checkbox" onchange="checkStatus(this)" checked></td>';
			}
		
	$(line1 + line2 + line3 + line4 + line5).insertAfter('.main-row');
}

/**
 * This function updates couter from database
 * @param {row} id from database
 */

function updateCounter(row) {
	counter = row,
	counter = counter + 1;
}
