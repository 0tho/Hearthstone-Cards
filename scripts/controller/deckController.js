//Deck Controller manages all deck data
define(['data', 'card', 'deck'], function(data, card, deck)
{    
//Variables
	var selectedClass;
	var actualDeck;
//Functions
    //save deck on localstorage
	function saveDeck(deck){
		actualDeck = deck;
		window.localStorage.setItem(selectedClass, JSON.stringify(deck.deck()));
	}

    //change class and load deck data from that class
	function changeClass(_class)
	{		
		selectedClass = _class;

		var loadObject = window.localStorage.getItem(_class);
		actualDeck = new deck(30,30);
		

		if(loadObject !== null)
		{
			var cardsData = JSON.parse(loadObject);
			var i;
			for(i=0;i<cardsData.length;i++)
			{
				actualDeck.addCard(cardsData[i]);
			}
		}		
	}
    
//Module Interface
	return{
		selectedClass: function()
		{
			return selectedClass;
		},		
		deck: function()
		{
			return actualDeck;
		},
		saveDeck: saveDeck,
		changeClass: changeClass
			
	}
});