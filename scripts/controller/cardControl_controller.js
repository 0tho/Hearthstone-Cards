define(['general_view', 'cardControl_view'], function(general, cardControl)
{        
    
    var cards = [];
    
    function countCards(card)
    {
        var count = 0;
        var i = 0;
        for(i=0; i< cards.length;i++)
        {
            if(card.name === cards[i].name && !cards[i].used)
            {
                count++;
            }
        }
        
        return count;
    }
    
    function countAllUnusedCards(array)
    {
        var count = 0;
        var i = 0;
        for(i=0; i< array.length;i++)
        {
            if(!array[i].used)
            {
                count++;
            }
        }
        
        return count;
    }
    
    function init(_cards)
    {
        cards = _cards;
       
        cardControl.init(_cards);
       
        cardControl.cardsThumbnailClick(function(event)
        {
            console.log("clicou", event);
            var thumbnail = $(this);
            var cardName = thumbnail.data('name');
            var card = {name: cardName};
            
            console.log(countCards(card, cards));
            var mainController = require('mainController');
            if(event.which === 1)
            {                
                var changeState = mainController.useCard(card);               
                
                var value = countCards(card, cards);
                
                console.log(changeState, value);
                if(changeState === "turnOff")
                {
                    cardControl.turnCardOff(cardName);
                }else if(changeState === "decrement")
                {
                    cardControl.setQuantity(cardName, value);
                }
                
                cardControl.updateCardCounter(countAllUnusedCards(cards));
                console.log(this);
            }else if(event.which === 3)
            {
                var changeState = mainController.unuseCard(card);               
                
                var value = countCards(card, cards);
                
                console.log(changeState, value);
                if(changeState === "turnOn")
                {
                    cardControl.turnCardOn(cardName);
                }else if(changeState === "increment")
                {
                    cardControl.setQuantity(cardName, value);
                }
                
                cardControl.updateCardCounter(countAllUnusedCards(cards));
                console.log(this);
            }
            
        });
        
        cardControl.backButton(function()
        {
            var mainController = require('mainController');
            mainController.changeState("cardSelect");
        });
        
        cardControl.cardNumberButton(function()
        {
            var mainController = require('mainController');
            mainController.resetUseOfCars();
            cardControl.updateCardCounter(countAllUnusedCards(cards));
            
            cardControl.resetCards();
        });
       
    }
    
   return {
        init: init,
        countCards: countCards
   };
});
