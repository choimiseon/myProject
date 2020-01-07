
var CommonJs = (function(){
	return{
		isMobile:function(){
            /*var UserAgent = navigator.userAgent;
            if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){
                return true;
            }else{
                return false;
            }*/
			var userSize = $(window).innerWidth();
			//console.log(userSize);
			if (userSize <= 1279){
                return true;
            }else{
                return false;
            }
        },
        init:function(){
        	 if(CommonJs.isMobile() == true) {
        		 console.log('isMobile');
        		 $('body').addClass('isMobile');
        		 
             }else{
            	 console.log('pc');
            	 $('body').removeClass('isMobile');
            	 
             }
        	 
        }
	}

})();
CommonJs.init();

var Gnb = (function(){
	var k_$header = $('#header'),
	 	k_$menu = k_$header.find('#menu_aside'),
	 	k_$gnb = k_$menu.find('.gnb');
	 var resizeGnb = false;
	
	function init(){
		resizeEvent();
		$(window).resize(resizeEvent);
		$(window).scroll(scrollEvent);
		eventListener();
		gnbActive();
		
		//if(!CommonJs.isMobile()) {
			
			//$('#LNB .lnb_cnt').nanoScroller();
		//}
		
	}
	function resizeEvent(){
		//CommonJs.init();
		if ($(window).innerWidth() <= 1279){
            var windowH = window.innerHeight;

            k_$menu.attr('height', windowH + 'px');

            /*if(!g_$lnbCntNavi.hasClass('on') && !resizeGnb){
                
                resizeGnb = true;
            }*/
        }else{
            resizeGnb = false;
            //g_lnbBg = 0;
            //g_$lnbLiPc.find('a').eq(0).trigger('click');
        }
	}
	function scrollEvent(){
		
	}
	function eventListener(){
		/* lnb active */
		$('.menu_open').on('click', function(){
			k_$menu.addClass('active');
			$('body').addClass('dim');
        });
        $('.menu_close').on('click', function(){
            closeLnb();
            //if(!CommonJs.isMobile()) $('body').removeClass('stop');
        });
		
		
        //$('.menu_open').on('click', function(){
        	
            //$('body').addClass('isMobile');
            //$('#LNB .lnb_cnt').height(window.innerHeight - $('#LNB .lnb_tab').innerHeight());

            //if($(window).innerWidth()>1080){
                //g_$lnbCntPc.eq(0).addClass('on');
                //g_$lnbLiPc.find('a').eq(0).addClass('on');
            //}else{
                //g_$lnbCntNavi.addClass('on');
                //g_$lnb.find('.tab_area ul li.li_lnb_navi a').addClass('on');
            //}
            //if(!CommonJs.isMobile()) $('#LNB .lnb_cnt').nanoScroller();
            //if(!CommonJs.isMobile()) $('body').addClass('stop');

        //});
	}
	function closeLnb(){
		k_$menu.removeClass('active');
		$('body').removeClass('dim');
	}
	function gnbActive(){
		
	}
	
    init();
})();