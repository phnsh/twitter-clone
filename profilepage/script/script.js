var urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/tweets",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following"];

var consolidate = urls.map(url => fetch(url).then(res => res.json()));
Promise.all(consolidate).then(data => acceptURLs.call(data));//.then(res => console.log(res));

var acceptURLs = function() {
	updateDetails.apply(this[0]);
	tweetContent.apply(this[1]);
	updateSuggestions.apply(this[2]);
	followingContent.apply(this[3]);
}

var updateDetails = function() {
	var data = this.data;
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

var updateSuggestions = function() {
	var data = this.data;
	var div = '';
	var leftmidmid = document.querySelector(".leftmidmid");
	for(var i in data) {
		var div = div + `<div class="smallicons">
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

var followingContent = function() {
	var data = this.data;
	var div = '';
	var followingCards = document.querySelector(".followingCardsContainer");
	for(var i in data) {
		var div = div + `
				<div class="followingCards">
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
	var container = document.querySelector(target);
	container.innerHTML = data;
}

function querySelectorImg(target, data) {
	var container = document.querySelector(target);
	container.src = data;
}

function querySelectorInnerHTMLAll(target, data, index) {
	var container = document.querySelectorAll(target)[index];
	container.innerHTML = data;
}

function dataConv(UTCSeconds) {
	var date = new Date(UTCSeconds);
	var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = months[date.getMonth() + 1];
	var day = date.getDate();
	var year = date.getFullYear();
	return day + " " + month + " " + year;
}

var mediaSquare = function() {
	var photosAndVideos = document.querySelector(".photosAndVideos");
	div = '';
	for(var i = 0; i < 9; i++) {
		var div = div + `<div class="mediaSquare"></div>`;
	}
	photosAndVideos.innerHTML = div;
}

mediaSquare();