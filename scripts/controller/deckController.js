//Deck Controller manages all deck data
define(['data', 'card', 'deck'], function(data, card, deck)
{
	var actualClass = undefined;
	var actualDeck = [];

	function changeClass(_class)
	{
		if(actualClass !== undefined)
		{
			window.localStorage.setItem(actualClass, JSON.stringify(actualDeck.deck()));
		}
		actualClass = _class;
		var loadObject = window.localStorage.getItem(_class);
		actualDeck = new deck(30,30);
		if(loadObject !== null)
		{
			var cardsData = JSON.parse(loadObject);
			var i;
			for(i=0;i<cardData.length;i++)
			{
				actualDeck.addCard(cardsData[i]);
			}
		}		
	}


	return{
		deck: actualDeck,
		changeClass: changeClass
			
	}
});