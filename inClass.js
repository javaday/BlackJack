function getHandValue(hand) {

    var total = 0;
    var nonAces = [];
    var aces = [];


    nonAces = hand.filter(function (card) {
        return card[0] !== "A";
    });
    aces = hand.filter(function (card) {
        return card[0] == "A";
    });

    nonAces.forEach(function (card) {
        total += getCardValue(card);
    });

    aces.forEach(function (card) {
        toatl += getCardValue(card);

        if (total > 21) tatal -= 10;
    });

    return total;
}