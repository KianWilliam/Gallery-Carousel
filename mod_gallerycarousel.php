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
defined('_JEXEC') or die('Access Restricted');
require_once(dirname(__FILE__).DS.'helper.php');

$galleryWidth = $params->get('txtW');
$galleryHeight = $params->get('txtH');

if(intval($galleryWidth)>=intval($galleryHeight))
{
	if(intval($galleryWidth)<190 or intval($galleryHeight)<130)
	{
		$galleryWidth = '190';
		$galleryHeight = '130';
	}
	else
	{
		$galleryHeight = intval($galleryWidth)/1.45;
	}
}
else
	if(intval($galleryWidth)<intval($galleryHeight))
	{
		if(intval($galleryWidth)<130 or intval($galleryHeight)<190)
	    {
		 $galleryHeight = '190';
		 $galleryWidth = '130';
	    }
		else
		{
			$galleryWidth = intval($galleryHeight)/1.45;
		}
	}


$galleryColor = $params->get('clr');
$velocity = $params->get('tm');

if(intval($velocity)<1000)
{
	$velocity = 1000;
}
$images = array();
$descs = array();
$counter=0;
for($i=1; $i<=10; $i++)
{
	if($params->get('myimages'.$i)!="")
	{
	   $images[] =JURI::base().$params->get('myimages'.$i);
	}
	if($params->get('imgtext'.$i)!="")
	{
	  $descs[] = $params->get('imgtext'.$i);
	}
	
}


require_once(JModuleHelper::getLayoutPath('mod_gallerycarousel'));
?>