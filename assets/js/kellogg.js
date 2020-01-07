
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
        		 //console.log('isMobile');
                 //$('.gu_tab_depth4').height(28);
                 //$('#LNB .lnb_inner .lnb_cnt').addClass('isMobile')
             }else{
            	 console.log('pc');
                 //$('#LNB .lnb_inner .lnb_cnt').removeClass('isMobile')
             }
        }
	}

})();
CommonJs.init();

var Gnb = (function(){
	function init(){
		//$(window).scroll(scrollEvent);
		eventListener();
		if(!CommonJs.isMobile()) {
			
			//$('#LNB .lnb_cnt').nanoScroller();
		}
		
	}
	function resizeEvent(){
		
	}
	function scrollEvent(){
		
	}
	function eventListener(){
		/* lnb active */
        /*$('.menu_close').on('click', function(){
            closeLnb();
            //if(!CommonJs.isMobile()) $('body').removeClass('stop');
        });*/
		
        $('.menu_open').on('click', function(){
        	console.log('gnb 보이나요?');
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

        });
	}
	function closeLnb(){
		
	}
	function gnbActive(){
		
	}
	
    init();
})();