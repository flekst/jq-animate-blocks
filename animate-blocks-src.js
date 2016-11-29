/** Animate Blocks — script for create the animatinon of the html blocks rendering.
    Copyright (C) 2016  Eugeny Borisov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

/** 
Функция, которая даёт анимацию блокам с классом anim
Дополнительно можно установить атрибут  AnimSpeed для изменения скорости анимации в милисекундах
	Пример использования:
		<div class="anim" AnimSpeed="10000" style="background-color:#c0e38d; "  >
			<h1 ><span style="color: rgb(118, 146, 60);">Этот текст будет всплывать аж 10 секунд</span></h1>
		</div>
*/ 
{
function animateBlocks(){
	var animateBlocksDefaultTime=500; /* Стандартное время анимации */
	var animatedBlockInfelicity = 100; /* погрешность в пикселях, сверху-снизу экрана */
	var animatedBlockSkipOffset = animatedBlockInfelicity+300 /** Отступ, при котором блок не обрабатывается */
	var classNamesToAnimate = $(".anim"); /** Классы, которые будут анимироваться через запятую */

	/** Если не с чем работать, то отключаемся от событий скролла и ресайза */
	if(!classNamesToAnimate.length) {
		$(window).unbind('scroll', animateBlocks);
		$(window).unbind('resize', animateBlocks);
		return;
	}
	
	classNamesToAnimate.each(function() 
	{

		/** переменные относительно начала страницы */
		var blockTop 		=  $(this).offset().top;		/** Верхний край блока */
		var blockBottom		=  blockTop + $(this).height(); /** Нижний край блока */
		var screenTop		=  $(window).scrollTop();		/** всё, что выше экрана */
		var screenBottom	= screenTop + $(window).innerHeight();	/** нижний край экрана */

		
		/** Отключаем невидимые блоки с поправкой на погрешность. 
			блок за экраном, его верхний край выше нижнего края экрана 
			или нижний край выше верхнего края экрана

			Например, FireFox выдаёт в качестве высоты окна не вьюпорт (содержимое),
			а какую-то ерунду, похоже, учитывающую высоту панели инструментов */
		
		if (  (blockTop > (screenBottom+animatedBlockSkipOffset))
		    ||(blockBottom < (screenTop-animatedBlockSkipOffset))
		    ) { return ; }
		
		if (  (blockTop > (screenBottom+animatedBlockInfelicity))
		    ||(blockBottom < (screenTop-animatedBlockInfelicity))
		    ) {
		    	$(this).stop().fadeTo(0.0,0.0);	
		    	
		    } else {
			var speed = parseInt($(this).attr('AnimSpeed'));
			if (!speed) speed = animateBlocksDefaultTime;
			$(this).stop().fadeTo(speed, 1);
		    }
	});
}		

    /** По готовности страницы добавляем анимацию на скролл и ресайз, исключая мобильники */
    $(document).ready(function(){
    		var MobileAgentRegexp = new RegExp('Android|webOS|iP(hone|[oa]d)|BlackBerry|Mobile|Opera Mini');
		var animationDisabled = MobileAgentRegexp.test(navigator.userAgent);
		if (!animationDisabled){
			animateBlocks();
			$(window).bind('scroll', animateBlocks);
			$(window).bind('resize', animateBlocks);
		}
    });
} 
