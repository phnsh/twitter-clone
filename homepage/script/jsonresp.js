var urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following/tweets"];

var consolidate = urls.map(url => fetch(url).then(res => res.json()));
Promise.all(consolidate).then(res => acceptURLs.call(res));

var acceptURLs = function() {
	updateDOM.apply(this[0]);
	updateSuggestions.apply(this[1]);
	tweetContent.apply(this[2]);
}

var updateDOM = function() {
	//console.log(this.data.user_name);
	var data = this.data;
	querySelectorImg("div.banner img", data.cover_img);
	querySelectorInnerHTML("span.USERNAME", data.full_name);
	querySelectorInnerHTML("span.HANDLE", "@" + data.user_name);
	querySelectorInnerHTML("div.followingInfo div:nth-child(1) span:nth-child(2)", data.stats.tweets);
	querySelectorInnerHTML("div.followingInfo div:nth-child(2) span:nth-child(2)", data.stats.following);
	querySelectorInnerHTML("div.followingInfo div:nth-child(3) span:nth-child(2)", data.stats.followers);
	querySelectorImg("div.profilepic img", data.profile_img);
}

var updateSuggestions = function() {
	var data = this.data;
	var div = '';
	var leftmidmid = document.querySelector(".leftmidmid");
	for(var i = 0; i < data.length && i < 3; i++) {
		div = div + `<div class="smallicons">
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

var tweetContent = function() {
	var data = this.data;
	var div = '';
	var rightbottom = document.querySelector(".rightbottom");
	for(var i in data) {
		var div = div + `<div class="indposts">
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

function querySelectorInnerHTML(target, data) {
	var container = document.querySelector(target);
	container.innerHTML = data;
}

function querySelectorImg(target, data) {
	var container = document.querySelector(target);
	container.src = data;
}