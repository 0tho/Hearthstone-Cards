define(['general_view', 'cardSelect_view', 'require'], function(general, cardSelect, require)
{        
   function insertDivsIntoHTML()
   {
      general.body.append(cardSelect.html);
      cardSelect.init();
   }
    
   return {
       init: insertDivsIntoHTML
   };
});