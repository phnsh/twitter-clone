//sessionStorage.setItem('key', 'value');
//let data = sessionStorage.getItem('key'); //value

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
	enableSubmit();
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
			document.querySelector("#signupMessage").style.color = "#32CD32";
			document.querySelector("#signupMessage").innerHTML = "Signed up successfully";
		}
		else {
			document.querySelector("#signupMessage").style.color = "red";
			document.querySelector("#signupMessage").innerHTML = "User already exists";
		}
	});
}

let loginUser = function(event) { //userid: anonymous@anon.com, pw: qwertyuiop
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
					setTimeout(function() {window.location.href = '/homepage/homepage.html'}, 2000);		
				}
				else {
					document.querySelector("#loginMessage").style.color = "red";
					document.querySelector("#loginMessage").innerHTML = "There might be login issues or your username/password is incorrect";
				}
			});
	}
}