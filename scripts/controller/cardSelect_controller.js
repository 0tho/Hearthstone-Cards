//This module controlls card select screen interactions
define(['general_view', 'cardSelect_view', 'data', 'deckController', 'router'], function(general, cardSelect, data, deckController, router)
{    
//Variables
    //-1 = all mana costs
    var manaFilter = -1;
    var textFilter = "";
    var rarityFilter = "";
    var selectedClass = "";
    var isClassFilterON = false;

    var cards;

    var deck;

//Functions
    //Sends a command to cardSelect_view to apply current filters
    function applyFilters()
    {        
        var classFilter = (isClassFilterON) ? selectedClass : "Any";
        
        cardSelect.aplyFilters(classFilter, manaFilter, textFilter, rarityFilter);
    }
    
    //Insert html in page, and add its initial interactions
    function init()
    {    
        //Find which class was selected
        selectedClass = deckController.selectedClass();
        //Get deck data
        deck = deckController.deck();
        
        //Append HTML
        general.append(cardSelect.html);
        cardSelect.init(data.hearth_cards, deck); 
        cardSelect.thumbnailsClick(thumbnailsClick);
        
    //add selectedClass images to tabs and divs
        $('#selectedClass_tab').addClass(selectedClass+"_tab");
        $('#chosenClassImage').addClass(selectedClass+"_img");
        
        //Anyclass filter tab start active
        $('#anyClass_tab').addClass("tabActive");
        

        
    //resetFilters
        isClassFilterON = false;
        //-1 = all mana costs
        manaFilter = -1;
        textFilter = "";
        rarityFilter = "";
        //Fetch all hearthstone cards data from database
        cards = data.hearth_cards;
    
        //add click event to all cards
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
                
                //check if the thumbnail already exists. If not, add thumbnail, else sum 1
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
        
        //function called when thumbnail is pressed
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
      
        //Back button function
        cardSelect.backClick(function()
        {            
            router.changeState('classes');
        });
        
        //Done button function
        cardSelect.doneClick(function()
        {   
            if(deck.isDeckValid())
            {
                router.changeState('cardControl');
            }
        });
        
        //Turn page (left) function
        cardSelect.turnLeftClick(function()
        {            
            cardSelect.turnLeft();
        });
        
        //Turn page (right) function
        cardSelect.turnLeftRight(function()
        {
            cardSelect.turnRight();
        });
        
        //Change class filter to any function
        cardSelect.anyClassFilterClick(function()
        {
            if(isClassFilterON)
            {
                isClassFilterON = false;
                applyFilters();
                $(this).addClass("tabActive");
                $('#selectedClass_tab').removeClass("tabActive");
            }
        });
        
        //Change class filter to current class function
        cardSelect.selectedClassFilterClick(function()
        {
            if(!isClassFilterON)
            {
                isClassFilterON = true;
                applyFilters();
                $(this).addClass("tabActive");
                $('#anyClass_tab').removeClass("tabActive");
            }
        });
        
        //Change text filter function
        cardSelect.changeTextFilter(function(e)
        {            
            textFilter = $(this).val();
            applyFilters();
            
            
        });
        
        //Add response to mana cristals click
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
//Module Interface
    return {
        init: init
    };
});