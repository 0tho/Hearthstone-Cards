define(['jquery', 'text!../html/cardSelect.html', 'data'], function($, html, data)
{    
    function insertCardsDivsIntoHTML()
    {
        var cards = data.hearth_cards;
        for(i=0;i<cards.length;i++)
        {
            var card = cards[i];
            console.log(card);
            var newContainer = $('<div class="card_container">');
            var newCard = $('<div id="'+card.name+'">');
            newCard.addClass('card_img');
            newCard.addClass(card.rarity);
            newCard.addClass(card.class);
            newCard.addClass(card.race+"_race");
            newCard.addClass(card.mana+"_mana");
            newCard.css('background-image', 'url("./style/imgs/cards/'+card.image+'.png")');
            
            newContainer.append(newCard);
            $('#cardsArea').append(newContainer);
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