define(['card'] ,function(Card)
{
	return function deck(minimumNumberOfCards, maximumNumberOfCards)
	{
		var deck = [];
		if(minimumNumberOfCards)
		{
			this.minimumNumberOfCards = minimumNumberOfCards;
			if(maximumNumberOfCards)
			{
				this.maximumNumberOfCards = maximumNumberOfCards;
			}
		}	


		function addCard(cardData){
			if(maximumNumberOfCards === undefined || deck.length < maximumNumberOfCards)
			{
				var card = new Card(cardData);
				deck.push(card);
				return true;
			}else{
				return false;
			}
			//return true/false
		}

		function removeCard(name){
			var index = findCardByName(name);
			if(index >= 0)
			{
				deck.splice(index, 1);
				return true;
			}else{
				return false;
			}
			//return true/false	
		}

		function numberOfCards(name){
			if(name)
			{
				var count = 0;
				var i;

				for(i=0; i<deck.length; i++)
				{
					if(deck[i].name === name)
					{
						count++;
					}
				}
				return count;

			}else{
				return deck.length;
			}
			//return number of same card on deck or the number of card in the deck
		}

		function useCard(name){
			var index = findNotUsedCardByName(name);
			
			if(index === false){
				return false
			}else if(index >= 0)
			{
				deck[index].use()
				return true;
			}else{
				return false;
			}
			//return true/false
		}

		function resetUseOfCard(name){
			var index = findUsedCardByName(name);
			if(index === false)
			{
				return false;
			}else if(index >=0)
			{
				deck[index].reset();
				return true;
			}else{
				return false;
			}
			//return true/false
		}

		function resetUseOfAllCards(){
			var i;

			for(i=0; i<deck.length; i++)
			{
				deck[i].reset();
			}			
		}
		
		function remainingCardsOnDeck(name){
			var i;
			var count = 0;
			if(!name)
			{
				for(i=0; i<deck.length; i++)
				{
					if(!deck[i].isUsed())
					{
						count++;
					}
				}				
			}else{
				for(i=0; i<deck.length; i++)
				{
					if(!deck[i].isUsed() && deck[i].name == name)
					{
						count++;
					}
				}	
			}

			return count;
			//return number of cards on deck
		}

		function findCardByName(name, initialIndex){
			if(initialIndex === undefined)
			{
				initialIndex = 0;
			}
			var i = initialIndex;

			while (i<deck.length && deck[i].name !== name)
			{
				i++;
			}

			if(i === deck.length)
			{
				return false;
			}else{
				return i;
			}
			//return index / false
		}
		function findNotUsedCardByName(name, initialIndex){
			var index;
			if(initialIndex === undefined)
			{
				initialIndex = 0;
			}

			index = findCardByName(name, initialIndex);
			if(index === false)
			{
				return false;
			}else if(deck[index].isUsed())
			{
				return findNotUsedCardByName(name, initialIndex+1);
			}else{
				return index;
			}
			
			//return index / false
		}

		function findUsedCardByName(name, initialIndex){
			var index;
			if(initialIndex === undefined)
			{
				initialIndex = 0;
			}

			index = findCardByName(name, initialIndex);
			if(index === false)
			{
				return false;
			}else if(deck[index].isUsed())
			{
				return index;
			}else
			{
				return findUsedCardByName(name, initialIndex+1);
			}
			
			
			//return index / false
		}
		
		function sortCards(a,b){
			//return -1/0/1
		}

		function isDeckValid(){
			var valid = true;
			if(minimumNumberOfCards)
			{
				if(deck.length >= minimumNumberOfCards)
				{
					if(maximumNumberOfCards)
					{
						if(deck.length > maximumNumberOfCards)
						{
							valid = false;
						}
					}
				}else{
					valid = false;
				}
			}

			return valid;
			//return true/false
		}

		return {
			deck: function ()
			{
				return deck;
			},
			addCard: addCard,
			removeCard: removeCard,
			numberOfCards: numberOfCards,
			useCard: useCard,
			resetUseOfCard: resetUseOfCard,
			resetUseOfAllCards: resetUseOfAllCards,
			remainingCardsOnDeck: remainingCardsOnDeck,
			findCardByName: findCardByName,
			findNotUsedCardByName: findNotUsedCardByName,
			isDeckValid: isDeckValid,
		};

	};
	
});