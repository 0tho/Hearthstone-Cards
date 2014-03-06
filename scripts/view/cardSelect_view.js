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
            newCard.addClass(card.rarity);
            newCard.addClass(card.class);
            newCard.addClass(card.race+"_race");
            newCard.addClass(card.mana+"_mana");
            newCard.attr("id", card.name);          
            newCard.attr("data-id", i);
            newCard.css('background-image', 'url("./style/imgs/cards/'+card.image+'.png")');
            
            
        }
    }
    return {
        html: html,       
        cardsArea: $('#cardsArea'),
        filtersArea: $('#filtersArea'),
        costOfMana: $('#costOfMana'),
        searchBar: $('#searchBar'),
        rightCol: $('#rightCol'),
        selectedCards: $('#selectedCards'),
        buttons: $('#buttons'),
        back_button: $('#back_button'),
        done_button: $('#done_button'),   
        
        init: insertCardsDivsIntoHTML
    };
});