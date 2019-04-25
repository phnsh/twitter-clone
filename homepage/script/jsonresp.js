var promise = fetch("https://fsd1.herokuapp.com/users/1/details");
	promise.then(response => response.json())
		.then(d => updateDOM(d.data))
		.catch(error => console.log(error));

var promise = fetch("https://fsd1.herokuapp.com/users/1/followers/suggestions");
	promise.then(response => response.json())
	.then(d => updateSuggestions(d.data))
	.catch(error => console.log(error));

var promise = fetch("https://fsd1.herokuapp.com/users/1/following/tweets");
	promise.then(response => response.json())
	.then(d => tweetContent(d.data))
	.catch(error => console.log(error));

	var updateDOM = function(data) {
	//console.log(data);
	var bannerPic = document.querySelector("div.banner img");
	bannerPic.src = data.cover_img;

	var userName = document.querySelector("span.USERNAME");
	userName.innerHTML = data.full_name;

	var handle = document.querySelector("span.HANDLE");
	handle.innerHTML = "@" + data.user_name;

	var tweet = document.querySelector("div.followingInfo div:nth-child(1) span:nth-child(2)");
	tweet.innerHTML = data.stats.tweets;

	var Following = document.querySelector("div.followingInfo div:nth-child(2) span:nth-child(2)");
	Following.innerHTML = data.stats.following;

	var Followers = document.querySelector("div.followingInfo div:nth-child(3) span:nth-child(2)");
	Followers.innerHTML = data.stats.followers;

	var profileImg = document.querySelector("div.profilepic img");
	profileImg.src = data.profile_img;
}

var updateSuggestions = function(data) {
	var usernameList = document.querySelectorAll("#username");
	for(var i = 0; i < usernameList.length; i++) {
		usernameList[i].innerHTML = data[0].full_name;
	}

	var handleList = document.querySelectorAll("#handle");
	for(var i = 0; i < usernameList.length; i++) {
		handleList[i].innerHTML = "@" + data[0].user_name;
	}

	for(var i = 0; i < data.length && i < 3; i++) {
		var leftmidmid = document.querySelector(".leftmidmid");
		var div = document.createElement("div");
		div.className = "smallicons";
		var midmid = leftmidmid.appendChild(div);

		var divPpimage = document.createElement("div");
		divPpimage.className = "ppimage";
		midmid.appendChild(divPpimage);
		divPpimage.appendChild(document.createElement("img"));
		var ppimage = document.querySelectorAll(".ppimage > img");
		ppimage[i].src = data[i].profile_img;

		var spandiv = div.appendChild(document.createElement("div"));
		var span1 = spandiv.appendChild(document.createElement("span"));
		span1.id = "username";
		var username = document.querySelector("#username");
		username.innerHTML = data[i].full_name;
		var span2 = spandiv.appendChild(document.createElement("span"));
		span2.id = "handle";
		var handle = document.querySelector("#handle");
		handle.innerHTML = "@" + data[i].user_name;

		//spandiv.appendChild(document.createElement("br"));
		var button = document.createElement("button");
		button.id = "smallFollowButton";
		spandiv.appendChild(button);
		button.innerHTML = "Follow";
	}
}

var tweetContent = function(data) {
	for(var i = 0; i < data.length; i++) {
		var rightbottom = document.querySelector(".rightbottom");
		var indposts = document.createElement("div");
		indposts.className = "indposts";
		rightbottom.appendChild(indposts);
	
		var ppimage = indposts.appendChild(document.createElement("div"));
		ppimage.className = "ppimage";
		indposts.appendChild(ppimage);
		ppimage.appendChild(document.createElement("img"));
		var profilepic = document.querySelector(".ppimage > img");
		profilepic.src = data[i].user.profile_img;

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
		username[i].innerHTML = data[i].user.full_name;

		let handle = document.querySelectorAll(".namehandle span:nth-child(2)");
		handle[i].innerHTML = "@" + data[i].user.user_name;

		var tweetbody = postcontent.appendChild(document.createElement("div"));
		tweetbody.className = "tweetbody";
		tweetbody.appendChild(document.createElement("span"));
		tweetbody.innerHTML = data[i].text;

		var postInteractions = postcontent.appendChild(document.createElement("div"));
		postInteractions.className = "postInteractions";
		postcontent.appendChild(postInteractions);

		var comments = postInteractions.appendChild(document.createElement("div"));
		comments.className = "comments";
		postInteractions.appendChild(comments);
		comments.appendChild(document.createElement("img"));
		document.querySelector(".comments img").src = "img/replies.png";
		comments.appendChild(document.createElement("span"));
		document.querySelector(".comments span").innerHTML = data[i].stats.comments;

		var likes = postInteractions.appendChild(document.createElement("div"));
		likes.className = "likes";
		postInteractions.appendChild(likes);
		likes.appendChild(document.createElement("img"));
		likes.querySelector(".likes img").src = "img/likes.png";
		likes.appendChild(document.createElement("span"));
		likes.querySelector(".likes span").innerHTML = data[i].stats.likes;

		var retweets = postInteractions.appendChild(document.createElement("div"));
		retweets.className = "retweets";
		postInteractions.appendChild(retweets);
		retweets.appendChild(document.createElement("img"));
		retweets.querySelector(".retweets img").src = "img/retweets.png";
		retweets.appendChild(document.createElement("span"));
		retweets.querySelector(".retweets span").innerHTML = data[i].stats.retweets;
	}
}