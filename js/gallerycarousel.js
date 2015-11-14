/**
 * @package Module GalleryCarousel for Joomla! 2.5
 * @version $Id: mod_gallerycarousel.php 1.2.1 2014-07-22 23:26:33Z $
 * @author Kian William Nowrouzian
 * @copyright (C) 2014- Kian William Nowrouzian
 * @license GNU/GPLv3 http://www.gnu.org/licenses/gpl-3.0.html
 
 This file is part of gallerycarousel.
    gallerycarousel is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    gallerycarousel is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with gallerycarousl.  If not, see <http://www.gnu.org/licenses/>. 
**/ 



(function($){
$.fn.Pendule = function(opts){	
			var $container = $(this);
			var options = $.extend($.fn.Pendule.defaults, opts);
			var acc = new Acoordionb($container, options);
			acc.callAutoB(options);
			$(this).children('#next').hide();
			$(this).children('#prev').hide();
}

function Acoordionb($container, options)
{
	var obj = this;
	this.which = 0;
	this.intervalA;
	this.intervalB;
	this.direction=0;
	this.leftDir;
	this.indexMess = 0;
	this.flag = 0;

	$container.css({position:'relative', width:options.width+'px', height:options.height+'px', backgroundColor:options.backgroundColor, border:'1px solid '+options.borderColor,overflow:'hidden', marginLeft:'auto', marginRight:'auto', textAlign:'center'});
	
	var h, divh, myfontsize;
	
	if(parseInt(options.height)<=parseInt(options.width))
	{
	 h = parseInt(options.height)*0.16	
	 divh =  parseInt(options.height) * 0.7;
	 myfontsize = h * 0.5;
	}
	else
		if(parseInt(options.height)>parseInt(options.width))
		{
			h = parseInt(options.height)*0.13;
			divh =  parseInt(options.height) * 0.83;
			myfontsize = h * 0.22;
		}	
	$('<span>').css({position:'absolute', left:0, top:0, zIndex:1000, width:options.width+'px', height:h+'px', backgroundColor:'#000000', opacity:0.4, textAlign:'center', color:'white', fontSize:myfontsize+'px'}).text(options.descs[0]).appendTo($container);
	$("<div id='con'>").css({position:'absolute', left:0, top:0,width:options.width+'px', height:divh+'px'}).appendTo($container);
	var li=0;
	for(var i=0; i<options.imgs.length; i++)
	{
		$('<img>').css({position:'absolute', left:li+'px', top:0, width:options.width+'px', height:divh+'px'}).attr("src", options.imgs[i]).appendTo('#con');
		li+=parseInt(options.width);
	}
	var j;
	for(i=options.imgs.length-1;i>=0; i--)
	{
	j=i+1;
		$("<a href='javascript:void()' id='l"+i+"' num='"+i+"' >["+j+"]</a>").css({position:'relative',top:divh+'px', textDecoration:'none'}).bind('click', function(){obj.moveDirect(parseInt($(this).attr('num')));}).appendTo($container).hide();
	}
	
	$('<br>').appendTo($container);
	$("<button id='prev'>Prev</button>").bind('click', function(){obj.moveBackManual();}).css({marginTop:divh+'px'}).appendTo($container);
	$("<button id='auto'>Manual</button>").css({marginTop:divh+'px'}).appendTo($container);
	$("<button id='next'>Next</button>").bind('click', function(){obj.moveForwardManual();}).css({marginTop:divh+'px'}).appendTo($container);
	
	$('#auto').bind('click', function(){
	
		if(obj.which==0)
		{
		
			clearInterval(obj.intervalA);
			clearInterval(obj.intervalB);
			obj.which=1;
			obj.leftDir = parseInt($container.find('#con').css('left'));
			
			$(this).text('Auto');
			if(obj.leftDir==0)
			{
			$(this).next().show();
			}
			else
				if(obj.leftDir==(-(options.imgs.length-1) * parseInt(options.width) ))
				{
				 $(this).prev().show();
				}
				else
				{
					$(this).prev().show();
			        $(this).next().show();
				}
			
			$(this).parent().children("a").show();
			
		}
		else
		{
			obj.which=0;
			
			$(this).text('Manual');
			$(this).prev().hide();
			$(this).next().hide();
			$(this).parent().children("a").hide();
			var l = parseInt($(this).parent().children('#con').css('left'));
			
					if( l==(-1)*(options.imgs.length-1)*parseInt(options.width))
					{
				      obj.callAutoA(options);
					}						
				    else
				     if( l==0)
					{
									
						obj.callAutoB(options);
					}
					else
					{
					    if(obj.direction==1)
					    {
							obj.callAutoA(options);
						}
						else
					    {
							obj.callAutoB(options);
						}
					}
			
		}
	
	});
	
	this.moveDirect = function(index){	
	var l = parseInt($('#con').css('left'));	
	var num =Math.abs(( l/parseInt(options.width)));	
	$container.children('#next').hide();
	$container.children('#auto').hide();
	$container.children('#prev').hide();
	$container.children('a').hide();
	$container.children('span').text(options.descs[index]);	
		finalLeft = (num-index)*parseInt(options.width);
	obj.indexMess = parseInt(index);		
	$('#con').animate({left:"+="+finalLeft}, 500, function(){
	$container.children('a').show();
	$container.children('#auto').show();
	  if(index==0)
	  {
		$container.children('#next').show();		
	  }
	  else
		if(index==3)
		{
			$container.children('#prev').show();	
		}
		else
		{
				$container.children('#prev').show();
				$container.children('#next').show();		
		}
	
	});	
	}
	this.moveForward=function(){
	obj.direction = 0;	
	$container.children('#auto').hide();	
	if(obj.indexMess<options.descs.length-1)
		obj.indexMess++;
	$container.children("span").text(options.descs[obj.indexMess]);
	   var l = parseInt(options.width);
	   $container.find('#con').animate({left:"-="+l}, 500, function(){		
			if(parseInt($(this).css("left"))==l*(-1)* (options.imgs.length-1))
			{
				clearInterval(obj.intervalB);
				obj.callAutoA(options);
				obj.direction=1;
			}			
			$container.children('#auto').show();	   
	   });	
	}
	this.moveForwardManual=function(){
	obj.direction = 0;
	$container.children('#next').hide();
	$container.children('#auto').hide();
	$container.children('#prev').hide();
	$container.children('a').hide();
	if(obj.indexMess<options.descs.length-1)
		obj.indexMess++;
	   $container.children("span").text(options.descs[obj.indexMess]);
	   var l = parseInt(options.width);
	   $container.find('#con').animate({left:"-="+l}, 500, function(){		
			if(parseInt($(this).css("left"))==l*(-1)* (options.imgs.length-1))
			{
				
				obj.direction=1;
				$container.children('#next').hide();
			}
			else
			{
			  $container.children('#next').show();
			}
			
	        $container.children('#auto').show();
	        $container.children('#prev').show();
	        $container.children('a').show();	   
	   });	
	}
	this.moveBack=function(){
	obj.direction = 1;	 
	 $container.children('#auto').hide();
	if(obj.indexMess>0)
		obj.indexMess--;	
	 $container.children("span").text(options.descs[obj.indexMess]);
	var l = parseInt(options.width);
	   $container.find('#con').animate({left:"+="+l}, 500, function(){			
			if(parseInt($(this).css("left"))==0)
			{
				  clearInterval(obj.intervalA);
				  obj.callAutoB(options);
				obj.direction=0;
			}			
			$container.children('#auto').show();			
	   });
	}
	this.moveBackManual = function()
	{
		obj.direction = 1;
	    $container.children('#next').hide();
	    $container.children('#auto').hide();
	    $container.children('#prev').hide();
	    $container.children('a').hide();	 
	    if(obj.indexMess>0)
		   obj.indexMess--;	
	    $container.children("span").text(options.descs[obj.indexMess]);
	    var l = parseInt(options.width);
	   $container.find('#con').animate({left:"+="+l}, 500, function(){			
			if(parseInt($(this).css("left"))==0)
			{
				 
				  obj.direction=0;
				  $container.children('#prev').hide();
			}
			else
			{
				  $container.children('#prev').show();
			}			
		    $container.children('#auto').show();
	        $container.children('#next').show();
	        $container.children('a').show();	   
			
	   });
	}
}
Acoordionb.prototype.callAutoA = function(options){
	var obj = this;
	obj.intervalA=setInterval(function(){obj.moveBack()}, options.velocity);
}
Acoordionb.prototype.callAutoB = function(options){
	var obj = this;
	obj.intervalB=setInterval(function(){obj.moveForward()}, options.velocity);
}

}(jQuery))