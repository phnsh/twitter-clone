let urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following/tweets"];

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
			//document.body.style.color = "#ff0000";
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
	updateSuggestions.apply(this[1]);
	tweetContent.apply(this[2]);
}

//function to update users info
let updateUserInfo = function() {
	//console.log(this.data.user_name);
	let data = this.data;
	querySelectorImg("div.banner img", data.cover_img);
	querySelectorInnerHTML("span.USERNAME", data.full_name);
	querySelectorInnerHTML("span.HANDLE", "@" + data.user_name);
	querySelectorInnerHTML("div.followingInfo div:nth-child(1) span:nth-child(2)", data.stats.tweets);
	querySelectorInnerHTML("div.followingInfo div:nth-child(2) span:nth-child(2)", data.stats.following);
	querySelectorInnerHTML("div.followingInfo div:nth-child(3) span:nth-child(2)", data.stats.followers);
	querySelectorImg("div.profilepic img", data.profile_img);
}

//updating the follow suggestions
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

//filling the content of the tweets
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

//function to target queryselector and to target a picture
function querySelectorInnerHTML(target, data) {
	let container = document.querySelector(target);
	container.innerHTML = data;
}

function querySelectorImg(target, data) {
	let container = document.querySelector(target);
	container.src = data;
}

let myProfileRedirect = function() {
	window.location.href = "/profilepage/profilepage.html";
}