(function () {

	let deck = [
		'2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
		'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
		'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
		'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'
	];



	function shuffle() {

		// Fisher–Yates Shuffle        
		// Source: https://bost.ocks.org/mike/shuffle/

		let array = ['2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH', 'AH',
			'2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS', 'AS',
			'2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC', 'AC',
			'2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD', 'AD'

		];

		var m = array.length, t, i;

		// While there remain elements to shuffle…
		while (m) {

			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}





	var dealButton = document.getElementById("deal");
	var hitButton = document.getElementById("hit");
	var standButton = document.getElementById("stand");
	var playAgainButton = document.getElementById("playAgain");
	// var resetButton = document.getElementById("reset");
	var playerCards = document.getElementById("playerCards");
	var dealerCards = document.getElementById("dealerCards");
	var winner = document.getElementById("winner")

	let dealer = [];
	let player = [];
	var dealerTotal = 0;
	var playerTotal = 0;
	var gethandValue = 0;

	dealButton.addEventListener("click", deal);
	hitButton.addEventListener("click", function () {
		hit(player);
	});
	playAgainButton.addEventListener("click", playAgain);
	// resetButton.addEventListener("click", reset);




	// Deal Button
	function deal() {

		dealButton.classList.toggle("hidden");
		hitButton.classList.toggle("hidden");
		standButton.classList.toggle("hidden");

		deck = shuffle(deck);

		player.push(deck.shift());
		dealer.push(deck.shift());
		player.push(deck.shift());
		dealer.push(deck.shift());

		showCardOnTable(player[0], playerCards, true);
		showCardOnTable(player[1], playerCards, true);
		showCardOnTable(dealer[0], dealerCards, true);
		showCardOnTable(dealer[1], dealerCards, false);

		dealerTotal = getHandValue(dealer);
		playerTotal = getHandValue(player);

		console.log(deck);
		console.log("dealer", dealer);
		console.log("player", player);
		console.log("dealerTotal", dealerTotal);
		console.log("playerTotal", playerTotal);

		if (dealerTotal === 21 || playerTotal === 21) {
			showFaceDown();
			showWinner();
		}

	}
	// End Deal Button



	// Hit Button
	function hit(hand, isDealer) {

		hand.push(deck.shift());

		// Who is hiting, where the card is placed
		var lastIndex = hand.length - 1;

		if (!isDealer) {
			var playerCards = document.getElementById("playerCards");
			showCardOnTable(player[lastIndex], playerCards, true);
		}

		if (isDealer) {
			var dealerCards = document.getElementById("dealerCards");
			showCardOnTable(dealer[lastIndex], dealerCards, true);
		}

		// Calculates Points of both Dealer && Player
		dealerTotal = getHandValue(dealer);
		playerTotal = getHandValue(player);

		if (playerTotal > 21 || dealerTotal > 21) {
			showFaceDown();
			showWinner();
			hitButton.classList.toggle("hidden");
			standButton.classList.toggle("hidden");
			playAgainButton.classList.toggle("hidden");

		}
		if (dealerTotal === 21 || playerTotal === 21) {
			showFaceDown();
			showWinner();
		}

		console.log("dealer", dealer);
		console.log("player", player);
		console.log("dealerTotal", dealerTotal);
		console.log("playerTotal", playerTotal);

	}
	// End Hit Button




	// Stand Button ++ Dealers Turn
	standButton.addEventListener("click", function () {

		hitButton.classList.toggle("hidden");
		standButton.classList.toggle("hidden");
		playAgainButton.classList.toggle("hidden");

		// will make showFaceDown function
		dealerCards.innerHTML = '';
		showCardOnTable(dealer[0], dealerCards, true, true);
		showCardOnTable(dealer[1], dealerCards, true, true);

		// not over the minimum of 16pts
		while (dealerTotal < 17) {
			hit(dealer, true);
		}

		// will compare to playerTotals in showWinner
		// if (dealerTotal > 17) {
		// 	showFaceDown();
		// 	showWinner();
		// }

		console.log(dealer);
		getHandValue(dealer);
		showWinner();

	})
	// End Stand Button



	function showFaceDown(showFaceDown) {
		dealerCards.innerHTML = ''
		showCardOnTable(dealer[0], dealerCards, true, true);
		showCardOnTable(dealer[1], dealerCards, true, true);
	}



	// Play-Again Button
	function playAgain() {

		winner.innerHTML = " ";

		dealerCards.innerHTML = '';
		playerCards.innerHTML = '';

		dealer = [];
		player = [];
		dealerTotal = 0;
		playerTotal = 0;

		winner.classList.remove("hidden");

		dealButton.classList.toggle("hidden");
		playAgainButton.classList.toggle("hidden");

		deal();

	}



	// Showing card images
	function showCardOnTable(card, cardsDiv, isFaceUp) {

		var cardImage = document.createElement("img");

		cardImage.classList.add("card");

		if (isFaceUp) {
			cardImage.src = "img/" + card + ".png";
		}
		else {
			cardImage.src = "img/back.png";
		}
		// puts it as a last child
		cardsDiv.appendChild(cardImage);
	}



	// Adding up Score in hand
	function getHandValue(inHand) {

		var hasAce = false;
		var acePosition = 0;
		var handTotal = 0;

		// Adding all cards in All positions (Ace not counted at the end)
		for (i = 0; i < inHand.length; i++) {
			// Determining where Ace is positioned
			if (getCardValue(inHand[i]) === 1 || getCardValue(inHand[i]) === 11) {
				hasAce = true;
				acePosition = i;
			}
			// will add all values other than Ace
			else {
				handTotal += getCardValue(inHand[i]);
			}
		}

		// Include prior (doing nothing) with a present Ace, adding it to the handTotal ()
		if (hasAce === true) {
			handTotal += getCardValue(inHand[acePosition], handTotal);
		}

		return handTotal;

		console.log(handTotal);

	}



	// Getting each cards VALUE
	function getCardValue(card, handTotal) {

		switch (card[0]) {
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				return parseInt(card[0]);
			case "1":
			case "J":
			case "Q":
			case "K":
				return 10;
			default:
				if (handTotal + 11 > 21) {
					return 1;
				}
				else {
					return 11;
				}
		}

	}



	// Scoring, who wins
	function showWinner(whoWins) {

		winner.classList.remove("hidden");

		if (dealerTotal === playerTotal) {
			winner.innerHTML = "It's a tie";
		}

		else if (dealerTotal > playerTotal) {
			if (dealerTotal === 21) {
				winner.innerHTML = "Dealer Black Jack!";
			}
			else if (dealerTotal > 21) {
				winner.innerHTML = "Dealer Busted, Player Wins!";
			}
			else {
				winner.innerHTML = "Dealer Wins.";
			}
		}

		else if (playerTotal > dealerTotal) {
			if (playerTotal === 21) {
				winner.innerHTML = "Player Black Jack!";
			}
			else if (playerTotal > 21) {
				winner.innerHTML = "Player Busted, Dealer Wins!";
			}
			else {
				winner.innerHTML = "Player Wins.";
			}
		}

	}

	function reset() {
		location.reload();
	}

	// Multiple Ace's contact Rudy R. (boolian)

})();