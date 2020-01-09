
var CommonJs = (function(){
	return{
		isMobile:function(){
			var userSize = $(window).innerWidth();
			if (userSize <= 1179){
                return true;
            }else{
                return false;
            }
        },
        init:function(){
        	/*var swiperTarget = [".main .swiper-container"];
        	var swiper;
        	$.each(swiperTarget, function (i, target) {
        		var swiperOption = {
        			speed : 600
        			, loop: true
        			
        			, navigation: {
        				nextEl: '.swiper-button-next',
        		        prevEl: '.swiper-button-prev',
        			}
        			, autoplay: {
        		        delay: 4000,
        		        disableOnInteraction: false,
        			}
        		}
        		if (i == 0) {
        			swiperOption["pagination"] = {
        					el: '.swiper-pagination'
        					, clickable: true
        			}
        		}
        		swiper = new Swiper(target, swiperOption);
        	});*/
        	
        	$('.slider').bxSlider({
        		responsive:true
        	});
        	
        	if(CommonJs.isMobile() == false) { // pc
        		$('body').removeClass('isMobile');
        	}else{ // isMobile
        		$('body').addClass('isMobile');
        	}
        }
	}

})();
CommonJs.init();
var Gnb = (function(){
	var k_$header = $('#header'),
	 	k_$menu = k_$header.find('#menu_aside');

	function init(){
		eventListener();
		$(window).resize(eventListener);
		$(window).scroll(scrollEvent);
		gnbActive();
	}
	
	function eventListener(){
        if(CommonJs.isMobile() == false){ // pc
        	closeLnb();
        	k_$menu.find('.gnb li > a').off('click');
			k_$menu.find('.gnb > li').on('mouseenter focusin mouseleave focusout');
			
			k_$menu.find('.gnb > li').on('mouseenter focusin',function(){
				var k_$depth2 = $(this).find('a').next('ul').outerWidth() - $(this).find('a').outerWidth();
				
				$(this).find('a').addClass('active');
				$(this).find('a').next('ul').stop().slideDown(200).css({'left': - k_$depth2});
				
				//$(this).find('a').next('ul').css({'left': - depth3});
        	}).on('mouseleave focusout',function(){
    			k_$menu.find('.gnb li > a').removeClass('active');
            	k_$menu.find('.gnb li > ul').stop().slideUp(200);
        	});
        	
        } else { // isMobile
        	var windowH = window.innerHeight;
			k_$menu.attr('height', windowH + 'px');
			
			k_$menu.find('.gnb li > a').on('click');
			k_$menu.find('.gnb > li').off('mouseenter focusin mouseleave focusout');
			
        	/* m gnb active */
    		$('.menu_open').on('click', function(){
    			k_$menu.addClass('active');
    			$('body').addClass('isMobile').addClass('dim');
            });
            $('.menu_close').on('click', function(){
                closeLnb();
                //if(!CommonJs.isMobile()) $('body').removeClass('stop');
            });
            
            /* m gnb accordion */
            k_$menu.find('.gnb li > a').on('click',function(e){
            	if($(this).hasClass('k_icon')){
            		e.preventDefault();
                    if($(this).hasClass('active')){
                    	k_$menu.find('.gnb li > a').removeClass('active');
                    	k_$menu.find('.gnb li > ul').stop().slideUp(200);
                    }else{
                    	k_$menu.find('.gnb li > a').removeClass('active');
                    	k_$menu.find('.gnb li > ul').stop().slideUp(200);
                        $(this).addClass('active');
                        $(this).next('ul').stop().slideDown();
                    }
            	}
            });
			
        }
        
	}
	
	function closeLnb(){
		k_$menu.removeClass('active');
		k_$menu.find('.gnb li > a').removeClass('active');
		k_$menu.find('.gnb li > ul').stop().css({'display':'none'});
		$('body').removeClass('isMobile').removeClass('dim');
	}
	
	function scrollEvent(){
		var pageTop = $('.top');
		
		pageTop.on('click', function(){//top button
			$('html,body').stop(true,false).animate({
				scrollTop:0
			},1000,'easeInOutQuint')
			return false;
		})
	}
	function gnbActive(){
		
	}
	
    init();
})();