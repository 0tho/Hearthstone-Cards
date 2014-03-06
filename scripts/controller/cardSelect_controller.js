define(['general_view', 'cardSelect_view', 'require'], function(general, cardSelect, require)
{        
   function insertDivsIntoHTML()
   {
      general.body.append(cardSelect.html);
      cardSelect.init();      
    
      cardSelect.cardsClick(function()
      {
          var card = $(this);
          
         
      });
   }
    
   return {
       init: insertDivsIntoHTML
   };
});