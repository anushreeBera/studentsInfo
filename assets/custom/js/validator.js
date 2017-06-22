/*
Creation date: 16-6-2017
Purpose:  adding validations to the HTML page registration_form.html created in Bootstrap
File Path: /studentsInfo-Bootstrap/assets/custom/js/validator.js
Created By : Anushree.
*/

/**
* Functionality: this is the wrapper function that wraps all the utility as well as ready function
* @params: null 
* @return: null
*/
(function($, window, document) {
	
	//private variables
	var table = document.getElementById("studentTable");
	var usersArray = [];
	var flag = 0;
	
	/**
	* Functionality: to delete a row from the table
	* @params: DOM button
	* @return: null
	*/
	var deleteRow = function(button) {
		
		//finding the row index of the button
		index = arguments[0].parentNode.parentNode.rowIndex;
		
		//deleting the object from usersArray
		usersArray.splice(index - 1, 1);
		
		//deleting the row entry from the table
		table.deleteRow(index);
	};
	
	
	
	/**
	* Functionality: to add a row to the table
	* @params: null 
	* @return: null
	*/
	var addRow = function() {
		

		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount);
	
		//adding a row to the table
		row.insertCell(0).innerHTML = usersArray[studentsNumber].username;
		row.insertCell(1).innerHTML = usersArray[studentsNumber].firstName;
		row.insertCell(2).innerHTML = usersArray[studentsNumber].lastName;
		row.insertCell(3).innerHTML = usersArray[studentsNumber].dob;
		row.insertCell(4).innerHTML = '<input type="button" class="btn btn-warning" id="updateButton" value="Update" onclick="updateEntry(this)">';
		row.insertCell(5).innerHTML = '<input type="button" class="btn btn-danger" id="deleteButton" value="Delete">';
	};
	
	/**
	* Functionality: update student table to update the details of the students who have registered successfully
	* @params: null
	* @return: null
	*/
	var updateStudentTable = function() {
		
		studentsNumber = usersArray.length;
	
		//checking if the username already exists
		if(studentsNumber != 0)
		{
			for(var loopIterator = 0;loopIterator < studentsNumber;loopIterator++)
			{
				if(usersArray[loopIterator].username === document.getElementById("username").value)
				{
					if(flag == 0)
						return alert("This Username is already taken.");
					else
					{
						//resetting global update flag to false
						flag = 0;
					
						return alert("Updating existing user!");
					}
				}
			}
		}
		
		//add to the user array only if it is a new entry
		if(flag == 0)
		{
			//catching form data in an array, userObj and pushing it in an array of objects, usersArray
			var userObj = {}
			var formCollection = document.getElementById("registrationForm").elements;
			var totalFields = formCollection.length;
			$.each(formCollection, function(index, item){
				userObj[formCollection[index].name] = formCollection[index].value;
			});	
			usersArray.push(userObj);
		
			//adding a row to the table
			addRow();
		}
	};
	
	

	
	/**
	* Functionality: empty check the entire form before submitting it
	* @params: null
	* @return: null
	*/
	var emptyCheck = function(){

		var fName = $('#firstName').val();
		var mName = $('#middleName').val();
		var lName = $('#lastName').val();
		var dob = $('#dob').val();	
		var email = $('#email').val();
		var username = $('#username').val();
		var pass1 = $('#password1').val();
		var pass2 = $('#password2').val();

		var inputVal = new Array(fName, mName, lName, dob, email, username, pass1, pass2);

		
		
		var inputMessage = new Array("first name", "middle name", "last name", "date of birth", "email address", "username", "password", "password again");
		
		$('.error').hide();
		
		for(var loopIterator = 0;loopIterator <= 7;loopIterator++)
		{
			//skipping empty check for middle name
			if(loopIterator == 1)
				continue;
			
			if(inputVal[loopIterator] == ""){
				$('#messages').after('<span class="error"> Please enter your ' + inputMessage[loopIterator] + '</span>');	
				return;
			}
		}
		if(confirm('Are you sure you want to submit it?'))
			updateStudentTable();
		
	};
	
	/**
	* Functionality: check the input for the desired input pattern
	* @params: input object
	* @return: null
	*/
	var regCheck = function(object){
		
		var alphaReg = /^[A-Za-z]+$/;
		var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var alphaNumericReg = /^[a-z0-9]+$/i;
		
		
		var inputType = $(object).attr('type');
		var inputId = $(object).attr('id');
		var inputValue = $(object).val();
		
		if( inputType === "text" && ((inputId !== "middleName") || (inputId !== "username")) && !alphaReg.test(inputValue) )
		{
			$('#messages').after('<span class="error"> Letters only!</span>');
			$(this).focus();
			return;
		}
		else if( inputId === "middleName" && inputValue !== "" && !alphaReg.test(inputValue) )
		{
			$('#messages').after('<span class="error"> Letters only!</span>');
			$(this).focus();
			return;
		}
		else if( inputId === "username" && !alphaNumericReg.test(inputValue) )
		{
			$('#messages').after('<span class="error"> Letters and Numbers only!</span>');
			$(this).focus();
			return;
		}
		else if( inputType == "email" && !emailReg.test(inputValue) )
		{
			$('#messages').after('<span class="error"> Please enter a valid email address.</span>');
			$(this).focus();
			return;
		}
		else if( inputType == "password" && inputId === "password2")
		{
			if( $(this).prev().val() === inputValue)
			{
				$(this).focus();
				$('#messages').after('<span class="error"> Password must be same!</span>');
				return;
			}
		}
	};
	
	

	/**
	* Functionality: this ready function is invoked when the DOM has been created
	* @params: null
	* @return: null
	*/
	$(function(){
		
		//functionalities for input fileds except reset and button
		$("#registrationForm :input:not(:reset):not(:button)").on({
			focus: function(){
				$(this).css("background-color", "#ffff99");
			}, 
			blur: function(){
				$(this).css("background-color", "#ffffff");
			},
			change: function(){
				regCheck(this);
			}

		});
		
		//delete a row on click of delete
		$('#deleteButton').click(function(){
			deleteRow(this);
		});
		

		//to enable/disable submit on check/uncheck of i agree
		$('#iAgree').on({
			click: function(){
				if($(this).is(':checked'))
					$('#submitButton').removeAttr('disabled');
				else
					$('#submitButton').attr('disabled', 'disabled');
			}
		});
		
		//to validate the form on click of submit
		$('#submitButton').on({
			click: function(){
				emptyCheck();   
			}
		});
		
		//to clear error messages and disable submit button on click of reset
		$('#resetButton').click(function(){
			$("span").html("");
			$('#submitButton').attr('disabled', 'disabled');
		});
		
		
	});
}(window.jQuery, window, document));

/*
function validateForm() {

    var nameReg = /^[A-Za-z]+$/;
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var alphaNumericReg = /^[a-z0-9]+$/i;
	
	//fetching form elements in an array
	var formCollection = document.getElementById("registrationForm").elements;
	var totalFields = formCollection.length;
	
    var fName = $('#firstName').val();
    var mName = $('#middleName').val();
	var lName = $('#lastName').val();
	var dob = $('#dob').val();	
	var email = $('#email').val();
    var username = $('#username').val();
    var pass1 = $('#password1').val();
    var pass2 = $('#password2').val();

    var inputVal = new Array(fName, mName, lName, dob, email, username, pass1, pass2);

    var inputMessage = new Array("first name", "middle name", "last name", "date of birth", "email address", "username", "password", "password again");

    $('.error').hide();

    if(inputVal[0] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[0] + '</span>');	
		return;
    } 
    else if(!nameReg.test(inputVal[0])){
        $('#messages').after('<span class="error"> Letters only!</span>');
		return false;
    }

	if( (inputVal[1] != "") && !nameReg.test(inputVal[1]) ){
        $('#messages').after('<span class="error"> Letters only!</span>');
		return false;
    }

    if(inputVal[2] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[2] + '</span>');
		return false;
    }
	else if(!nameReg.test(inputVal[2])){
        $('#messages').after('<span class="error"> Letters only!</span>');
		return false;
    }
		
	if(inputVal[3] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[3] + '</span>');
		return false;
    }
		
	if(inputVal[4] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[4] + '</span>');
		return false;
    }
    else if(!emailReg.test(inputVal[4])){
		$('#messages').after('<span class="error"> Please enter a valid ' + inputMessage[4] + '</span>');
		return false;
    }

    if(inputVal[5] == ""){
		$('#messages').after('<span class="error"> Please enter your ' + inputMessage[5] + '</span>');
		return false;
    } 
    else if(!alphaNumericReg.test(inputVal[5])){
        $('#messages').after('<span class="error"> Letters and Numbers only!</span>');
		return false;
    }

    if(inputVal[6] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[6] + '</span>');
		return false;
    }
		
	if(inputVal[7] == ""){
        $('#messages').after('<span class="error"> Please enter your ' + inputMessage[7] + '</span>');
		return false;
    }
	else if(inputVal[6] != inputVal[7]){
        $('#messages').after('<span class="error"> Password must be same!</span>');
		return false;
    }

		
}
*/ 