define(['jquery'], function($) {
 
   
   return {
       ready: function(_function){
           $("document").ready(_function);
       },
       reset: function()
       {
            $('body').empty();         
       },
       body: $('body')
   };
});
