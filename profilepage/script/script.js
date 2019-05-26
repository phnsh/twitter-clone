var urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/tweets",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following"];

resolveData(...urls);

//function to accept destructured array of any lenght and send it to resolve() to get it resolved
async function resolveData(...urls) {
	let result = await resolve(...urls);
}

//function to receive the urls for futher processing
function resolve(...urls) {
	let fetchData = urls.map(url => fetch(url).then(d => d.json()));
	let result = Promise.all(fetchData).then(res => resolvedUrls.call(res)); //sent to resolvedUrls()
	result.then(res => acceptURLs.call(res)); //resolved data in the form of an array
}

//URLs get resolved here
function resolvedUrls() {
	return this;
}

let acceptURLs = function() {
	console.log(this[0].data);
	spreadUserData(this[0].data);
	tweetContent.apply(this[1]);
	updateSuggestions.apply(this[2]);
	followingContent.apply(this[3]);
}

let spreadUserData = function(arr) {
	var rawData = arr;
	let user = new User(rawData.id, rawData.profile_img, rawData.cover_img, rawData.full_name,
		rawData.user_bio, rawData.user_name, rawData.user_email, rawData.following,
		rawData.user_birthday, rawData.user_created_at, rawData.user_from, rawData.user_website);
	let stats = new Stats(rawData.stats.tweets, rawData.stats.followers, rawData.stats.following);
	updateUserInfo(user, stats);
}

class User {
	constructor(id, profile_img, cover_img, full_name, user_bio, user_name, user_email, following, user_birthday, user_created_at, user_from, user_website) {
		this._id = id;
		this._profile_img = profile_img; 
		this._cover_img = cover_img;
		this._full_name = full_name;
		this._user_bio = user_bio;
		this._user_name = user_name;
		this._user_email = user_email;
		this._following = following;
		
		this._user_birthday = user_birthday;
		this._user_created_at = user_created_at;
		this._user_from = user_from;
		this._user_website = user_website;	
	}

	get id() {
		return this._id;
	}

	get profile_img() {
		return this._profile_img;
	}

	get cover_img() {
		return this._cover_img;
	}

	get full_name() {
		return this._full_name;
	}

	get user_bio() {
		return this._user_bio
	}

	get user_name() {
		return this._user_name;
	}

	get user_email() {
		return this._user_email;
	}

	get following() {
		return this._following;
	}

	get user_birthday() {
		return this._user_birthday;
	}

	get user_created_at() {
		return this._user_created_at;
	}

	get user_from() {
		return this._user_from;
	}

	get user_website() {
		return this._user_website;
	}
}

class Stats {
	constructor(tweets, followers, following) {
		this._tweets = tweets;
		this._followers = followers;
		this._following = following;
	}

	get tweets() {
		return this._tweets;
	}

	get followers() {
		return this._followers;
	}

	get following() {
		return this._following;
	}
}

let updateUserInfo = function(user, stats) {
	querySelectorImg(".coverProfilePhoto img", user.profile_img);
	querySelectorInnerHTML(".personalInfo span:nth-child(1)", user.full_name);
	querySelectorInnerHTML(".personalInfo span:nth-child(3)", "@" + user.user_name);
	querySelectorInnerHTML(".personalInfo span:nth-child(4)", user.user_bio);

	querySelectorInnerHTMLAll(".personalInfodata", user.user_from, 0);
	querySelectorInnerHTMLAll(".personalInfodata", user.user_website, 1);
	querySelectorInnerHTMLAll(".personalInfodata", "Joined " + dataConv(user.user_created_at), 2);
	querySelectorInnerHTMLAll(".personalInfodata", dataConv(user.user_birthday), 3);

	querySelectorInnerHTMLAll(".bannerMetaNumbers", stats.tweets, 0);
	querySelectorInnerHTMLAll(".bannerMetaNumbers", stats.following, 1);
	querySelectorInnerHTMLAll(".bannerMetaNumbers", stats.followers, 2);

}

let updateSuggestions = function() {
	let data = this.data;
	let div = '';
	let leftmidmid = document.querySelector(".leftmidmid");
	for(var i = 0; i < data.length && i < 3; i++) {
		div += `<div class="smallicons">
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
		div += `<div class="indposts">
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
		div += `<div class="followingCards">
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
	return day + " " + month + " " + year;
}

let mediaSquare = function() {
	let photosAndVideos = document.querySelector(".photosAndVideos");
	div = '';
	for(var i = 0; i < 9; i++) {
		var div = div + `<div class="mediaSquare"></div>`;
	}
	photosAndVideos.innerHTML = div;
}

mediaSquare();