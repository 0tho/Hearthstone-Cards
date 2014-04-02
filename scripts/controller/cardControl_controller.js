//This module controlls card select screen interactions
define(['general_view', 'cardControl_view', 'deckController', 'router'], function(general, cardControl, deckController, router)
{    
//Variables    
    var deck;

//Functions
    function init()
    {
        //Get deck current cards data
        deck = deckController.deck();
       
        //Init cardControl view
        cardControl.init(deck);
       
        //Add interaction to card thumbnails
        cardControl.cardsThumbnailClick(function(event)
        {
            var thumbnail = $(this);
            var name = thumbnail.data('name');
            var card = {name: name};
            

            //If mouse left click
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

            //If mouse right click
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
        
        //Back button click function
        cardControl.backButton(function()
        {
            router.changeState('cardSelect');
        });
        
        //Reset button click function
        cardControl.cardNumberButton(function()
        {
            deck.resetUseOfAllCards();
            cardControl.updateCardCounter(deck.remainingCardsOnDeck());            
            cardControl.resetCards();
        });
       
    }
//Module Interface   
   return {
        init: init        
   };
});
