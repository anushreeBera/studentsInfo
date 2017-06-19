/*
Creation date: 16-6-2017
Purpose:  adding validations to the HTML page registration_form.html created in Bootstrap
File Path: /studentsInfo-Bootstrap/assets/custom/js/validator.js
Created By : Anushree.
*/
(function($, window, document) {

	//ready function
	$(function(){
		
		alert("Hello, student.");

		//to enable/disable submit on check/uncheck of i agree
		$(function(){
			$('#iAgree').click(function() {
				if ($(this).is(':checked')) {
					$('#submitButton').removeAttr('disabled');

				}
				else {
					$('#submitButton').attr('disabled', 'disabled');
				}
			});
		});
		
		//to validate the form on click of submit
		$(function(){
			$('#submitButton').click(function(){
				validateForm();   
			});
		});
		
		//to clear error messages and disable submit button on click of reset
		$(function(){
			$('#resetButton').click(function(){
				$("span").html("");
				$('#submitButton').attr('disabled', 'disabled');
			});
		});
		
		
	});
}(window.jQuery, window, document));

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
		return false;
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
