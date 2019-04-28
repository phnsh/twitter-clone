var urls = ["https://fsd1.herokuapp.com/users/1/details",
"https://fsd1.herokuapp.com/users/1/tweets",
"https://fsd1.herokuapp.com/users/1/followers/suggestions",
"https://fsd1.herokuapp.com/users/1/following"];

var consolidate = urls.map(url => fetch(url).then(res => res.json()));
Promise.all(consolidate).then(data => updateDetails(data));//.then(res => console.log(res));

function updateDetails(data) {
	var profileImg = document.querySelector(".coverProfilePhoto img");
	profileImg.src = data[0].data.profile_img;

	document.querySelector(".personalInfo span:nth-child(1)").innerHTML = data[0].data.full_name;
	document.querySelector(".personalInfo span:nth-child(3)").innerHTML = "@" + data[0].data.user_name;
	document.querySelector(".personalInfo span:nth-child(4)").innerHTML = data[0].data.user_bio;

	document.querySelectorAll(".personalInfodata")[0].innerHTML = data[0].data.user_from;
	document.querySelectorAll(".personalInfodata")[1].innerHTML = data[0].data.user_website;
	document.querySelectorAll(".personalInfodata")[2].innerHTML = "Joined " + dataConv(data[0].data.user_created_at);
	document.querySelectorAll(".personalInfodata")[3].innerHTML = dataConv(data[0].data.user_birthday);

	document.querySelectorAll(".bannerMetaNumbers")[0].innerHTML = data[0].data.stats.tweets;
	document.querySelectorAll(".bannerMetaNumbers")[1].innerHTML = data[0].data.stats.following;
	document.querySelectorAll(".bannerMetaNumbers")[2].innerHTML = data[0].data.stats.followers;

	for(var i = 0; i < data[2].data.length && i < 3; i++) {
		var leftmidmid = document.querySelector(".leftmidmid");
		var div = document.createElement("div");
		div.className = "smallicons";
		var midmid = leftmidmid.appendChild(div);

		var divPpimage = document.createElement("div");
		divPpimage.className = "ppimage";
		midmid.appendChild(divPpimage);
		divPpimage.appendChild(document.createElement("img"));
		var ppimage = document.querySelectorAll(".ppimage > img");
		ppimage[i].src = data[2].data[i].profile_img;

		var spandiv = div.appendChild(document.createElement("div"));
		var span1 = spandiv.appendChild(document.createElement("span"));
		span1.id = "username";
		var username = document.querySelector("#username");
		username.innerHTML = data[2].data[i].full_name;
		var span2 = spandiv.appendChild(document.createElement("span"));
		span2.id = "handle";
		var handle = document.querySelector("#handle");
		handle.innerHTML = "@" + data[2].data[i].user_name;

		//spandiv.appendChild(document.createElement("br"));
		var button = document.createElement("button");
		button.id = "smallFollowButton";
		spandiv.appendChild(button);
		button.innerHTML = "Follow";
	}

	for(var i = 0; i < data[1].data.length; i++) {
		var rightbottom = document.querySelector(".rightbottom");
		var indposts = document.createElement("div");
		indposts.className = "indposts";
		rightbottom.appendChild(indposts);
	
		var ppimage = indposts.appendChild(document.createElement("div"));
		ppimage.className = "ppimage";
		indposts.appendChild(ppimage);
		ppimage.appendChild(document.createElement("img"));
		var profilepic = document.querySelector(".ppimage > img");
		profilepic.src = data[1].data[i].user.profile_img;

		var postcontent = indposts.appendChild(document.createElement("div"));
		postcontent.className = "postcontent";
		indposts.appendChild(postcontent);

		var namehandle = postcontent.appendChild(document.createElement("div"));
		namehandle.className = "namehandle";
		postcontent.appendChild(namehandle);

		namehandle.appendChild(document.createElement("span"));
		namehandle.appendChild(document.createElement("span"));
		namehandle.appendChild(document.createElement("span"));
		namehandle.appendChild(document.createElement("span"));

		let username = document.querySelectorAll(".namehandle span:nth-child(1)");
		username[i].innerHTML = data[1].data[i].user.full_name;

		let handle = document.querySelectorAll(".namehandle span:nth-child(2)");
		handle[i].innerHTML = "@" + data[1].data[i].user.user_name;

		var tweetbody = postcontent.appendChild(document.createElement("div"));
		tweetbody.className = "tweetbody";
		tweetbody.appendChild(document.createElement("span"));
		tweetbody.innerHTML = data[1].data[i].text;

		var postInteractions = postcontent.appendChild(document.createElement("div"));
		postInteractions.className = "postInteractions";
		postcontent.appendChild(postInteractions);

		var comments = postInteractions.appendChild(document.createElement("div"));
		comments.className = "comments";
		postInteractions.appendChild(comments);
		comments.appendChild(document.createElement("img"));
		document.querySelector(".comments img").src = "img/replies.png";
		comments.appendChild(document.createElement("span"));
		document.querySelector(".comments span").innerHTML = data[1].data[i].stats.comments;
		document.querySelector(".comments span").style.marginLeft = "5px";

		var likes = postInteractions.appendChild(document.createElement("div"));
		likes.className = "likes";
		postInteractions.appendChild(likes);
		likes.appendChild(document.createElement("img"));
		likes.querySelector(".likes img").src = "img/likes.png";
		likes.appendChild(document.createElement("span"));
		likes.querySelector(".likes span").innerHTML = data[1].data[i].stats.likes;
		document.querySelector(".likes span").style.marginLeft = "5px";

		var retweets = postInteractions.appendChild(document.createElement("div"));
		retweets.className = "retweets";
		postInteractions.appendChild(retweets);
		retweets.appendChild(document.createElement("img"));
		retweets.querySelector(".retweets img").src = "img/retweets.png";
		retweets.appendChild(document.createElement("span"));
		retweets.querySelector(".retweets span").innerHTML = data[1].data[i].stats.retweets;
		document.querySelector(".retweets span").style.marginLeft = "5px";
	}

	for(var i = 0; i < data[3].data.length; i++) {
		var followingCards = document.querySelector(".followingCardsContainer").appendChild(document.createElement("div"));
		followingCards.className = "followingCards";
		var followingCardsDiv = followingCards.appendChild(document.createElement("div"));
		
		var followingCardsBanner = followingCardsDiv.appendChild(document.createElement("div"));
		followingCardsBanner.className = "followingCardsBanner";
		followingCardsDiv.appendChild(followingCardsBanner);
		followingCardsBanner.appendChild(document.createElement("img"));
		document.querySelector(".followingCardsBanner img").src = data[3].data[i].cover_img;
		
		var profilepic = followingCardsDiv.appendChild(document.createElement("div"));
		profilepic.className = "profilepic";
		profilepic.appendChild(document.createElement("img"));
		document.querySelector(".profilepic img").src = data[3].data[i].profile_img;
		
		var cardMeta = document.createElement("div");
		cardMeta.className = "cardMeta";
		profilepic.appendChild(cardMeta);

		var userMeta = document.createElement("div");
		userMeta.className = "userMeta";
		cardMeta.appendChild(userMeta);	
		userMeta.appendChild(document.createElement("span"));
		userMeta.appendChild(document.createElement("span"));	
		var userBio = followingCards.appendChild(document.createElement("span"));
		userBio.className = "userBio";
		userBio.innerHTML = data[3].data[i].user_bio;

		document.querySelector(".userMeta span:nth-child(1)").innerHTML = data[3].data[i].full_name;
		document.querySelector(".userMeta span:nth-child(2)").innerHTML = "@" + data[3].data[i].user_name;
		}
	}

function dataConv(UTCSeconds) {
	var date = new Date(UTCSeconds);
	var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var month = months[date.getMonth() + 1];
	var day = date.getDate();
	var year = date.getFullYear();
	return day + " " + month + " " + year;
}