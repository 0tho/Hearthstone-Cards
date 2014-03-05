define(['jquery', 'text!../html/classes.html', 'data'], function($, html, data)
{    
    function insertClassesDivsIntoHtml()
    {
        var classes = data.hearth_classes;
        for(i=0;i<classes.length;i++)
        {
            console.log(classes[i].name);
            var newContainer = $('<div class="class_container">');            
            var newClass = $('<div id="'+classes[i].class+'" class="'+classes[i].class+'_img class_img" >');
            newContainer.append(newClass);
            $('#classesArea').append(newContainer);           
        }
    }
    
    return {
        html: html ,
        classesArea: $('#classesArea'),
        init: insertClassesDivsIntoHtml,
        
        
        warriorClick: function(_function){
            $('#Warrior').click(_function);
        },
        shamanClick: function(_function){
            $('#Shaman').click(_function);
        },        
        rogueClick: function(_function){
            $('#Rogue').click(_function);
        },
        paladinClick: function(_function){
            $('#Paladin').click(_function);
        },
        hunterClick: function(_function){
            $('#Hunter').click(_function);
        },
        druidClick: function(_function){
            $('#Druid').click(_function);
        },        
        warlockClick: function(_function){
            $('#Warlock').click(_function);
        },
        mageClick: function(_function){
            $('#Mage').click(_function);
        },
        priestClick: function(_function){
            $('#Priest').click(_function);
        }
       
    };
});