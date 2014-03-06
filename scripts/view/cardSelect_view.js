define(['jquery', 'text!../html/cardSelect.html', 'text!../html/cardLayout.html', 'data'], function($, html, cardLayout, data)
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
    return {
        html: html,       
       
        cardsClick: function(_function)
        {            
            $('.card_img').click(_function);
        },
        
        init: insertCardsDivsIntoHTML
    };
});