//Title: AutoJoy
//Author: Brian Atwell
//Creation Date: 7-19-2016

(function($) {
	
	// jQuery access
	$.fn.autojoy = function(method) {
		if(methods[method])
		{
			return methods[method].apply(this, arguments);
		}
		else if(typeof method === 'object' || !method )
		{
			return methods.init.apply(this, arguments);
		}
		else
		{
			$.error(pluginName+" Mehtod"+method+"does not exists!");
		}
	};
	
	var methods = {},
	
	pluginName="autojoy",
	
	//Set defauls for the control
    defaults = {
		backWidth:200,
		backHeight:200,
		// X +/- Offset from center
		stickXOffset: 0,
		// Y +/- Offset from center
		stickYOffset: 0,
		stickDimOption: "P",
		stickWidth:0.75,
		stickHeight:0.75
    };
	
	methods.init = function(locOptions) {
		
		return $(this).each(function() {
			
			var options=$.extend({}, defaults, locOptions);
		
			var obj=$(this),
				data=obj.data(pluginName);
			
			if(!data)
			{
				//plugin has not been initialized on this object
				var original = obj,
				containerObj = null;
				
				if(obj[0].hasClass("autojoy"))
				{
					containerObj=obj;
				}
				else
				{
					obj.find(".autojoy").length;
					obj.add("<div class=\"autojoy\"></div>");
					containerObj=obj.find(".autojoy");
					if(containerObj.length != 1)
					{
						obj.addClass("autojoy");
					}
				}
				
				var backArea = {}, stick = {};
				
				backArea.width = function()
				{
					if(arguments.length == 0)
					{
						return options["playWidth"];
					}
					else if(arguments.length == 1)
					{
						options["playWidth"]=arguments[0];
						backArea.onDraw();
					}
				};
				  
				playArea.height = function()
				{
					if(arguments.length == 0)
					{
						return options["playHeight"];
					}
					else if(arguments.length == 1)
					{
						options["playHeight"]=arguments[0];
						playArea.onDraw();
					}
				};
				
				playArea.offset = function()
				{
					if(arguments.length == 0)
					{
						return {
							left: containerObj.offset().left+options[playX], 
							top:containerObj.offset().top+options[playY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[playX]=offsetObj.left-containerObj.offset().left;
							options[playY]=offsetObj.top-containerObj.offset().top;
							playArea.onDraw();
						}
					}
					
				};
				
				playArea.position = function()
				{
					if(arguments.length == 0)
					{
						return {
							left: options[playX], 
							top: options[playY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[playX]=offsetObj.left;
							options[playY]=offsetObj.top;
							playArea.onDraw();
						}
					}
				};
				
				playArea.onDraw = function()
				{
					stick.onDraw();
				};
				
				stick.width = function()
				{
					if(arguments.length == 0)
					{
						return options["stickWidth"];
					}
					else if(arguments.length == 1)
					{
						options["stickWidth"]=arguments[0];
						stick.onDraw();
					}
				};
				
				stick.height = function()
				{
					if(arguments.length == 0)
					{
						return options["stickHeight"];
					}
					else if(arguments.length == 1)
					{
						options["stickHeight"]=arguments[0];
						stick.onDraw();
					}
				};
				
				stick.offset = function()
				{
					if(arguments.length == 0)
					{
						return {
							left: containerObj.offset().left+options[stickX], 
							top: containerObj.offset().top+options[stickY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[stickX]=offsetObj.left-containerObj.offset().left;
							options[stickY]=offsetObj.top-containerObj.offset().top;
							stick.onDraw();
						}
					}
				};
				
				stick.position = function()
				{
					if(arguments.length == 0)
					{
						return {
							left: options[stickX], 
							top: options[stickY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[stickX]=offsetObj.left;
							options[stickY]=offsetObj.top;
							stick.onDraw();
						}
					}
				};
				
				stick.onDraw = function()
				{
				};
				
				
				//Save plugin data.
                var pluginData = {
                    settings: options,
                    original: obj,
					"containerObj": containerObj,
					"playAreaObj": playArea,
					"stickObj": stick
                };
                obj.data(pluginName, pluginData);
				
				if(!containerObj.hasClass("autojoy-canvas"))
				{
					containerObj.addClass("autojoy-canvas");
				}
				
				$(document).on('touchstart mousedown', 'canvas.autojoy-canvas',function (event){
					console.log(event);
					$(".outputDIV").append("<strong>event type:</strong> "+event.type+"<br>");
					event.stopPropagation();
					event.preventDefault();
					if(event.handled !== true) {

						// Do your magic here.
						// If touch/mouse is inside stick play area, then set stick position
						if(event.clientX <)

						event.handled = true;
					} else {
						return false;
					}
				});
			}
		}),
		
		function playX(data)
		{
			return data["containerObj"].offset().left+data["settings"].playX;
		}
		
		function playY(data)
		{
			return data["containerObj"].offset().top+data["settings"].playY;
		}
		
		function playWidth(data)
		{
			
		}
		
		function playHeight(data)
		{
			
		}
		
		function isXInsidePlayArea(data, x) {
			return x >= playX(data) && x <= playX(data)+data["settings"].playWidth;
		}
		
		function isYInsidePlayArea(obj, y) {
			return y >= playY(data) && y <= playY(data)+data["settings"].playHeight;
		}
	};

})(jQuery);