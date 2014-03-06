define(['jquery', 'text!../html/classes.html', 'text!../html/classLayout.html', 'data'], function($, html, classLayout, data)
{    
    function insertClassesDivsIntoHtml()
    {
        var classes = data.hearth_classes;
        for(i=0;i<classes.length;i++)
        {            
            var newContainer = $(classLayout);
            $('#classesArea').append(newContainer);            
          
            $($(".class_img")[i])
            .addClass(classes[i].class+'_img')
            .attr("id", classes[i].class);
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