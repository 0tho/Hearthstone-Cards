define(['jquery', 'text!../html/cardControl.html'], function($, html)
{   
    return {
        html: html,
        cardsArea: $('#cardControl_cardsArea'),
        cards: $('#cardControl_cards'),
        buttons : $('#cardControl_buttons'),
        back: $('#cardControl_back'),
        reset: $('#cardControl_reset')        
    };
});