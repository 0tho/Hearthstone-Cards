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
            console.log(mainController.selectedCards);
            
            //if deck has 30 cards allow to click on done button
            if(adicionou)
            {
                //Add card thumbnail
                cardSelect.addThumbnail(cardObj, 0);
            }
            else
            {
                deckDone = true;
            }
        });
      
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
    
    return {
        init: insertDivsIntoHTML
    };
});