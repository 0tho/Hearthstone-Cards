define(['general_view', 'cardSelect_view', 'data', 'require'], function(general, cardSelect, data, require)
{        
    var deckDone = false;
    
    function insertDivsIntoHTML()
    {    
        general.body.append(cardSelect.html);
        cardSelect.init();      
    
        var cards = data.hearth_cards;
    
        cardSelect.cardsClick(function()
        {
            var card = $(this);
            var id = card.data('id');
            
            var cardObj = cards[id];
                        
            
            
            //Add card on mainController deck var
            
            var mainController = require('mainController');
            var adicionou = mainController.selectCard(cardObj);
            //console.log(mainController.selectedCards);
            
            //if deck has 30 cards allow to click on done button
            if(adicionou)
            {
                //Is this card already on deck
                var count = countCards(cardObj, mainController.selectedCards);
                console.log(count);
                var cardIndex = mainController.findCardByName(cardObj, mainController.selectedCards);
                console.log(mainController.selectedCards, cardIndex);
                var refIndex;
                if(cardIndex === 0)
                {
                    refIndex = -1;
                }else
                {
                    refIndex = cardIndex-1;
                }
                
                if(count>1)
                {                    
                    cardSelect.updateCardQuantity(cardObj, count);
                }else
                {
                    var refCardObj = mainController.selectedCards[refIndex];
                    cardSelect.addThumbnail(cardObj, refIndex, refCardObj);
                    cardSelect.thumbnailsUnbind();
                    cardSelect.thumbnailsClick(thumbnailsClick);
                }               
            }
            else
            {
                deckDone = true;
            }
        });
        
        function thumbnailsClick()
        {
            var thumbnail = $(this);
            var cardName = thumbnail.data('name');
            var card = {name: cardName};
            
            var mainController = require('mainController');
            mainController.removeCard(card);
            
            
            var count = countCards(card, mainController.selectedCards);
            if(count > 0)
            {
                cardSelect.updateCardQuantity(card, count);
            }else
            {
                cardSelect.removeThumbnail(card);
            }
            console.log("count", count);
            
        }
      
        cardSelect.backClick(function()
        {            
            var mainController = require('mainController');
            mainController.changeState("classes");
        });
        
        cardSelect.doneClick(function()
        {            
            if(deckDone)
            {
                var mainController = require('mainController');
                mainController.changeState("cardControl");
            }
        });
    }
    
    function countCards(card, array)
    {
        var count = 0;
        var i = 0;
        for(i=0; i< array.length;i++)
        {
            if(card.name === array[i].name)
            {
                count++;
            }
        }
        
        return count;
    }
    
    return {
        init: insertDivsIntoHTML
    };
});