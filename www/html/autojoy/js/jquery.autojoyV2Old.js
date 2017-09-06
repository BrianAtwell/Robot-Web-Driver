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
		playWidth:200,
		playHeight:200,
		playX:0,
		playY:0,
		stickX: 0,
		stickY: 0,
		stickWidth:75,
		stickHeight:75,
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
				canvasObj = null;
				
				if(obj[0].tagName == "CANVAS")
				{
					canvasObj=obj;
				}
				else
				{
					canvasObj=obj.find("canvas:first");
					if(canvasObj.length != 1)
					{
						obj.append('<canvas></canvas>');
						canvasObj=obj.find("canvas:first");
					}
				}
				
				var playArea = {}, stick = {};
				
				playArea.width = function()
				{
					if(arguments.length == 0)
					{
						return options["playWidth"];
					}
					else if(arguments.length == 1)
					{
						options["playWidth"]=arguments[0];
						playArea.onDraw();
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
							left: canvasObj.offset().left+options[playX], 
							top:canvasObj.offset().top+options[playY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[playX]=offsetObj.left-canvasObj.offset().left;
							options[playY]=offsetObj.top-canvasObj.offset().top;
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
							left: canvasObj.offset().left+options[stickX], 
							top: canvasObj.offset().top+options[stickY]
						};
					}
					else if(arguments.length == 1)
					{
						var offsetObj=arguments[0];
						if(typeof offsetObj === 'object' && offsetObj.left && offsetObj.top)
						{
							options[stickX]=offsetObj.left-canvasObj.offset().left;
							options[stickY]=offsetObj.top-canvasObj.offset().top;
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
					"canvasObj": canvasObj,
					"playAreaObj": playArea,
					"stickObj": stick
                };
                obj.data(pluginName, pluginData);
				
				if(!canvasObj.hasClass("autojoy-canvas"))
				{
					canvasObj.addClass("autojoy-canvas");
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
			return data["canvasObj"].offset().left+data["settings"].playX;
		}
		
		function playY(data)
		{
			return data["canvasObj"].offset().top+data["settings"].playY;
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