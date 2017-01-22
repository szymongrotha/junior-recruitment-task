/**
 * Create new databse - to run it you need node.js see backend readme 
 */

var db = new PouchDB('http://localhost:5984/toDoList');

/**
 * Update database on load calling function baseUpdate()
 */

window.onload = function () {
	baseUpdate();
};

/**
 * This function saves recived data to toDoList database
 * @param {inputJs} input form text field
 * @param {counter} id of the ToDo row
 */

function addRowToBase(inputJs, counter) {
	// Checks if input is empty
	if (inputJs === '') {
		console.log('Pole nie może być puste!');
	} else {
		var doc = {
		  "_id": "row-" +counter,
		  "job": inputJs,
		  "number": counter,
		  "isDone" : false,
		};

		db.put(doc);
	}
}

/**
 * This function modifies the state of ToDo Row to 'Done' state in toDoList database 
 * @param {colId} id of the row
 */

function isDone(colId) {
	var doneId = $(colId).attr('id');
	db.get('row-'+doneId).then(function (doc) {
		doc.isDone = true;
  		return db.put(doc);
	}).then(function () {
		return db.get('row-'+doneId);
	}).then(function (doc) {
});
}

/**
 * This function modifies the state of ToDo Row to 'No done' state in toDoList database
 * @param {colId} id of the row
 */

function isNotDone(colId) {
	var doneId = $(colId).attr('id');
	db.get('row-'+doneId).then(function (doc) {
		doc.isDone = false;
  		return db.put(doc);
	}).then(function () {
		return db.get('row-'+doneId);
	}).then(function (doc) {
});
}

/**
 * This function deletes the ToDo Row from toDoList database
 * @param {jsId} id of the row
 */

function deleteRowBase(jsId) {
	console.log('Zadanie usunięte z bazy danych!');
	var rowId = $(jsId).attr('id');
	db.get('row-'+rowId).then(function (doc) {
  	doc._deleted = true;
  	return db.put(doc);

});
}

/**
 * This function updates toDoList database and (if database is not empty) calls functions updateToDo() and updateCounter() to update the Frontend
 */

function baseUpdate() {
	db.allDocs({
		include_docs: true,
	}).then(function (result) {
		var  i = result.total_rows;
		if (i > 0) {
			for (var k = 0 ; k< i; k++) {
				var row = result.rows[k].doc.number,
					job = result.rows[k].doc.job,
					isDone = result.rows[k].doc.isDone;
					updateToDo(row,job,isDone);
					updateCounter(row);
			}
		} else console.log('Zakończono update bazy - baza pusta');
	});
}
