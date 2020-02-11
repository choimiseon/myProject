
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
        	if(CommonJs.isMobile() == false) { // desktop
        		$('body').removeClass('isMobile');
        	}else{ // isMobile
        		$('body').addClass('isMobile');
        	}
        	
        	/***************************
        	* main slider *
        	***************************/
        	var swiperTarget = [".sec_visual .swiper-container"];
        	var swiper;
        	$.each(swiperTarget, function (i, target) {
        		var swiperOption = {
        			speed : 600,
        			loop: true,
        			navigation: {
        				nextEl: '.swiper-button-next',
        		        prevEl: '.swiper-button-prev',
        			},
        			autoplay: false,
        			simulateTouch: false,
        			followFinger: false,
        			shortSwipes: false,
        			longSwipes: false
        		}
        		swiper = new Swiper(target, swiperOption);
        	});
        	
        	/***************************
        	* Activate current page *
        	***************************/
        	/*var k_$title = $('.area_index_title h3').text(),
        		k_$nav = $('.gnb a:contains("'+k_$title+'")'),
        		k_$depth1 = k_$nav.parent(),
        		k_$depth2 = k_$nav.parent().parent().prev();
        	
        	if(!k_$title) {return false;}
        	if(k_$depth2.attr('class') == 'btn'){
        		k_$nav.parent().addClass('current');
        		k_$depth2.parent().addClass('current');
        	} else {
        		k_$depth1.addClass('current');
        	}*/
        	
        }
	}

})();
CommonJs.init();
var Interaction = (function(){
	var k_$wrap = $('#wrap'),
		k_$header = $('#header'),
	 	k_$menu = k_$header.find('#menu_aside');
		k_$gnb = k_$header.find('.gnb_inner');
		
		
	function init(){
		eventListener();
		resizeEvent();
		$(window).resize(resizeEvent);
		$(window).scroll(scrollEvent);
		language();
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
    	* footer 확장 *
    	***************************/
        $('.foot_open').on('click', function(){
        	var footOpen = $('#footer .info_detail');
        	if(footOpen.hasClass('open')){
        		footOpen.removeClass('open');
        		$(this).removeClass('open');
        		$('.info_base .language').removeClass('open');
        	} else {
        		footOpen.addClass('open');
        		$(this).addClass('open');
        		$('.info_base .language').addClass('open');
        	}
        });
        
        /***************************
    	* 제품 검색 텍스트 clear *
    	***************************/
        var k_$ipt = $('.searchinput'),
	    	k_$clearIpt = $('.searchclear');
        
		k_$ipt.off().on('keyup',function(e){
			$(".searchclear").toggle(Boolean($(this).val()));
		});
		k_$clearIpt.toggle(Boolean(k_$ipt.val()));
		k_$clearIpt.off().on('click',function(e){
		  $(".searchinput").val('').focus();
		  $(this).hide();
		});
		
		/***************************
    	* 영양 성분표 자세히보기 *
    	***************************/
		$('.nutritional_open').off().on('click',function(e){
			if($(this).hasClass('open')){
				$(this).removeClass('open');
				$('.nutritional_info_inner').removeClass('open');
			} else {
				$(this).addClass('open');
				$('.nutritional_info_inner').addClass('open');
			}
			
		})
        
	}
	
	function resizeEvent(){
		if(CommonJs.isMobile() == false){ // desktop
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
			
			
            /***************************
        	* m gnb accordion *
        	***************************/
            k_$menu.find('.gnb li > a').off().on('click',function(e){
            	if($(this).hasClass('btn')){
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
            
            k_$gnb.height(window.innerHeight - ($('.close_wrap').height() + $('.link_biz').height()));
            if(CommonJs.isMobile()) $(".gnb_inner").nanoScroller();
            
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
		var k_$wTop = $(window).scrollTop(),
			k_$headerHeight = k_$header.height(),
			topHalf = (k_$wrap.height() / 2) - ($(window).height() / 2) - k_$header.height(),
			pageTop = $('.btn_top');
		
		/***************************
    	* desktop footer btn top *
    	***************************/
		if(CommonJs.isMobile() == false){
			if(k_$wTop >= topHalf){
				pageTop.addClass('active');
			} else if(k_$wTop < topHalf) {
				pageTop.removeClass('active');
			}
			pageTop.on('click', function(){//top button
				$('html,body').stop(true,false).animate({scrollTop:0},500)
				return false;
			});
		}
		
	}
	
	function language(){
		$('.language').html('<select onchange="if(this.value) location.href=(this.value);"><option value="">Languages</option><optgroup label="North America"><option title="켈로그 미국 영어 사이트로 이동" value="https://www.kelloggs.com/">United States | English</option><option title="켈로그 미국 스페인어 사이트로 이동" value="http://www.diasgrandiosos.com/">United States | Español</option><option title="켈로그 캐나다 영어 사이트로 이동" value="https://www.kelloggs.ca/content/NorthAmerica/kelloggca/en_CA/home.html">Canada | English</option><option title="켈로그 캐나다 프랑스어 사이트로 이동" value="https://www.kelloggs.ca/content/NorthAmerica/kelloggca/fr_CA/home.html">Canada | Français</option><option title="동켈로그 멕시코 스페인어 사이트로 이동" value="https://www.kelloggs.com.mx/">Mexico | Español</option></optgroup><optgroup label="Central America"><option title="켈로그 과테말라 스페인어 사이트로 이동" value="https://www.kelloggs.com.gt">Guatemala | Español</option></optgroup><optgroup label="Latin &amp; South America"><option title="켈로그 아르헨티나 스페인어 사이트로 이동" value="https://www.kelloggsargentina.com">Argentina | Español</option><option title="켈로그 브라질 포르투갈어 사이트로 이동" value="https://www.kelloggs.com.br/">Brasil | Português</option><option title="켈로그 칠레 스페인어 사이트로 이동" value="https://www.kelloggs.cl/">Chile | Español</option><option title="켈로그 콜롬비아  스페인어 사이트로 이동" value="https://www.kelloggs.com.co/">Colombia | Español</option><option title="켈로그 에콰도르  스페인어 사이트로 이동" value="https://www.kelloggs.com.ec/">Ecuador | Español</option><option title="켈로그 파라과이  스페인어 사이트로 이동" value="https://www.kelloggs.com.py/">Paraguay | Español</option><option title="켈로그 페루 스페인어 사이트로 이동" value="https://www.kelloggs.com.pe/">Peru | Español</option><option title="켈로그 우루과이  스페인어 사이트로 이동" value="https://www.kelloggsuruguay.com.uy/">Uruguay | Español</option><option title="켈로그 베네수엘라 스페인어 사이트로 이동" value="https://www.kelloggs.com.ve/">Venezuela | Español</option></optgroup><optgroup label="Europe &amp; Middle East"><option title="켈로그 벨기 / 벨기에 사이트로 이동" value="https://www.kelloggs.be/nl_BE/home.html">Belgie/Belgique | Nederlands</option><option title="켈로그 벨기 / 프랑스어 사이트로 이동" value="https://www.kelloggs.be/fr_BE/home.html">Belgie/Belgique | Français</option><option title="켈로그 덴마크 독일어 사이트로 이동" value="https://www.kelloggs.dk">Danmark | Dansk</option><option title="켈로그 독일 독일어 사이트로 이동" value="https://www.kelloggs.de">Deutschland | Deutsch</option><option title="켈로그 에스파냐 스페인어 사이트로 이동" value="https://www.kelloggs.es/">España | Español</option><option title="켈로그 프랑스 프랑스어 사이트로 이동" value="https://www.kelloggs.fr/">France | Français</option><option title="켈로그 그리스 그리스어 사이트로 이동" value="https://www.kelloggs.gr/el_GR/home.html">Ελλάδα/Greece | ελληνική</option><option title="켈로그 그리스 영어 사이트로 이동" value="https://www.kelloggs.gr/en_GR/home.html">Ελλάδα/Greece | English</option><option title="켈로그 아일랜드 영어 사이트로 이동" value="https://www.kelloggs.ie/">Ireland | English</option><option title="켈로그 이탈리아 이탈리아어 사이트로 이동" value="https://www.kelloggs.it">Italia | Italiano</option><option title="켈로그 네덜란드 네덜란드어 사이트로 이동" value="https://www.kelloggs.nl/nl_NL/home.html">Nederland | Nederlands</option><option title="켈로그 노르웨이 노르웨이어 사이트로 이동" value="https://www.kelloggs.no">Norge | Norsk</option><option title="켈로그 오스트리아 독일어 사이트로 이동" value="https://www.kelloggs.at">Österreich | Deutsch</option><option title="켈로그 포르투갈 포르투갈어 사이트로 이동" value="https://www.kelloggs.pt/">Portugal | Português</option><option title="켈로그 러시아 러시아어 사이트로 이동" value="https://www.kelloggs.ru/ru_RU/home.html">Россия | Русский</option><option title="켈로그 스위스 독일어 사이트로이동" value="https://www.kelloggs.de/de_DE/home.html">Schweiz | Deutsch</option><option title="켈로그 스위스 프랑스어 사이트로 이동" value="https://www.kelloggs.ch/fr_CH/home.html">Suisse | Français</option><option title="켈로그 핀란드 핀란드어 사이트로 이동" value="https://www.kelloggs.fi">Suomi | Suomi</option><option title="켈로그 스웨덴  스웨덴어 사이트로 이동" value="https://www.kelloggs.se">Sverige | Svenska</option><option title="켈로그 터키 터키어 사이트로 이동" value="https://www.kelloggs.com.tr/content/Europe/kelloggs_tr/tr_TR/pages/home.html">Türkiye | Türkçe</option><option title="켈로그 영국 영어 사이트로 이동" value="https://www.kelloggs.co.uk/">United Kingdom | English</option></optgroup><optgroup label="Africa"><option title="켈로그 남아프리카 공화국 영어 사이트로 이동" value="https://www.kelloggs.co.za">South Africa | English</option></optgroup><optgroup label="Asia"><option title="켈로그 일본 일본어 사이트로 이동" value="https://www.kelloggs.jp/">日本 | 日本語</option><option title="켈로그 대한민국 한국어 사이트로 이동" value="https://www.kellogg.co.kr/">대한민국 | 한국어</option><option title="켈로그 대만 중국어 번체 사이트로 이동" value="https://www.kelloggs.com.tw/">台灣 | 繁體中文</option><option title="켈로그 중국 중국어 간체 사이트로 이동" value="https://www.kelloggs.cn/">中国大陆 | 简体中文</option><option title="켈로그 홍콩 중국어 번체 사이트로 이동" value="https://www.kelloggs.com.hk/">香港 | 繁體中文</option><option title="켈로그 인도 영어 사이트로 이동" value="https://www.kelloggs.in/">India | English</option></optgroup><optgroup label="Oceania"><option title="켈로그 호주 영어 사이트로 이동" value="https://www.kelloggs.com.au/">Australia | English</option><option title="켈로그 뉴질랜드 영어 사이트로 이동" value="https://www.kelloggs.co.nz/">New Zealand | English</option></optgroup></select>');
	}
	
    init();
})();