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
(function() {
	
	//private variables
	var table = document.getElementById("studentTable");
	var usersArray = [];
	var flagUsername = 0;
	var flagEmail = 0;
	var defaultData = [
					{
						"firstName":"John",
						"middleName":"",
						"lastName":"Dox",
						"dob":"0011-11-11",
						"email":"john@mfs.com",
						"username":"johnd1",
						"password1":"qw",
						"password2":"qw"
					},
					{
						"firstName":"Jacob",
						"middleName":"Arthur",
						"lastName":"Brown",
						"dob":"0022-11-11",
						"email":"jacobab@mfs.com",
						"username":"jacobab1",
						"password1":"123",
						"password2":"123"
					},
					{
						"firstName":"Annie",
						"middleName":"A",
						"lastName":"Annonymous",
						"dob":"0022-10-01",
						"email":"annieaa@mfs.com",
						"username":"annieaa1",
						"password1":"a",
						"password2":"a"
					}
				]
	
	
	var $submitButton = $('#submitButton');
	var $iAgree = $('#iAgree');
	var $username = $('#username');
	
	/**
	* Functionality: this function is invoked when DOM is created and is used to populate form field in the beginning
	* @params: data
	* @return: null
	*/
	var populate = function(data) {
		$.each(data, function(key, value){
			$('[name='+key+']', frm).val(value);
		});
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
		row.insertCell(4).innerHTML = '<input type="button" class="btn btn-warning" name="updateButton" value="Update">';
		row.insertCell(5).innerHTML = '<input type="button" class="btn btn-danger" name="deleteButton" value="Delete">';
	};
	
	/**
	* Functionality: to check whether email is unique in database
	* @params: null 
	* @return: boolean
	*/
	var uniqueEmail = function() {
		
		//fetching current email from form field
		var $currentEmail = $('#email').val();
		console.log(usersArray);
		$.each(usersArray, function(){
			$.each(this, function(key, value){
				if(key === "email" && value === $currentEmail)
				{
					console.log(value);
					alert('This email ID is already taken!');
					return false;
				}
			});
		});
		return true;
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
			if(!uniqueEmail())
				flagEmail = 1;
			
			for(var loopIterator = 0;loopIterator < studentsNumber;loopIterator++)
			{
				if(usersArray[loopIterator].username === document.getElementById("username").value)
				{
					if(flagUsername == 0)
						return alert("This Username is already taken.");
					else
					{
						//resetting global update flag to false
						flagUsername = 0;
						return alert("Updating existing user!");
					}
				}
			}
		}
		
		//add to the user array only if it is a new entry
		if(flagUsername == 0 && flagEmail == 0)
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

		var firstName = $('#firstName').val();
		var middleName = $('#middleName').val();
		var lastName = $('#lastName').val();
		var dob = $('#dob').val();	
		var email = $('#email').val();
		var username = $('#username').val();
		var password1 = $('#password1').val();
		var password2 = $('#password2').val();

		var inputVal = new Array(firstName, middleName, lastName, dob, email, username, password1, password2);

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
		
		//calling function to update table and array data
		updateStudentTable();
		
	};
	
	
	/**
	* Functionality: check the input for the desired input pattern
	* @params: input object
	* @return: null
	*/
	var regCheck = function(object){
		
		var $messages = $('#messages');
		var $object = $(object);
		
		var alphaReg = /^[A-Za-z]+$/;
		var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var alphaNumericReg = /^[a-z0-9]+$/i;
		
		
		var inputType = $object.attr('type');
		var inputId = $object.attr('id');
		var inputValue = $object.val();
		
		
		
		if( inputType === "text" && ((inputId !== "middleName") && (inputId !== "username")) && !alphaReg.test(inputValue) )
		{
			$messages.after('<span class="error"> Letters only!</span>');
			$object.focus();
			return;
		}
		else if( inputId === "middleName" && inputValue !== "" && !alphaReg.test(inputValue) )
		{
			$messages.after('<span class="error"> Letters only!</span>');
			$object.focus();
			return;
		}
		else if( inputId === "username" && !alphaNumericReg.test(inputValue) )
		{
			$messages.after('<span class="error"> Letters and Numbers only!</span>');
			$object.focus();
			return;
		}
		else if( inputType == "email" && !emailReg.test(inputValue) )
		{
			$messages.after('<span class="error"> Please enter a valid email address.</span>');
			$object.focus();
			return;
		}
		else if( inputType == "password" && inputId === "password2")
		{
			if ($('#password1').val() !== $('#password2').val())
			{
				$messages.after('<span class="error"> Password must be same!</span>');
				$object.focus();
				return;
			}
		}
	};

	
	/**
	* Functionality: to add a row to the table
	* @params: Number index  the index of the entry to be updated
	* @return: String
	*/
	var updateEntry = function(index) {
		
		var form = document.forms["registrationForm"];
		var formFields = ['firstName', 'middleName', 'lastName', 'dob', 'email', 'username', 'password1', 'password2'];
		
		//populating the form fields with the usersArray values
		form.firstName.value = usersArray[index - 1].firstName;
		form.middleName.value = usersArray[index - 1].middleName;
		form.lastName.value = usersArray[index - 1].lastName;
		form.dob.value = usersArray[index - 1].dob;	
		form.email.value = usersArray[index - 1].email;
		form.username.value = usersArray[index - 1].username;
		form.password1.value = usersArray[index - 1].password1;
		form.password2.value = usersArray[index - 1].password2;
		
		//setting global flag for update to true
		flagUsername = 1;
		
		//checking if the username is changed or not	
		$submitButton.click(function(){
			if(usersArray[index - 1].username === document.getElementById("username").value && uniqueEmail() )
			{
				//storing the other form fields in usersArray
				usersArray[index - 1].firstName = form.firstName.value;
				usersArray[index - 1].middleName = form.middleName.value;
				usersArray[index - 1].lastName = form.lastName.value;
				usersArray[index - 1].dob = form.dob.value;
				usersArray[index - 1].email = form.email.value;
				usersArray[index - 1].username === document.getElementById("username").value;
				usersArray[index - 1].password1 = form.password1.value;
				usersArray[index - 1].password2 = form.password2.value;
				
				//updating the row of the table
				table.rows[index].cells[0].innerHTML = usersArray[index - 1].username;
				table.rows[index].cells[1].innerHTML = usersArray[index - 1].firstName;
				table.rows[index].cells[2].innerHTML = usersArray[index - 1].lastName;
				table.rows[index].cells[3].innerHTML = usersArray[index - 1].dob;
			}	
		});
	};
	

	/**
	* Functionality: this ready function is invoked when the DOM has been created
	* @params: null
	* @return: null
	*/
	$(function(){
		
		
		//Records are pushed to the table from an array of objects in local when window is loaded
		//$(window).on("load", function() {
	
			for(var iterator = 0; iterator < defaultData.length; iterator++) {
				studentsNumber = usersArray.length;
				usersArray.push(defaultData[iterator]);
				addRow();
			}
		//});
		
		
		//functionalities for input fileds except reset and button
		$("#registrationForm :input:not(:reset):not(:button)").on({
			focus: function(){
				$(this).css("background-color", "#ffff99");
			}, 
			blur: function(){
				$(this).css("background-color", "#ffffff");
			},
			change: function(){
				$("span").html("");
				regCheck(this);
			}

		});
		
		//keeping i agree checked by default and submit enabled
		$iAgree.attr('checked', true);
		$submitButton.removeAttr('disabled');
		
		//to enable/disable submit on check/uncheck of i agree
		$iAgree.on({
			change: function(){
				if($(this).is(':checked'))
					$submitButton.removeAttr('disabled');
				else
					$submitButton.attr('disabled', 'disabled');
			}
		});
		
		//to validate the form on click of submit
		$submitButton.on({
			click: function(){
				emptyCheck();   
			}
		});
		
		//to clear error messages and disable submit button on click of reset
		$('#resetButton').click(function(){
			$("span").html("");
			$iAgree.attr('checked', false);
			$submitButton.attr('value', 'Add');
			$submitButton.attr('disabled', 'disabled');
			$username.removeAttr('disabled');
		});
		
		//deleting the table row and data from usersArray[] on click of delete
		$('#studentTable').on("click", 'input.btn.btn-danger', function(e){
			
			e.preventDefault();
			
			if(confirm('Are you sure you want to delete this entry?')){
				
				var rowIndex = $(this).parents('tr').index();
				
				//checking if the row to be deleted is in the form fields entry, if yes, the form is reset
				var currentUsername = $(this).parents('tr').find('td').html();
				if(currentUsername === document.getElementById("username").value)
				{
					$('#registrationForm').trigger("reset");
					$submitButton.attr('value', 'Add');
					$username.removeAttr('disabled');
				}
				//removing user object from usersArray
				usersArray.splice(rowIndex - 1, 1);
				
				//removing entry from the table
				$(this).parents('tr').remove();
			
			
				console.log(usersArray);
			}

		});
		
		//updating the button label of submit button to Update on click of update
		$('#studentTable').on('click', 'input.btn.btn-warning', function(){
			
			var rowIndex = $(this).parents('tr').index();
			
			$iAgree.attr('checked', true);
			$submitButton.attr('value', 'Update');
			$submitButton.removeAttr('disabled');
			$username.attr('disabled', 'disabled');
			
			//function call to update the entry
			updateEntry(rowIndex);
			
			console.log(usersArray);
		});
		
		
	});
})();