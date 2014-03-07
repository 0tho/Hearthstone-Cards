define(['jquery', 'text!../html/cardSelect.html', 'text!../html/cardLayout.html', 'text!../html/cardThumbnailLayout.html', 'data'], function($, html, cardLayout, cardThumbnailLayout, data)
{    
    function insertCardsDivsIntoHTML()
    {
        var cards = data.hearth_cards;
        for(i=0;i<cards.length;i++)
        {
            var card = cards[i];
            
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
    
    function insertThumbnailIntoHTML(card, refIndex, refCard)
    {           
        var newCardThumbnailContainer = $(cardThumbnailLayout);
        var index;
        var cardContainer;
        if(refIndex === -1)
        {
            console.log("insert", "first");
            $('#selectedCards').prepend(newCardThumbnailContainer);
            index = 0;
            cardContainer = $($('.cardThumbnailContainer')[index]);
        }else if(refIndex >= 0)
        {
            console.log("insert", "after");
            console.log(newCardThumbnailContainer);
            $('.cardThumbnailContainer[data-name="'+refCard.name+'"]').after(newCardThumbnailContainer);
           
           cardContainer = $('.cardThumbnailContainer[data-name="'+refCard.name+'"] + .cardThumbnailContainer');
        }else
        {
            console.log("insert", "last");
            $('#selectedCards').append(newCardThumbnailContainer);  
            index = $('.cardThumbnailContainer').length-1;  
            cardContainer = $($('.cardThumbnailContainer')[index]);            
        }
        
        
        
        console.log(card);
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
        console.log($('.cardThumbnail_quantity', $('[data-name="'+card.name+'"]')[0]).text());
        $('.cardThumbnail_quantity', $('[data-name="'+card.name+'"]')[0]).text(quantity);
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
        addThumbnail: insertThumbnailIntoHTML,
        removeThumbnail: removeThumbnailFromHTML,
        updateCardQuantity: updateCardQuantity,      
        
        init: insertCardsDivsIntoHTML
    };
});