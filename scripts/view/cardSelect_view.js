define(['jquery', 'text!../html/cardSelect.html', 'text!../html/cardLayout.html', 'text!../html/cardThumbnailLayout.html'], function($, html, cardLayout, cardThumbnailLayout)
{    
    var turnPageY = 400;
    var pageNumber = 0;
    var cardsPerPage = 8;

    var cardsData;
    
    
    function init(_cardsData, initialCards)
    {
        cardsData = _cardsData;

        console.log(cardsData, _cardsData);

        insertCardsIntoHTML();

        // if(initialCards !== undefined)
        // {
        //     insertInitialThumbnailsIntoHTML(_function);
        // }
    }
    function insertCardsIntoHTML()
    {        
        for(i=0;i<cardsData.length;i++)
        {
            var card = cardsData[i];
            
            var newContainer = $(cardLayout);
            
            var cardsContainer = $($('.card_container')[i]);
            
            $('#cardsArea').append(newContainer);
            
            var newCard = $($('.card_img')[i]);         
            newCard.attr("id", card.name);          
            newCard.attr("data-id", i);
            newCard.attr("data-mana", card.mana);
            newCard.attr("data-race", card.race);
            newCard.attr("data-rarity", card.rarity);
            newCard.attr("data-class", card.class);
            newCard.css('background-image', 'url("./style/imgs/cards/'+card.image+'.png")');  
        }
        
        
    }
    
    function insertInitialThumbnailsIntoHTML(_function)
    {
        for (i=0;i<initialCards.length;i++)
        {
            var card = initialCards[i];
            var cardDom = $('.cardThumbnailContainer[data-name="'+card.name+'"]');
            if(cardDom.length === 0)
            {
                var cardContainer = $(cardThumbnailLayout);

                cardContainer.attr('data-name', card.name);

                $('.cardThumbnail_mana', cardContainer).text(card.mana);
                $('.cardThumbnail_img', cardContainer).text(card.img);
                $('.cardThumbnail_name', cardContainer).text(card.name);
                $('.cardThumbnail_quantity', cardContainer).text(1);

                $('#selectedCards').append(cardContainer);

               
            }else
            {
                var quantity = require('cardSelect_controller').countCards({name: card.name}, cards);
                
                $('.cardThumbnail_quantity', cardDom).text(quantity);
            }
        }
        
        $('.cardThumbnailContainer').click(_function);
    }
    
    function insertThumbnailIntoHTML(card, refIndex, refCard)
    {           
        
        var newCardThumbnailContainer = $(cardThumbnailLayout);
        var index;
        var cardContainer;
        if(refIndex === -1)
        {
            
            $('#selectedCards').prepend(newCardThumbnailContainer);
            index = 0;
            cardContainer = $($('.cardThumbnailContainer')[index]);
        }else if(refIndex >= 0)
        {
            
            $('.cardThumbnailContainer[data-name="'+refCard.name+'"]').after(newCardThumbnailContainer);
           
           cardContainer = $('.cardThumbnailContainer[data-name="'+refCard.name+'"] + .cardThumbnailContainer');
        }else
        {
            
            $('#selectedCards').append(newCardThumbnailContainer);  
            index = $('.cardThumbnailContainer').length-1;  
            cardContainer = $($('.cardThumbnailContainer')[index]);            
        }
        
        
        
        
        cardContainer.attr('data-name', card.name);
       
        $('.cardThumbnail_mana', cardContainer).text(card.mana);
        $('.cardThumbnail_img', cardContainer).text(card.img);
        $('.cardThumbnail_name', cardContainer).text(card.name);
        $('.cardThumbnail_quantity', cardContainer).text(1);
    }
    
    function removeThumbnailFromHTML(card)
    {        
         $('.cardThumbnailContainer[data-name="'+card.name+'"]').remove();
    }
    
    function updateCardQuantity(card, quantity)
    {
       
        $('.cardThumbnail_quantity', $('[data-name="'+card.name+'"]')[0]).text(quantity);
    }
    
    function toggleManaShineClass(value)
    {
        $('.mana_cost').removeClass('manaActive');
        $('#cost_'+value).addClass('manaActive');
    }
    
    return {
        html: html,       
       
        cardsClick: function(_function)
        {            
            $('.card_img').click(_function);
        },
        thumbnailsClick:function(_function)
        {
            $('.cardThumbnailContainer').click(_function);
        },
        thumbnailsUnbind: function()
        {
            $('.cardThumbnailContainer').unbind();
        },
        backClick: function(_function)
        {
            $('#back_button').click(_function);
        },
        doneClick: function(_function)
        {
            $('#done_button').click(_function);
        },
        turnLeftClick: function(_function)
        {
            $('#turnLeft_button').click(_function);
        },
        turnLeftRight: function(_function)
        {
            $('#turnRight_button').click(_function);
        },
        turnLeft: function(limit)
        {
            
            if(pageNumber > 0)
            {
                var top = parseInt($('#cardsArea').css('top'));
                $('#cardsArea').css('top', top + turnPageY +"px");
                pageNumber--;
            }
        },
        turnRight: function(limit)
        {
            var top = parseInt($('#cardsArea').css('top'));
            var numberOfVisibleCards = $(".card_container:visible").length;
            if(pageNumber < Math.ceil(numberOfVisibleCards/cardsPerPage)-1)
            {
               
                $('#cardsArea').css('top', top - turnPageY +"px");
                pageNumber++;
            }
        },
        changeTextFilter: function(_function)
        {
            
            $('#text_filter').keyup(_function);    
        },
        aplyFilters: function (class_selector, mana_selector, text_selector, rarity_selector)
        {
            var i = 0;
            var cards = require('data').hearth_cards;
            
            text_selector = text_selector.toLowerCase();
            
                       
            
            pageNumber = 0;
            $('#cardsArea').css('top', "0px");
                
            $('.card_container').show();
         
            $('.card_img[data-class!="'+class_selector+'"]').parent().hide();
            if(mana_selector !== -1)
            {
                if(mana_selector === 7)
                {
                    $('.card_img[data-mana="0"]').parent().hide();
                    $('.card_img[data-mana="1"]').parent().hide();
                    $('.card_img[data-mana="2"]').parent().hide();
                    $('.card_img[data-mana="3"]').parent().hide();
                    $('.card_img[data-mana="4"]').parent().hide();
                    $('.card_img[data-mana="5"]').parent().hide();
                    $('.card_img[data-mana="6"]').parent().hide();                    
                }
                else
                {
                    $('.card_img[data-mana!="'+mana_selector+'"]').parent().hide();

                }
            }
            
            var cardsVisible = $('.card_img:visible');
            for(i=0; i<cardsVisible.length; i++)
            {
                var show = true;
                var race = false;
                var descr = false;
                var name = false;
                
                var domCard = $(cardsVisible[i]);
                var cardId = domCard.data('id');
                var card = cards[cardId];                
                
                if(card.race !== "None")
                {
                    if(card.race.toLowerCase().indexOf(text_selector) !== -1)
                    {
                        race = true;
                    }
                }
                if(card.descr !== null)
                {
                    if(card.descr.toLowerCase().indexOf(text_selector) !== -1)
                    {
                        descr = true;
                    }
                }
                
                if(card.name.toLowerCase().indexOf(text_selector) !== -1)
                {
                    name = true;
                }
               
                if(!(race || descr || name))
                {  
                    domCard.parent().hide();
                }
            }
            
        },
        
        anyClassFilterClick: function(_function)
        {
            $('#anyClass_tab').click(_function);
        },   
                
        selectedClassFilterClick: function(_function)
        {
            $('#selectedClass_tab').click(_function);
        },
                
        manaCostAllFilterClick: function(_function){$('#cost_all').click(_function);},
        manaCost0FilterClick: function(_function){$('#cost_0').click(_function);},
        manaCost1FilterClick: function(_function){$('#cost_1').click(_function);},
        manaCost2FilterClick: function(_function){$('#cost_2').click(_function);},
        manaCost3FilterClick: function(_function){$('#cost_3').click(_function);},
        manaCost4FilterClick: function(_function){$('#cost_4').click(_function);},
        manaCost5FilterClick: function(_function){$('#cost_5').click(_function);},
        manaCost6FilterClick: function(_function){$('#cost_6').click(_function);},
        manaCost7FilterClick: function(_function){$('#cost_7').click(_function);},
        toggleManaShineClass: toggleManaShineClass,
        
        addThumbnail: insertThumbnailIntoHTML,
        removeThumbnail: removeThumbnailFromHTML,
        updateCardQuantity: updateCardQuantity,
        
        init: init
    };
});