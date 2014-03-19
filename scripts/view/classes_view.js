define(['jquery', 'text!../html/classes.html', 'text!../html/classLayout.html'], function($, html, classLayout)
{    
    function init(classes)
    {       
        for(i=0;i<classes.length;i++)
        {            
            var newContainer = $(classLayout);
            $('#classesArea').append(newContainer);            
          
            var classImg = $($(".class_img")[i]);

            classImg.addClass(classes[i].class+'_img')
            classImg.attr("data_class", classes[i].class)
            classImg.attr("id", classes[i].class);
        }
        $('#classesArea').append($('<div class="clear">'));
    }
    
    return {
        html: html ,        
        init: init,

        classesClick: function(_function)
        {
            $('.class_img').click(_function);            
        },
        selectClick: function(_function)
        {
            $('#selectClass').click(_function);
        }
    };
});