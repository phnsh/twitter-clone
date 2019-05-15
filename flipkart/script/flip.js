var cartItems = [];

var getthis = function(element) {
	parentNode = element.parentNode;
	var productName = parentNode.querySelector(".productName").innerHTML;
	var price = parentNode.querySelector(".price").innerHTML;
	parentNode.getElementsByTagName("button")[0].disabled = true;

	addedToCart();

	function addedToCart() {
		cartItems.push({
			product: productName,
			price: price
		});
		itemCount();
	}

	function itemCount() {
		document.querySelector("#noOfItems").innerHTML = cartItems.length;
	}
	//console.log(cartItems);
}

var checkoutArea = function() {
	var span = '';
	document.querySelector(".modal").style.display = 'inline';
	var checkoutItems = document.querySelector("#checkoutItems");
	for(items in cartItems) {
		//var span = span + `<span class="checkoutItemsList">${cartItems[items].product + ', Rs. ' + cartItems[items].price}</span>`
		var span = span + `<span class="checkoutItemsList">${cartItems[items].product + ', Rs. ' + cartItems[items].price}</span>`
		//<a onclick="removeItem.call(this, ${cartItems[items]})" style="font-size: 12px; cursor: pointer;">remove</a></span>`;
		checkoutItems.innerHTML = span;
	}
	//console.log(cartItems[0].product);
	//console.log(cartItems);
}

var removeItem = function(index) {
	/*var temp = this.parentNode.parentNode;*/
	/*var removeThis = temp.querySelectorAll(".checkoutItemsList");*/
	/*console.log("index: " + index);*/
	/*console.log(removeThis[index].parentNode.removeChild(removeThis[index]));*/
	console.log(index);
}

var exitCheckOutArea = function() {
	document.querySelector(".modal").style.display = 'none';
}

var calcDelCharges = function(element) {
	var val = document.getElementById(element).value;
	var result = 0;
	let total = getAllTotal();
	calcTotal();
	printTotal();
	function calcTotal() {
		switch(val) {
			case "ap":
				result = 100 + total;
				break;
			case "tl":
				result = 90 + total;
				break;
			case "tn":
				result = 150 + total;
				break;
			case "kl":
				result = 200 + total;
				break;
			case "ka":
				result = 50 + total;
				break;
			case "mh":
				result = 120 + total;
				break;
		}
	}

	function getAllTotal() {
		let total = 0;
		for(var i in cartItems) {
			total = total + parseInt(cartItems[i].price);
		}
		return total;
	}

	function printTotal() {
		document.querySelector(".selectContainer span:nth-child(3)").innerHTML = "Rs. " + result;
	}
}