define(['general_view', 'cardControl_view', 'deckController', 'router'], function(general, cardControl, deckController, router)
{    
    var deck;

    function init()
    {
        deck = deckController.deck();
       
        cardControl.init(deck);
       
        cardControl.cardsThumbnailClick(function(event)
        {
            var thumbnail = $(this);
            var name = thumbnail.data('name');
            var card = {name: name};
            

            
            if(event.which === 1)
            {                


                var changeState = deck.useCard(name);               


                
                var notUsedCard = deck.remainingCardsOnDeck(name);
                

                if(notUsedCard === 0)
                {
                    cardControl.turnCardOff(name);
                }else if(notUsedCard > 0)
                {
                    cardControl.setQuantity(name, notUsedCard);
                }
                

                cardControl.updateCardCounter(deck.remainingCardsOnDeck());

            }else if(event.which === 3)
            {
                var changeState = deck.resetUseOfCard(name);               
                
                var notUsedCard = deck.remainingCardsOnDeck(name);
                
               
                if(notUsedCard-1 === 0)
                {
                    cardControl.turnCardOn(name);
                }else if(notUsedCard-1 > 0)
                {
                    cardControl.setQuantity(name, notUsedCard);
                }
                
                cardControl.updateCardCounter(deck.remainingCardsOnDeck());
                
            }
            
        });
        
        cardControl.backButton(function()
        {
            router.changeState('cardSelect');
        });
        
        cardControl.cardNumberButton(function()
        {
            deck.resetUseOfAllCards();
            cardControl.updateCardCounter(deck.remainingCardsOnDeck());            
            cardControl.resetCards();
        });
       
    }
    
   return {
        init: init        
   };
});
