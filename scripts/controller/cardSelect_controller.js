define(['general_view', 'cardSelect_view', 'data', 'deckController', 'router'], function(general, cardSelect, data, deckController, router)
{       
    //-1 = all mana costs
    var manaFilter = -1;
    var textFilter = "";
    var rarityFilter = "";
    var selectedClass = "";
    var isClassFilterON = false;

    var cards;

    var deck;
    
    function applyFilters()
    {        
        var classFilter = (isClassFilterON) ? selectedClass : "Any";
        
        cardSelect.aplyFilters(classFilter, manaFilter, textFilter, rarityFilter);
    }
    
    function init()
    {    
        selectedClass = deckController.selectedClass();
        deck = deckController.deck();
        

        general.append(cardSelect.html);
        cardSelect.init(data.hearth_cards, deck); 

        cardSelect.thumbnailsClick(thumbnailsClick);

        
        
        
    //resetFilters
        isClassFilterON = false;
        //-1 = all mana costs
        manaFilter = -1;
        textFilter = "";
        rarityFilter = "";

        cards = data.hearth_cards;
    
        cardSelect.cardsClick(function()
        {
            
            var card = $(this);
            var id = card.data('id');
            
            var cardObj = cards[id];
                        
            
            
            //add card on deck


            var adicionou = deck.addCard(cardObj);
            deckController.saveDeck(deck);
            
            
            if(adicionou)
            {
                //Is this card already on deck
                var count = deck.numberOfCards(cardObj.name);
                
                var cardIndex = deck.findCardByName(cardObj.name);
                
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

                    cardSelect.updateCardQuantity(cardObj.name, count);
                }else
                {
                    var refCardObj = deck.deck()[refIndex];
                    

                    cardSelect.addThumbnail(cardObj, refIndex, refCardObj);
                    cardSelect.thumbnailsUnbind();
                    cardSelect.thumbnailsClick(thumbnailsClick);
                }       
                

            }     

            
            
        });
        
        function thumbnailsClick()
        {


            var thumbnail = $(this);
            var name = thumbnail.data('name');           
            
            deck.removeCard(name); 
            deckController.saveDeck(deck);          
            
            var count = deck.numberOfCards(name);
            if(count > 0)
            {
                cardSelect.updateCardQuantity(name, count);
            }else
            {
                cardSelect.removeThumbnail(name);

            }           
        }
      
        cardSelect.backClick(function()
        {            
            router.changeState('classes');
        });
        
        cardSelect.doneClick(function()
        {   
            if(deck.isDeckValid())
            {
                router.changeState('cardControl');
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
            if(isClassFilterON)
            {
                isClassFilterON = false;
                applyFilters();
            }
        });
        
        cardSelect.selectedClassFilterClick(function()
        {
            if(!isClassFilterON)
            {
                isClassFilterON = true;
                applyFilters();
            }
        });
        
        cardSelect.changeTextFilter(function(e)
        {            
            textFilter = $(this).val();
            applyFilters();
            
            
        });
        
        cardSelect.manaCostAllFilterClick(function(){manaFilter =-1; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost0FilterClick(function(){manaFilter =0; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost1FilterClick(function(){manaFilter =1; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost2FilterClick(function(){manaFilter =2; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost3FilterClick(function(){manaFilter =3; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost4FilterClick(function(){manaFilter =4; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost5FilterClick(function(){manaFilter =5; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost6FilterClick(function(){manaFilter =6; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        cardSelect.manaCost7FilterClick(function(){manaFilter =7; applyFilters(); cardSelect.toggleManaShineClass(manaFilter);});
        
        applyFilters();
    }   
    
    return {
        init: init
    };
});