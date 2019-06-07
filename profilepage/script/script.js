var urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/tweets",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following",
"https://fsd1.herokuapp.com/users/1/followers"];

resolveData(...urls);

//function to accept destructured array of any lenght and send it to resolve() to get it resolved
async function resolveData(...urls) {
	let result = await resolve(...urls);
}

//function to receive the urls for futher processing
async function resolve(...urls) {
	let fetchData = await urls.map(url => fetch(url).then(d => d.json())
		.catch(function() {
			document.documentElement.innerHTML = '';
			document.body.style.color = "#ff0000";
			document.body.innerHTML = "404 error. URLs are not loading at the moment.";
		}));
	let result = Promise.all(fetchData).then(res => resolvedUrls.call(res)); //sent to resolvedUrls()
	result.then(res => acceptURLs.call(res)); //resolved data in the form of an array
}

//URLs get resolved here
function resolvedUrls() {
	return this;
}

let acceptURLs = function() {
	updateUserInfo.apply(this[0]);
	tweetContent.apply(this[1]);
	updateSuggestions.apply(this[2]);
	followingContent.apply(this[3]);
	followersContent.apply(this[4]);
}

let updateUserInfo = function() {
	let data = this.data;
	querySelectorImg(".coverProfilePhoto img", data.profile_img);
	querySelectorInnerHTML(".personalInfo span:nth-child(1)", data.full_name);
	querySelectorInnerHTML(".personalInfo span:nth-child(3)", "@" + data.user_name);
	querySelectorInnerHTML(".personalInfo span:nth-child(4)", data.user_bio);

	querySelectorInnerHTMLAll(".personalInfodata", data.user_from, 0);
	querySelectorInnerHTMLAll(".personalInfodata", data.user_website, 1);
	querySelectorInnerHTMLAll(".personalInfodata", "Joined " + dataConv(data.user_created_at), 2);
	querySelectorInnerHTMLAll(".personalInfodata", dataConv(data.user_birthday), 3);

	querySelectorInnerHTMLAll(".bannerMetaNumbers", data.stats.tweets, 0);
	querySelectorInnerHTMLAll(".bannerMetaNumbers", data.stats.following, 1);
	querySelectorInnerHTMLAll(".bannerMetaNumbers", data.stats.followers, 2);

}

let updateSuggestions = function() {
	let data = this.data;
	let div = '';
	let leftmidmid = document.querySelector(".leftmidmid");
	for(var i = 0; i < data.length && i < 3; i++) {
		div = `${div} <div class="smallicons">
						<div class="ppimage">
							<img src="${data[i].profile_img}">
						</div>
							<div>
								<span id="username">
									${data[i].full_name}
								</span>
								<span id="handle">
									@${data[i].user_name}
								</span>
								<br>
								<button id="smallFollowButton">Follow</button>
							</div>
						</div>
					</div>`;
	}
	leftmidmid.innerHTML = div;
}

let tweetContent = function() {
	let data = this.data;
	let div = '';
	let rightbottom = document.querySelector(".rightbottom");
	for(var i in data) {
		div = `${div} <div class="indposts">
						<div class="ppimage">
							<img src="${data[i].user.profile_img}"">
						</div>
						<div class="postcontent">
							<div class="namehandle">
								<span>${data[i].user.full_name}</span>
								<span>@${data[i].user.user_name} &#8901</span>
								<span>5m</span>
								<span></span>
							</div>
							<div class="tweetbody">
								<span>
								${data[i].text}
								</span>
							</div>
							<div class="postInteractions">
								<div class="comments">
									<img src="img/replies.png">
									<span>${data[i].stats.comments}</span>
								</div>
								<div class="likes">
									<img src="img/likes.png">
									<span>${data[i].stats.likes}</span>
								</div>
								<div class="retweets">
									<img src="img/retweets.png">
									<span>${data[i].stats.retweets}</span>
								</div>
							</div>
						</div>
					</div>`;
	}
	rightbottom.innerHTML = div;
}

let followingContent = function() {
	let data = this.data;
	let div = '';
	let followingCards = document.querySelector(".followingCardsContainer");
	for(var i in data) {
		div = `${div} <div class="followingCards">
					<div>
						<div class="followingCardsBanner"><img src="${data[i].cover_img}"></div>
						<div class="profilepic">
							<img src="${data[i].profile_img}">
							<div class="cardMeta">
								<div class="userMeta">
									<span>${data[i].full_name}</span>
									<span>@${data[i].user_name}</span>
								</div>
							</div>
						</div>
					</div>
					<span class="userBio">${data[i].user_bio}</span>
				</div>`;
	}
	followingCards.innerHTML = div;
}

let followersContent = function() {
	let data = this.data;
	let div = '';
	let followerCards = document.querySelector(".followersCardsContainer");
	for(var i in data) {
		div =`${div} <div class="followers">
				<div class="followingCardsBanner"><img src="${data[i].cover_img}"></div>
					<div class="profilepic">
					<img src="${data[i].profile_img}">
					<div class="cardMeta">
						<div class="userMeta">
							<span>${data[i].full_name}</span>
							<span>@${data[i].user_name}</span>
						</div>
					</div>
				</div>
			
			<span class="userBio">${data[i].user_bio}</span>
		</div>`;
	}
	followerCards.innerHTML = div;
}

function querySelectorInnerHTML(target, data) {
	let container = document.querySelector(target);
	container.innerHTML = data;
}

function querySelectorImg(target, data) {
	let container = document.querySelector(target);
	container.src = data;
}

function querySelectorInnerHTMLAll(target, data, index) {
	let container = document.querySelectorAll(target)[index];
	container.innerHTML = data;
}

function dataConv(UTCSeconds) {
	let date = new Date(UTCSeconds);
	let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = months[date.getMonth() + 1];
	let day = date.getDate();
	let year = date.getFullYear();
	return `${day} ${month} ${year}`;
}

let mediaSquare = function() {
	let photosAndVideos = document.querySelector(".photosAndVideos");
	div = '';
	for(var i = 0; i < 9; i++) {
		var div = `${div} <div class="mediaSquare"></div>`;
	}
	photosAndVideos.innerHTML = div;
}

let saveEditProfile = function(event) {
	event.preventDefault();
	
	let fullname = document.forms["editProfileForm"]["fullname"].value;
	let email = document.forms["editProfileForm"]["email"].value;
	let location = document.forms["editProfileForm"]["location"].value;
	let url = document.forms["editProfileForm"]["url"].value;
	let birthday = document.forms["editProfileForm"]["birthday"].value;
	
	if(fullname === '' || email === '' || location === '' || url === '') {
		document.querySelector(".modalContent > div > span:nth-child(2)").style.color = "#DD4247";
		document.querySelector(".modalContent > div > span:nth-child(2)").innerHTML = "Fields cannot be empty";
	}

	else {
		document.querySelector("#editProfileForm div:nth-child(8) button:nth-child(2)").disabled = true;
		document.querySelector("#editProfileForm div:nth-child(8) button:nth-child(2)").style.backgroundColor = 'lightgrey';
		document.querySelector("#editProfileForm div:nth-child(8) button:nth-child(2)").style.cursor = 'default';
		let user = {
				user_name: fullname,
				user_email: email,
				user_birthday: "45345432",
				user_from: location,
				user_website: url
			};
	
		var resp = fetch("https://fsd1.herokuapp.com/users/4/profile",
				{
					method:'PUT',
					headers: {'Content-Type':'application/json'},
					body:JSON.stringify(user)
				});
	
		resp.then(data => data.json()).then(function(response) {
			if(response.status === "success") {
				document.querySelector(".modalContent > div > span:nth-child(2)").innerHTML = "Update Successful";
				document.querySelector("#editProfileForm div:nth-child(8) button:nth-child(1)").innerHTML = "Exit";
				setTimeout(function() {document.querySelector(".modalContent > div > span:nth-child(2)").innerHTML = '';}, 5000);
			}
			else {
				document.querySelector(".modalContent > div > span:nth-child(2)").style.color = "#DD4247";
				document.querySelector(".modalContent > div > span:nth-child(2)").innerHTML = "500 (Internal Server Error) - Please make sure the below entered credentials are not duplicate";	
			}
		});
	}
}

mediaSquare();