let urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following/tweets"];

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
	spreadUserData(this[0].data);
	updateSuggestions.apply(this[1]);
	tweetContent.apply(this[2]);
}

let spreadUserData = function(arr) {
	var rawData = arr;
	let user = new User(rawData.id, rawData.profile_img, rawData.cover_img, rawData.full_name, rawData.user_bio, rawData.user_name, rawData.user_email, rawData.following);
	let stats = new Stats(rawData.stats.tweets, rawData.stats.followers, rawData.stats.following);
	updateUserInfo(user, stats);
}

class User {
	constructor(id, profile_img, cover_img, full_name, user_bio, user_name, user_email, following) {
		this._id = id;
		this._profile_img = profile_img; 
		this._cover_img = cover_img;
		this._full_name = full_name;
		this._user_bio = user_bio;
		this._user_name = user_name;
		this._user_email = user_email;
		this._following = following;
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

//function to update users info
let updateUserInfo = function(user, stats) {
	//console.log(this.data.user_name);
	querySelectorImg("div.banner img", user.cover_img);
	querySelectorInnerHTML("span.USERNAME", user.full_name);
	querySelectorInnerHTML("span.HANDLE", "@" + user.user_name);
	querySelectorInnerHTML("div.followingInfo div:nth-child(1) span:nth-child(2)", stats.tweets);
	querySelectorInnerHTML("div.followingInfo div:nth-child(2) span:nth-child(2)", stats.following);
	querySelectorInnerHTML("div.followingInfo div:nth-child(3) span:nth-child(2)", stats.followers);
	querySelectorImg("div.profilepic img", user.profile_img);
}

//updating the foollow suggestions
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

//filling the content of the tweets
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

//function to target queryselector and to target a picture below
function querySelectorInnerHTML(target, data) {
	let container = document.querySelector(target);
	container.innerHTML = data;
}

function querySelectorImg(target, data) {
	let container = document.querySelector(target);
	container.src = data;
}