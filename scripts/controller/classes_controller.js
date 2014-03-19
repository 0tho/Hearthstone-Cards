define(['general_view', 'classes_view', 'router'], function(general, classes, router)
{        
    //The init function appends the html into our browser and then adds all interactions
    function init()
    {
        general.append(classes.html);
        classes.init(data.hearth_classes);
        classes.classesClick(function()
        {
            console.log($(this).data('class'));

            router.changeState('cardSelect', $(this).data('class'));
        });
    }

    return {
        init: init
    };
});