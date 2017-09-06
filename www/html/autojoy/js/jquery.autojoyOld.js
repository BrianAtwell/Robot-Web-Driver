//Title: AutoJoy By Brian Atwell
//Documentation: 
//Author: Brian Atwell
//Website: 

(function ($) {

    $.fn.autojoy = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
			
            $.error('Method ' + method + ' does not exists.');
        }
    };

    var methods = {},

    //Set defauls for the control
    defaults = {
		canvasWidth: 200,
		canvasHeight: 200,
		playWidth: null,
		playHeight: null,
		playColor: "yellow",
		playImg: "url",
		stickWidth: 75,
		stickHeight: 75,
		stickColor: "yellow",
		stickImg: "url"
    },

    ajCanvasHtml	= '<canvas class="autojoy-canvas"></canvas>',

    //Public methods 
    methods.init = function (userOptions) {
        //Preserve the original defaults by passing an empty object as the target
        //The object is used to get global flags like embedCSS.
        var options = $.extend({}, defaults, userOptions);

        //Apply on all selected elements
        return this.each(function () {
            //Preserve the original defaults by passing an empty object as the target 
            //The object is used to save drop-down's corresponding settings and data.
            var options = $.extend({}, defaults, userOptions);
            
            var obj = $(this),
                data = obj.data('autojoy');
            //If the plugin has not been initialized yet
            if (!data) {
				
				//Replace HTML select with empty placeholder, keep the original
                var original = obj, placeholder = $('<div').attr('id', obj.attr('id') + '-dd-placeholder');
                obj.replaceWith(placeholder);
                obj = placeholder;

                //Add classes and append ajCanvasHtml
                obj.addClass('apContainer').append(ajCanvasHtml);
				
				//Get newly created ddOptions and ddSelect to manipulate
                var ajCanvas = obj.find('.autojoy-canvas');

                //Set widths
                ajCanvas.css({ width: options.canvasWidth });
                //obj.css({ width: options.width });

                //Set height
                if (options.height != null)
                    ddOptions.css({ height: options.height, overflow: 'auto' });

                //Save plugin data.
                var pluginData = {
                    settings: options,
                    original: original,
                    selectedIndex: -1,
                    selectedItem: null,
                    selectedData: null
                }
                obj.data('autojoy', pluginData);

                //EVENTS
            }
        });
    };

})(jQuery);
