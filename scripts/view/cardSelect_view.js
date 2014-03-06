define(['jquery', 'text!../html/cardSelect.html', 'text!../html/cardLayout.html', 'text!../html/cardThumbnailLayout.html', 'data'], function($, html, cardLayout, cardThumbnailLayout, data)
{    
    function insertCardsDivsIntoHTML()
    {
        var cards = data.hearth_cards;
        for(i=0;i<cards.length;i++)
        {
            var card = cards[i];
            
            var newContainer = $(cardLayout);
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
    
    function insertThumbnailIntoHTML(card, index)
    {           
        var newCardThumbnailContainer = $(cardThumbnailLayout);
        $('#selectedCards').append(newCardThumbnailContainer);
        
        index = $('.cardThumbnailContainer').length-1;       
        
        $($('.cardThumbnail_mana')[index]).text(card.mana);
        $($('.cardThumbnail_img')[index]).text(card.img);
        $($('.cardThumbnail_name')[index]).text(card.name);
        $($('.cardThumbnail_quantity')[index]).text(1);
    }
    
    return {
        html: html,       
       
        cardsClick: function(_function)
        {            
            $('.card_img').click(_function);
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
                 
        
        init: insertCardsDivsIntoHTML
    };
});