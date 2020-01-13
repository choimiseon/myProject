
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
        	/***************************
        	* mobile/tablet check *
        	***************************/
        	if(CommonJs.isMobile() == false) { // pc
        		$('body').removeClass('isMobile');
        	}else{ // isMobile
        		$('body').addClass('isMobile');
        	}
        	
        	/***************************
        	* main slider *
        	***************************/
        	var swiperTarget = [".sec_main .swiper-container"];
        	var swiper;
        	$.each(swiperTarget, function (i, target) {
        		var swiperOption = {
        			speed : 600,
        			loop: true,
        			navigation: {
        				nextEl: '.swiper-button-next',
        		        prevEl: '.swiper-button-prev',
        			},
        			autoplay: {
        		        delay: 4000,
        		        disableOnInteraction: false,
        			}
        		}
        		if (i == 0) {
        			swiperOption["pagination"] = {
        				el: '.swiper-pagination',
        				clickable: true
        			}
        		}
        		swiper = new Swiper(target, swiperOption);
        	});
        	
        	/***************************
        	* Activate current page *
        	***************************/
        	var k_$title = $('.area_index_title h3').text(),
        		k_$nav = $('.gnb a:contains("'+k_$title+'")'),
        		k_$depth1 = k_$nav.parent(),
        		k_$depth2 = k_$nav.parent().parent().prev();
        	
        	if(!k_$title) {return false;}
        	if(k_$depth2.attr('class') == 'k_icon'){
        		k_$nav.parent().addClass('current');
        		k_$depth2.parent().addClass('current');
        	} else {
        		k_$depth1.addClass('current');
        	}
        	
        }
	}

})();
CommonJs.init();
var Gnb = (function(){
	var k_$header = $('#header'),
	 	k_$menu = k_$header.find('#menu_aside');
		k_$gnb = k_$header.find('.gnb');
		
	function init(){
		resizeEvent();
		$(window).resize(resizeEvent);
		$(window).scroll(scrollEvent);
		eventListener();
		gnbActive();
		//if(!CommonJs.isMobile()) $('#LNB .lnb_cnt')
		//$('.gnb_inner').nanoScroller();
	}
	
	function eventListener(){
		
		/* m gnb active */
		$('.menu_open').on('click', function(){
			k_$menu.addClass('active');
			$('body').addClass('isMobile').addClass('dim');
        });
        $('.menu_close').on('click', function(){
            closeLnb();
            //if(!CommonJs.isMobile()) $('body').removeClass('stop');
        });
		
		/***************************
    	* m gnb accordion *
    	***************************/
        k_$menu.find('.gnb li > a').on('click',function(e){
        	if($(this).hasClass('k_icon')){
        		e.preventDefault();
                if($(this).hasClass('active')){
                	k_$menu.find('.gnb li > a').removeClass('active');
                	k_$menu.find('.gnb li > ul').stop().slideUp(200);
                	console.log('if');
                }else{
                	k_$menu.find('.gnb li > a').removeClass('active');
                	k_$menu.find('.gnb li > ul').stop().slideUp(200);
                    $(this).addClass('active');
                    $(this).next('ul').stop().slideDown();
                    console.log('else');
                }
        	}
        });
	}
	
	function resizeEvent(){
		if(CommonJs.isMobile() == false){ // pc
        	$('.gnb_inner').height('80');
        	closeLnb();
        	k_$menu.find('.gnb li > a').off('click');
			k_$menu.find('.gnb > li').on('mouseenter focusin mouseleave focusout');
			
			k_$menu.find('.gnb > li').on('mouseenter focusin',function(){
				var k_$depth2 = $(this).find('a').next('ul').outerWidth() - $(this).find('a').outerWidth();
				$(this).find('a').addClass('active');
				$(this).find('a').next('ul').stop().slideDown(200).css({'left': - k_$depth2}); // depth2 > depth1 오른 쪽 끝에 맞추기
				
        	}).on('mouseleave focusout',function(){
    			k_$menu.find('.gnb li > a').removeClass('active');
            	k_$menu.find('.gnb li > ul').stop().slideUp(200);
        	});
        	
        } else { // isMobile
			k_$menu.find('.gnb li > a').on('click');
			k_$menu.find('.gnb > li').off('mouseenter focusin mouseleave focusout');
			
        	
            
            k_$windowH = $(window).outerHeight()
            k_$menu.height(k_$windowH);
            //$('.gnb_inner').height(k_$windowH - 129).nanoScroller({ tabIndex: 0 });
            
            //$(".gnb").nanoScroller();
            
        }
	}
	
	/***************************
	* menu reset *
	***************************/
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