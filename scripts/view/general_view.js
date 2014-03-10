define(['jquery'], function($) {
 
   
   return {
       ready: function(_function){
           $("document").ready(_function);
       },
       reset: function()
       {
           $('body').empty();         
       },
       body: $('body'),
       resize: function(_function)
       {
            $(window).resize(_function);
       }
   };
});
