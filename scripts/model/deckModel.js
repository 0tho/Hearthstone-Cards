define(['data'] ,function(gameData)
{
	var deck;
	var minimumNumberOfCards = gameData.minimumNumberOfCards;
	var maximumNumberOfCards = gameData.maximumNumberOfCards;	

	function addCard(id){
		//return true/false
	}

	function removeCard(id){
		//return true/false	
	}

	function numberOfCards(id){
		//return number of same card on deck
	}

	function useCard(id){
		//return true/false
	}

	function resetUseOfCard(id){
		//return true/false
	}

	function resetUseOfAllCards(id){
		//return true/false
	}
	
	function remainingCardsOnDeck(id){
		//return number of cards on deck
	}

	function findCardById(id){
		//return index / false
	}
	
	function sortCards(a,b){
		//return -1/0/1
	}

	function isDeckValid()
	{
		//return true/false
	}

	return {
		
	};
	
});