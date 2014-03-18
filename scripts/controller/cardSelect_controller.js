define(['general_view', 'cardSelect_view', 'data', 'require'], function(general, cardSelect, data, require)
{        
    var deckDone = true;
    var classFilter = false;
    //-1 = all mana costs
    var manaFilter = -1;
    var textFilter = "";
    var rarityFilter = "";
    
    function applyFilters()
    {
        var mainController = require('mainController');  
        
        var class_selected = mainController.selectedClass();       
        
        var class_selector = (classFilter) ? class_selected : "Any";
        cardSelect.aplyFilters(class_selector, manaFilter, textFilter, rarityFilter);
    }
    
    function insertDivsIntoHTML()
    {    
        general.body.append(cardSelect.html);
        cardSelect.init(thumbnailsClick); 
        
        
        
    //resetFilters
        classFilter = false;
        //-1 = all mana costs
        manaFilter = -1;
        textFilter = "";
        rarityFilter = "";

        var cards = data.hearth_cards;
    
        cardSelect.cardsClick(function()
        {
            
            var card = $(this);
            var id = card.data('id');
            
            var cardObj = cards[id];
                        
            
            
            //Add card on mainController deck var
            
            var mainController = require('mainController');
            
            var adicionou = mainController.selectCard(cardObj);
            
            
            //if deck has 30 cards allow to click on done button
            if(adicionou)
            {
                //Is this card already on deck
                var count = countCards(cardObj, mainController.selectedCards);
                
                var cardIndex = mainController.findCardByName(cardObj, mainController.selectedCards);
                
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
            
            
        }
      
        cardSelect.backClick(function()
        {            
            var mainController = require('mainController');
            mainController.changeState("classes");
        });
        
        cardSelect.doneClick(function()
        {            
            console.log("done", deckDone, require('mainController').selectedCards.length);
            if(deckDone)
            {
                var mainController = require('mainController');
                mainController.changeState("cardControl");
            }
        });
        
        cardSelect.turnLeftClick(function()
        {
            
            cardSelect.turnLeft();
        });
        
        cardSelect.turnLeftRight(function()
        {
            cardSelect.turnRight();
        });
        
        cardSelect.anyClassFilterClick(function()
        {
            if(classFilter)
            {
                classFilter = false;
                applyFilters();
            }
        });
        
        cardSelect.selectedClassFilterClick(function()
        {
            if(!classFilter)
            {
                classFilter = true;
                applyFilters();
            }
        });
        
        cardSelect.changeTextFilter(function(e)
        {            
            textFilter = $(this).val();
            applyFilters();
            
            
        });
        
        cardSelect.manaCostAllFilterClick(function(){manaFilter =-1; applyFilters();});
        cardSelect.manaCost0FilterClick(function(){manaFilter =0; applyFilters();});
        cardSelect.manaCost1FilterClick(function(){manaFilter =1; applyFilters();});
        cardSelect.manaCost2FilterClick(function(){manaFilter =2; applyFilters();});
        cardSelect.manaCost3FilterClick(function(){manaFilter =3; applyFilters();});
        cardSelect.manaCost4FilterClick(function(){manaFilter =4; applyFilters();});
        cardSelect.manaCost5FilterClick(function(){manaFilter =5; applyFilters();});
        cardSelect.manaCost6FilterClick(function(){manaFilter =6; applyFilters();});
        cardSelect.manaCost7FilterClick(function(){manaFilter =7; applyFilters();});
        
        applyFilters();
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
        init: insertDivsIntoHTML,
        countCards: countCards
        
    };
});