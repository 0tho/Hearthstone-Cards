define(['jquery'], function($) {



    return {        
        reset: function() {
            $('body').empty();
        },
        append: function(html) {
            $('body').append(html);
        }
    };
});