<?php
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
?>
<?php 
$document = &JFactory::getDocument();
$document->addStyleSheet(JURI::Base()."modules/mod_gallerycarousel/css/mystyles.css");
$document->addScript(JURI::Base()."modules/mod_gallerycarousel/js/jquery.js");
$noConf = "var KW=jQuery.noConflict();";
$document->addScriptDeclaration($noConf);
$document->addScript(JURI::Base()."modules/mod_gallerycarousel/js/gallerycarousel.js");
$js="
KW(document).ready(function(){
	KW('#containerb').Pendule({width:'".$galleryWidth."', height:'".$galleryHeight."', backgroundColor:'".$galleryColor."', velocity:'".$velocity."'});
});
var imgs = ".json_encode($images).";
var desc = ".json_encode($descs).";
KW.fn.Pendule.defaults={};
KW.fn.Pendule.defaults.imgs=[];
KW.fn.Pendule.defaults.descs=[];
	for(var i=0; i<imgs.length; i++)
	{
		KW.fn.Pendule.defaults.imgs[i]=imgs[i];
		KW.fn.Pendule.defaults.descs[i]=desc[i];
	}
KW.fn.Pendule.defaults.width='190px';
KW.fn.Pendule.defaults.height='129px';
KW.fn.Pendule.defaults.backgroundColor='#a5307a';
KW.fn.Pendule.defaults.borderColor='#e71e9e';
KW.fn.Pendule.defaults.velocity=3500;
";
$document->addScriptDeclaration($js);
?>
<div id="containerb"></div>