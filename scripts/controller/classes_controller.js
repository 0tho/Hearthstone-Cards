define(['general_view', 'classes_view', 'require'], function(general, classes, require)
{        
   
   function insertDivsIntoHTML()
   {
       general.body.append(classes.html);
       classes.init();
       
       
       classes.warriorClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Warrior");
       });
       
       classes.shamanClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Shaman");
       });
       
       classes.rogueClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Rogue");
       });
       
       classes.paladinClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Paladin");
       });
       
       classes.hunterClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Hunter");
       });
       
       classes.druidClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Druid");
       });
       
       classes.warlockClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Warlock");
       });
       
       classes.mageClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Mage");
       });
       
       classes.priestClick(function()
       {
           var mainController = require('mainController');
           mainController.changeState("cardSelect", "Priest");
       });
       
      
   }
   
   
    
   return {
       init: insertDivsIntoHTML
   };
});