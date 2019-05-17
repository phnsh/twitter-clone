function displaySignUp() {
	document.getElementById("signup").style.display="block";
}

function displayLogIn() {
	document.getElementById("login").style.display="block";
}

function closeDialog() {
	document.getElementById("signup").style.display="none";
	document.getElementById("login").style.display="none";
}

var validateUsername = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	if(form.length < 5) {
		//smg.submitButtonEnabled = false;
		isItTrue.someval1(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		//isItTrue.someval1.call(smg);
		isItTrue.someval1(submitButtonEnabled);
		document.querySelector("#signupform > button").disabled = false;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	enableSubmit(isItTrue.getSomeVal1());
}

var validateEmail = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	if(form.length < 5) {
		isItTrue.someval2(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
		isItTrue.someval2(submitButtonEnabled);
	}
	enableSubmit();
}

var validatePassword = function(inputType, displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var form = document.forms["signupform"][inputType].value;
	var password = document.querySelector("#signupform input:nth-child(5)").value;
	var confirm = document.querySelector("#signupform input:nth-child(7)").value;
	if(form.length < 8) {
		isItTrue.someval3(submitButtonEnabled);
		valildateAll(displayWarning, nthChild);
	}
	else {
		submitButtonEnabled = true;
		isItTrue.someval3(submitButtonEnabled);
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	
	enableSubmit();
}

var confirmPassword = function(displayWarning, nthChild) {
	let submitButtonEnabled = false;
	var password = document.querySelector("#signupform input:nth-child(5)").value;
	var confirm = document.querySelector("#signupform input:nth-child(7)").value;
	if(confirm.length < 8) {
		isItTrue.someval4(submitButtonEnabled);
		valildateAll("Password should be more than 8 characters long", nthChild);
	}
	else {
		submitButtonEnabled = true;
		isItTrue.someval4(submitButtonEnabled);
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
	}
	
	if(confirm !== password) {
		isItTrue.someval4(false);
		valildateAll("Passwords not matching", nthChild);
	}
	else {
		submitButtonEnabled = true;
		document.querySelector("#signupform span:nth-child(" + nthChild + ")").innerHTML = '';
		isItTrue.someval4(submitButtonEnabled);
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
	value1 = false;
	value2 = false;
	value3 = false;
	value4 = false;
	return {
		someval1: function(val) {
			value1 = val;
		},
		getSomeVal1: function() {
			return value1;
		},
		someval2: function(val) {
			value2 = val;
		},
		getSomeVal2: function() {
			return value2;
		},
		someval3: function(val) {
			value3 = val;
		},
		getSomeVal3: function() {
			return value3;
		},
		someval4: function(val) {
			value4 = val;
		},
		getSomeVal4: function() {
			return value4;
		}
	}
}();

function enableSubmit() {
	if(isItTrue.getSomeVal1() && isItTrue.getSomeVal2() && isItTrue.getSomeVal3() && isItTrue.getSomeVal4()) {
		document.querySelector("#signupform button").disabled = "false";
		document.querySelector("#signupform button").style.cursor = "pointer";
		document.querySelector("#signupform button").style.background = "#1DABDD";
	}
	else {
		document.querySelector("#signupform button").disabled = "true";
		document.querySelector("#signupform button").style.cursor = "default";
		document.querySelector("#signupform button").style.background = "lightgrey";
	}
}

let loginUser = function(event) {
	event.preventDefault();
	let username = document.forms["signinform"]["username"].value;
	let password = document.forms["signinform"]["password"].value;

	if(username === '' || password === '') {
		document.querySelector("#loginMessage").style.color = "red";
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
					document.querySelector("#loginMessage").style.color = "#32CD32";
					document.querySelector("#loginMessage").innerHTML = "Login successful";				
				}
				else {
					document.querySelector("#loginMessage").style.color = "red";
					document.querySelector("#loginMessage").innerHTML = "There might be login issues or your username/password is incorrect";
				}
			});
	}
}