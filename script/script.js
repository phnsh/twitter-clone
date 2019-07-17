//sessionStorage.setItem('key', 'value');
//let data = sessionStorage.getItem('key'); //value

function displaySignUp() {
	document.querySelector("#signupMessage").innerHTML = '';
	document.forms["signupform"]["username"].value = '';
	document.forms["signupform"]["email"].value = '';
	document.forms["signupform"]["password"].value = '';
	document.getElementById("signup").style.display="block";
}

function displayLogIn() {
	document.querySelector("#loginMessage").innerHTML = '';
	document.forms["signinform"]["username"].value = '';
	document.forms["signinform"]["password"].value = '';
	document.getElementById("login").style.display="block";
}

function closeDialog(closeForm) {
	document.getElementById(closeForm).style.display="none";
}

var validateUsername = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	if(form.length < 5) {
		//smg.submitButtonEnabled = false;
		isItTrue.setUsernameValid(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		//isItTrue.someval1.call(smg);
		isItTrue.setEmailValid(submitButtonEnabled);
		document.querySelector("#signupform > button").disabled = false;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	enableSubmit(isItTrue.setUsernameValid());
}

var validateEmail = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	if(form.length < 5) {
		isItTrue.setEmailValid(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
		isItTrue.setEmailValid(submitButtonEnabled);
	}
	enableSubmit();
}

var validatePassword = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	var password = document.querySelector("#signupform input:nth-child(5)").value;
	var confirm = document.querySelector("#signupform input:nth-child(7)").value;
	if(form.length < 8) {
		isItTrue.setPasswordValid(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		isItTrue.setPasswordValid(submitButtonEnabled);
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	
	enableSubmit();
}

var confirmPassword = function(displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var password = document.querySelector("#signupform input:nth-child(5)").value;
	var confirm = document.querySelector("#signupform input:nth-child(7)").value;
	if(confirm.length < 8) {
		isItTrue.setConfirmPasswordValid(submitButtonEnabled);
		valildateAll("Password should be more than 8 characters long", nthChild);
	}
	else {
		submitButtonEnabled = true;
		isItTrue.setConfirmPasswordValid(submitButtonEnabled);
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	enableSubmit();
	if(confirm !== password) {
		isItTrue.setConfirmPasswordValid(false);
		valildateAll("Passwords not matching", nthChild);
	}
	else {
		submitButtonEnabled = true;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
		isItTrue.setConfirmPasswordValid(submitButtonEnabled);
	}
	enableSubmit();
}

function valildateAll(displayWarning, nthChild) {
	//document.getElementsByClassName("modal_heading")[0].innerHTML = displayWarning;
	document.querySelector("#signupform span:nth-child(" + nthChild + ")").style.color = "red";
	document.querySelector("#signupform span:nth-child(" + nthChild + ")").style.fontSize = "13px";
	document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = displayWarning;
}

let isItTrue = function() {
	isUsernameValid = false;
	isEmailValid = false;
	isPasswordValild = false;
	isConfirmPasswordValid = false;
	return {
		setUsernameValid: function(val) {
			isUsernameValid = val;
		},
		getUsernameValid: function() {
			return isUsernameValid;
		},
		setEmailValid: function(val) {
			isEmailValid = val;
		},
		getEmailValid: function() {
			return isEmailValid;
		},
		setPasswordValid: function(val) {
			isPasswordValild = val;
		},
		getPasswordValid: function() {
			return isPasswordValild;
		},
		setConfirmPasswordValid: function(val) {
			isConfirmPasswordValid = val;
		},
		getConfirmPasswordValid: function() {
			return isConfirmPasswordValid;
		}
	}
}();

function enableSubmit() {
	if(isItTrue.getUsernameValid && isItTrue.getEmailValid() && isItTrue.getPasswordValid() && isItTrue.getConfirmPasswordValid()) {
		document.querySelector("#signupSubmit").disabled = false;
		document.querySelector("#signupSubmit").style.cursor = "pointer";
		document.querySelector("#signupSubmit").style.background = "#1DABDD";
	}
	else {
		document.querySelector("#signupSubmit").disabled = true;
		document.querySelector("#signupSubmit").style.cursor = "default";
		document.querySelector("#signupSubmit").style.background = "lightgrey";
	}
}

let signupUser = function(event) { //un: user_name1, email: user_name12@gmail.com, pw: pass12
	event.preventDefault();
	let username = document.forms["signupform"]["username"].value;
	let email = document.forms["signupform"]["email"].value;
	let password = document.forms["signupform"]["password"].value;

	let user = {user_name: username, user_email: email, user_pass: password};
	var init = {
		method: "POST",
		body: JSON.stringify(user),
		headers: {'Content-Type':'application/json'}
	}
	var resp = fetch('https://fsd1.herokuapp.com/users/create', init);
	resp.then(data => data.json()).then(function(response) {
		if(response.status === "success") {
			//console.log(response);
			//response.data.userId;
			//sessionStorage.set("userId", response.data.userId); //future feature
			document.querySelector("#signupMessage").style.color = "#32CD32";
			document.querySelector("#signupMessage").innerHTML = "Signed up successfully";
		}
		else {
			document.querySelector("#signupMessage").style.color = "#ff0000";
			document.querySelector("#signupMessage").innerHTML = "User already exists";
		}
	});
}

let loginUser = function(event) { //userid: anonymous@anon.com, pw: qwertyuiop
	event.preventDefault();
	document.querySelector("#loginButton").disabled = true;
	document.querySelector("#loginButton").style.background = 'lightgrey';
	document.querySelector("#loginButton").style.cursor = "default";
	let username = document.forms["signinform"]["username"].value;
	let password = document.forms["signinform"]["password"].value;
	
	if(username === '' || password === '') {
		document.querySelector("#loginMessage").style.color = "#ff0000";
		document.querySelector("#loginMessage").innerHTML = "Fields cannot be left empty";
	}
	else {
		document.querySelector("#loginMessage").innerHTML = '';
		let user = {user_email: username, user_pass: password};
		var init = {
			method: "POST",
			body: JSON.stringify(user)
		}
		var resp = fetch('https://fsd1.herokuapp.com/users/login',
			{
				method:'POST',
				headers: {'Content-Type':'application/json'},
				body:JSON.stringify(user)
			});
			resp.then(data => data.json()).then(function(response) {
				if(response.status === 'success') {
					//console.log(response);
					document.querySelector("#loginMessage").style.color = "#32CD32";
					document.querySelector("#loginMessage").innerHTML = response.message;
					setTimeout(function() {window.location.href = '/homepage/homepage.html'}, 2000);		
				}
				else {
					document.querySelector("#loginMessage").style.color = "#ff0000";
					document.querySelector("#loginMessage").innerHTML = "There might be login issues or your username/password is incorrect";
				}
			});
	}
}