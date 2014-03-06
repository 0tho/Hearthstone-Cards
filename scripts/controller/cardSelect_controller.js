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
                        
            //Add card thumbnail
            //
            //Add card on mainController deck var
            
            var mainController = require('mainController');
            var adicionou = mainController.selectCard(cards[id]);
            console.log(mainController.selectedCards);
            
            //if deck has 30 cards allow to click on done button
            if(!adicionou)
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