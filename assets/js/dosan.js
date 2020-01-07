var CommonJs = (function(){
    var g_depthVal3 = 0;
    var g_depthVal4 = 0;


    return{
        isMobile:function(){
            var UserAgent = navigator.userAgent;

            if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
            {
                return true;
            }else{
                return false;
            }
        },
        init : function(){
            if(CommonJs.isMobile() == true) {
                $('.gu_tab_depth4').height(28);
                $('#LNB .lnb_inner .lnb_cnt').addClass('isMobile')
            }else{
                $('#LNB .lnb_inner .lnb_cnt').removeClass('isMobile')
            }

            //keyvisual in motion (1 depth)
            if($("#SUB_KEYVISUAL").length > 0){
                var m_$kvImgArea = $("#SUB_KEYVISUAL .kv_img_area"),
                    m_checkOneDepth = ["/intro/credo","csr/about-csr", "ir/ir-report", "media-center/movie", "career/people"],
                    m_currentHref = location.href,
                    m_isInMotion = false;

                for(var i = 0, len = m_checkOneDepth.length; i < len; ++i){
                    if(m_currentHref.indexOf(m_checkOneDepth[i]) > -1){
                        m_isInMotion = true;
                    }
                }

                if(m_isInMotion) setTimeout(function(){m_$kvImgArea.addClass("on");}, 10);
                else m_$kvImgArea.addClass("active");
            }

            /* footer btn top */
            $('#FOOTER .btn_top a').click(function(e){
                e.preventDefault();
                $("html, body").stop().animate({scrollTop:0 }, 500);

                return false;
            });
        },
        getURLParameter : function(_name){
            return decodeURI(
                (RegExp(_name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
            );
        },
        threeDepthActive : function(_idx){

            /* 3뎁스 클릭시 해당 함수 사용 : 페이지 전환 없을때 */
            g_depthVal3 = _idx;

            if($('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4').length>0){
                // depth4 가 있을때

                /* depth4-tab setting */
                $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').removeClass('on');
                $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').eq(0).addClass('on');
                /* depth4-content setting */
                $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').removeClass('on');
                $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').eq(0).addClass('on');

            }
            /* depth3-tab setting */
            $('.gu_tab_depth3 ul li').removeClass('on');
            $('.gu_tab_depth3 ul li').eq(g_depthVal3).addClass('on');
            /* depth3-content setting */
            $('.gu_contents_depth3').removeClass('on');
            $('.gu_contents_depth3').eq(g_depthVal3).addClass('on');

            CommonJs.centerTab($('.gu_tab_depth3'));
        },
        fourDepthActive : function(_idx){

            /* 4뎁스 클릭시 해당 함수 사용 : 페이지 전환 없을때 */
            g_depthVal4 = _idx;

            /* depth4-tab setting */
            $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').removeClass('on');
            $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').eq(g_depthVal4).addClass('on');
            /* depth4-content setting */
            $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').removeClass('on');
            $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').eq(g_depthVal4).addClass('on');

            CommonJs.centerTab($('.gu_contents_depth3.on .gu_tab_depth4'));
        },
        checkParameter : function(_pMenu,_val,_pTab){
            // _pMenu   : parameter name > menu
            // _pTab    : parameter name > tab
            // _val     : parameter value

            if(CommonJs.getURLParameter(_pMenu) !='null'){
                var m_$depth3 = $('.gu_tab_depth3 ul li.li_'+_val);
                if(m_$depth3.attr('data-parameter') == undefined || m_$depth3.attr('data-parameter') == 'undefined'){
                    g_depthVal3 = 0;
                }else{
                    g_depthVal3 = m_$depth3.index();
                }

                /* ================= depth3 Active ================= */
                /* depth3-tab setting */
                $('.gu_tab_depth3 ul li').removeClass('on');
                $('.gu_tab_depth3 ul li').eq(g_depthVal3).addClass('on');
                /* depth3-content setting */
                $('.gu_contents_depth3').removeClass('on');
                $('.gu_contents_depth3').eq(g_depthVal3).addClass('on');
                CommonJs.centerTab($('.gu_tab_depth3'));

                /* ================= depth4 Active ================= */
                if($('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4').length>0){

                    // depth4 가 있을때
                    var m_$depth4 = $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li.li_'+CommonJs.getURLParameter(_pTab))
                    if(m_$depth4.attr('data-parameter') == undefined || m_$depth4.attr('data-parameter') == 'undefined'){
                        g_depthVal4 = 0;
                    }else{
                        g_depthVal4 = m_$depth4.index();
                    }
                    /* depth4-tab setting */
                    $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').removeClass('on');
                    $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_tab_depth4 ul li').eq(g_depthVal4).addClass('on');
                    /* depth4-content setting */
                    $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').removeClass('on');
                    $('.gu_contents_depth3').eq(g_depthVal3).find('.gu_contents_depth4').eq(g_depthVal4).addClass('on');
                    CommonJs.centerTab($('.gu_contents_depth3.on .gu_tab_depth4'));

                }
            }
        },
        centerTab: function (_tab, _gnb) {
            var scrollX = _tab.find("ul").scrollLeft(),
                currentBtn = (_gnb) ? _tab.find("ul>li>a.on") : _tab.find("ul>li.on");
            var currentX = currentBtn.offset().left,
                currentW = currentBtn.width(),
                posx = scrollX+currentX,
                halfW = (_gnb) ? ($(window).width() - currentW) / 2 - 13 : ($(window).width() - currentW) / 2 - 16;


            TweenMax.to(_tab.find("ul"), 0.7, {scrollLeft: posx - halfW, ease: Expo.easeOut});
        },

        selectBox : function(_selType){
            var m_$selBox = $('.gu_selectbox');
            var m_$selBtn = $('.gu_sort_name a');
            var m_$selBtnsList = $('.custom_scroll_content a');

            $('.gu_custom_scroll').nanoScroller();


            /* 높이 계산 */
            for(var i = 0,len = m_$selBox.length;i<len;i++){
                var m_aLen = m_$selBox.eq(i).find('.custom_scroll_content a').length;
                var m_aH = m_$selBox.eq(i).find('.custom_scroll_content a').innerHeight();
                var m_selectH = (m_aH*m_aLen);

                if(m_aLen > 0){
                    m_$selBox.eq(i).height(m_selectH)
                }
            }

            m_$selBtn.on('click',function(e){
                e.stopPropagation();

                m_$selBox.removeClass('on');
                $(this).parent().next('.gu_selectbox').addClass('on');
                // mobile
                if(CommonJs.isMobile() == true){
                    $('body').on('click touchstart', function(){
                        if (!$(event.target).closest('.gu_selectbox').length) {
                            m_$selBox.removeClass('on');
                            $('body').off('click touchstart');
                        }
                    })
                }
            });

            m_$selBtnsList.on('click',function(){
                m_$selBox.removeClass('on');
                if(_selType == 'sort'){
                    var m_$selActiveName = $(this).parents('.gu_selectbox').prev('.gu_sort_name').find('a');
                    $(this).siblings().removeClass('on');
                    $(this).addClass('on');
                    m_$selActiveName.html($(this).text());
                }
            });
            // pc
            if(CommonJs.isMobile() == false){ // pc
                m_$selBox.on('mouseleave', function(){
                    m_$selBox.removeClass('on');
                });
            }
        },
        dateForm : function() {
            $(".dateForm").each(function() {
                var $this = $(this);
                $this.html($this.text().replace(/(\d{4})(\d{2})(\d{2})/gi, "$1.$2.$3"));
            });
        },
        getCookie:function(name) {
            name += "=";
            var arr = decodeURIComponent(document.cookie).split(';');
            for (var i = 0; i < arr.length; i++) {
                var c = arr[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return ""
        },
        getLocale:function(){
        	var subPath = location.pathname;
        	var currentLocale = "en";
        	if(subPath.length >= 3) {
        		var languagePart = location.pathname.substr(1,2);
        		switch(languagePart) {
        			case 'cn':
	        			currentLocale = 'zh';
	        			break;
	        		case 'kr':
	        			currentLocale = 'ko';
	        			break;
	        		default:
	        			currentLocale = 'en';
	        			break;
        		}
        	}
        	// console.log(locale);
            // return CommonJs.getCookie('front_language');
            return currentLocale;
        }
    }

})();

CommonJs.init();

var Gnb =(function(){
    var g_$header = $('#HEADER'),
        g_$gnb = g_$header.find('#GNB'),
        g_$btnSearch = g_$gnb.find('.btn_show_search'),
        g_$searchArea = $('#TOP_SEARCH #SEARCH .search_area'),
        g_$searchInput = g_$searchArea.find('.g_search'),
        g_$searchBtn = g_$searchArea.find('.btn_top_search'),
        g_$gnbDim = g_$gnb.find('.gnb_dim'),
        g_$lnb = $('#LNB'),
        g_$lnbLiPc = g_$lnb.find('.tab_area ul li.li_lnb_pc'),
        g_$lnbLiMb = g_$lnb.find('.tab_area ul li.li_lnb_mobile'),
        g_$lnbCntPc = g_$lnb.find('.lnb_cnt.lnb_companies_pc'),
        g_$lnbCntNavi = g_$lnb.find('.lnb_cnt.lnb_navi'),
        g_lastScroll = 0,
        g_$gnbDepth1 = g_$gnb.find('.depth1_area'),
        g_lnbBg = 0;

    var resizeGnb = false;

    function init(){
        resizeEvent();
        $(window).resize(resizeEvent);
        $(window).scroll(scrollEvent);
        eventListener();
        gnbActive();
        if(!CommonJs.isMobile()) $('#LNB .lnb_cnt').nanoScroller();
    }

    function resizeEvent(){

        $('#LNB .lnb_cnt').height(window.innerHeight - $('#LNB .lnb_tab').height());
        $('#LNB .lnb_cnt.isMobile').height(window.innerHeight - $('#LNB .lnb_tab').height());
        $('#LNB .lnb_cnt.isMobile .custom_scroll_content').height(window.innerHeight - $('#LNB .lnb_tab').height());

        $('#LNB .hide').html('window : '+(window.innerHeight -$('#LNB .lnb_tab').height()));
        //CommonJs.centerTab($('.naviDepth1_'+fixDepthArr[1]),true);

        if($(window).innerWidth()<1080){
            //closeLnb();

            var windowH = window.innerHeight;

            $('#LNB .lnb_area').attr('height', windowH + 'px');

            if(!g_$lnbCntNavi.hasClass('on') && !resizeGnb){
                g_lnbBg = 0;
                g_$lnb.find('.tab_area ul li.li_lnb_navi a').trigger('click');
                g_$lnb.find('.lnb_cnt .lnb_cnt_bg').css('background-image','url('+g_lnbImgUrl+'lnb_bg0.jpg)')
                resizeGnb = true;
            }
        }else{
            resizeGnb = false;
            g_lnbBg = 0;
            g_$lnbLiPc.find('a').eq(0).trigger('click');
        }
        if(!CommonJs.isMobile()) $('#LNB .lnb_cnt').nanoScroller();

    }

    function scrollEvent(){
        var m_sTop = $(window).scrollTop(),
            m_st = window.pageYOffset || document.documentElement.scrollTop,
            m_headerHeight = g_$header.height(),
            m_isTopBanner = (!$('#WRAP').hasClass('isTopBanner')) ? false : true,
            m_fTopBannerH = (!m_isTopBanner) ? 0 : $('#BAND_BANNER').height(),
            m_standard = (!m_isTopBanner) ? m_headerHeight : m_fTopBannerH;

        if(!g_$header.hasClass('other')){

            if (m_st > g_lastScroll ) {
                /* scroll Down */
                if( m_sTop>m_standard){
                    if(!g_$header.hasClass('m_enter')){
                        g_$header.addClass('active');

                        if(m_sTop>m_headerHeight + m_fTopBannerH){
                            g_$header.addClass('fix');
                            $('#WRAP .container').addClass('isTopBanner')
                        }

                        g_$gnb.find('.depth2_container .depth2_container_inner>div.on').addClass('down');
                        $('#HEADER .other_services .lang_dropdown').hide();
                        if(CommonJs.isMobile() == true) {
                            g_$gnb.find('.depth2_container .depth2_container_inner>div.on ul').height(68);
                        }
                    }
                }

            }else{
                /* scroll Up */

                g_$header.removeClass('active');

                if(m_sTop<m_standard){
                    g_$gnb.find('.depth2_container .depth2_container_inner>div.on').removeClass('down');
                    $('#HEADER .other_services .lang_dropdown').hide();
                    g_$header.removeClass('fix');
                    $('#WRAP .container').removeClass('isTopBanner')
                }
            }

            g_lastScroll = m_st <= 0 ? 0 : m_st;

        }
    }

    function eventListener(){
        var m_$gnbBg = g_$gnb.find('.gnb_bg');
        var m_$gnbUl = g_$gnb.find('.depth1_ul');
        var m_$gnbDepthOpen = g_$gnb.find('.depth2_container .depth1_open');

        /* header dim */
        g_$gnbDim.on('click',function(){
            g_$btnSearch.removeClass('on');
            g_$header.removeClass('m_enter');
            g_$searchArea.removeClass('on');
            g_$searchInput.val('');
        });

        /* top search */
        g_$btnSearch.on('click',function() {
            if (!$(this).hasClass('on')) {
                $(this).addClass('on');
                g_$header.addClass('m_enter');
                g_$searchArea.addClass('on');
                g_$searchInput.focus();
            } else {
                $(this).removeClass('on');
                g_$header.removeClass('m_enter');
                g_$searchArea.removeClass('on');
                g_$searchInput.val('');
            }
        });




        /* depth1 mouse enter */
        g_$gnbDepth1.find('.depth1_ul').on('mouseenter focusin',function(){
            if(!g_$header.hasClass('m_enter')){
                g_$header.addClass('m_enter');
            }
            m_$gnbBg.addClass('on');
            m_$gnbUl.addClass('over');

        }).on('mouseleave focusout',function(){

            g_$header.removeClass('m_enter');
            m_$gnbBg.removeClass('on');
            m_$gnbUl.removeClass('over');
            g_$btnSearch.removeClass('on');
            g_$searchArea.removeClass('on');
            g_$searchInput.val('');

        });


        /* lang */
        $('#HEADER .other_services .btn_lang_select').on('click',function(){
            $(this).next('.lang_dropdown').show();
            $(this).next('.lang_dropdown').addClass('on');

        });

        $('#HEADER .other_services .lang_dropdown').mouseleave(function(){
            $(this).hide();
            $(this).removeClass('on');
        });

        /* lnb active */
        $('#LNB .lnb_bg, #LNB .lnb_inner .btn_lnb_close').on('click', function(){
            closeLnb();
            if(!CommonJs.isMobile()) $('body').removeClass('stop');
        });
        $('#HEADER .other_services .btn_menu').on('click', function(){
            $('#LNB').addClass('on');

            $('#LNB .lnb_cnt').height(window.innerHeight - $('#LNB .lnb_tab').innerHeight());

            if($(window).innerWidth()>1080){
                g_$lnbCntPc.eq(0).addClass('on');
                g_$lnbLiPc.find('a').eq(0).addClass('on');
            }else{
                g_$lnbCntNavi.addClass('on');
                g_$lnb.find('.tab_area ul li.li_lnb_navi a').addClass('on');
            }
            if(!CommonJs.isMobile()) $('#LNB .lnb_cnt').nanoScroller();
            if(!CommonJs.isMobile()) $('body').addClass('stop');

        });


        /* lnb pc-hover */
        if(CommonJs.isMobile() == false){
            var m_$img = $('.lnb_img')[0];
            var img = new Image ();

            g_$lnbCntPc.find('ul li').mouseenter(function(){
                var idx = Number($(this).attr('data-idx'));
                m_$img.src = g_lnbImgUrl+'lnb_bg'+idx+'.jpg';
                m_$img.onload=function(){

                    g_$lnb.find('.lnb_cnt .lnb_cnt_bg').css('background-image','url('+g_lnbImgUrl+'lnb_bg'+idx+'.jpg)')
                };

            });

            g_$lnbCntPc.mouseleave(function(){
                g_$lnbCntPc.find('.lnb_cnt_bg').css('background-image', 'url(' + g_lnbImgUrl + 'lnb_bg' + g_lnbBg + '.jpg)')
            });
        }


        g_$lnbLiPc.find('a').on('click', function(){
            var idx = $(this).parent('li.li_lnb_pc').index()-2;
            if (idx == 0) {
                g_lnbBg = 0;
            } else if (idx == 1) {
                g_lnbBg = 14;
            } else if (idx == 2) {
                g_lnbBg = 21;
            }
            g_$lnbCntPc.find('.lnb_cnt_bg').css('background-image', 'url(' + g_lnbImgUrl + 'lnb_bg' + g_lnbBg + '.jpg)')
            g_$lnbLiPc.find('a').removeClass('on');
            g_$lnbLiPc.eq(idx).find('a').addClass('on');

            g_$lnbCntPc.removeClass('on');
            g_$lnbCntPc.eq(idx).addClass('on');
        })


        g_$lnbLiMb.find('a').on('click', function(){
            var idx = $(this).parent('li.li_lnb_mobile').index();
            g_$lnbLiMb.find('a').removeClass('on');
            g_$lnbLiMb.eq(idx).find('a').addClass('on');

            g_$lnb.find('.lnb_cnt').removeClass('on');
            g_$lnb.find('.lnb_cnt').eq(idx).addClass('on');
        })


        /* lnb navi-accordion */
        g_$lnb.find('.lnb_navi ul li>a').on('click',function(e){
            e.preventDefault();
            if($(this).hasClass('active')){
                g_$lnb.find('.lnb_navi ul li>a').removeClass('active');
                g_$lnb.find('.lnb_navi ul li .depth2_area').stop().slideUp();
            }else{
                g_$lnb.find('.lnb_navi ul li>a').removeClass('active');
                g_$lnb.find('.lnb_navi ul li .depth2_area').stop().slideUp();
                $(this).addClass('active');
                $(this).next('.depth2_area').slideDown();
            }
        })

        /* depth1 open */
        m_$gnbDepthOpen.on("click", function(){
            var m_$header = $("#HEADER"),
                m_$activeGnb = g_$header.find(".depth2_container_inner > div.active");

            if(!m_$gnbDepthOpen.hasClass("on")){
                m_$gnbDepthOpen.addClass("on");
                TweenMax.to(m_$header, 0.3, {top:0});
            }else{
                m_$gnbDepthOpen.removeClass("on");
                TweenMax.to(m_$header, 0.3, {top:-m_$header.height()});
            }
        })
    }

    function closeLnb(){
        $('#LNB').removeClass('on');
        g_$lnb.find('.tab_area ul li a').removeClass('on');
        g_$lnb.find('.lnb_cnt').removeClass('on');

        if($(window).innerWidth()>1080){
            g_$lnb.find('.lnb_cnt.lnb_companies').addClass('on');
            g_$lnbLiMb.find('a').addClass('on');
        }else{
            g_$lnbCntNavi.addClass('on');
            g_$lnb.find('.tab_area ul li.li_lnb_navi a').addClass('on');
        }

        g_$lnb.find('.lnb_cnt .lnb_cnt_bg').css('background-image', 'url(' + g_lnbImgUrl + 'lnb_bg0.jpg)')
    }

    function gnbActive(){
        var m_$container = $(".container"),
            m_classStr = m_$container.attr("class"),
            m_className = m_classStr.split(" ")[1],
            m_bnavi = false;

        if(m_className){
            m_bnavi = true;
        }

        if(m_bnavi){
            g_$gnb.find('.depth2_container .depth2_container_inner>div').removeClass('on');
            g_$gnb.find('.depth2_container .depth2_container_inner>div ul li a').removeClass('on');
            var fixDepthArr = m_className.split('_');

            if(fixDepthArr[0]=='subNavi'){
                $('.naviDepth1_'+fixDepthArr[1]).parent('li').addClass('on');
                $('.naviDepth1_'+fixDepthArr[1]).addClass('on').addClass("active");
                $('.naviDepth2_'+fixDepthArr[1]+'_'+fixDepthArr[2]).addClass('on');
                $('.naviDepth3_'+fixDepthArr[1]+'_'+fixDepthArr[2]+'_'+fixDepthArr[3]).addClass('on');
                CommonJs.centerTab($('.naviDepth1_' + fixDepthArr[1]), true);
            }
        }
    }

    /* GNB search */
    $(g_$searchInput).on('keydown', function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            searchGnb();
        }
    });

    g_$searchBtn.on('click',function(e){
        e.preventDefault();
        searchGnb();
    });


    function searchGnb(){
        var searchKeyword = g_$searchInput.val();
        var _lang = CommonJs.getLocale();
        var alertMessage = '';

        if ($.trim(searchKeyword) == '') {
            alertMessage = (_lang=='ko')?'검색어를 입력해 주세요.':((_lang == 'en')?'Input Keyword':'搜索');
            alert(alertMessage);
            return;
        } else {
            switch(_lang) {
                case "ko": _lang = "kr";break;
                case "zh": _lang = "cn";break;
                default:
                    _lang = "en";
            }
            $("#gnbSearchForm").attr("action", '/' + _lang + '/search');
            $("#gnbSearchForm").submit();
        }
    }


    init();
})();

var translateStr;

/** TRANSLATOR */
var Translator = (function(){
    var g_langData, g_defaultLang,
        g_$trn = $(".trn, .trna, .trnt, .trnp, .trns"), g_trnLength = g_$trn.size(),
        g_$langArea = $("#GNB .language_area, #LNB .language_area"),
        g_$langDropdownUl = $("#GNB .lang_dropdown ul, #LNB .language_area ol");

    function init(_data, _lang){
        if(!_lang || _lang == "") _lang = "ko";

        g_langData = _data;
        //g_defaultLang = _lang;
        g_defaultLang = CommonJs.getLocale();

        setLangEl();
        setBtns();
        //loadTranslate();
        //setTranslate();
    }

    function setLangEl(){
        var m_krStr = '<li class="ko"><a href="javascript:;" data-lang="ko" class="kr_sd_500"><span>한국어</span></a></li>',
            m_enStr = '<li class="en"><a href="javascript:;" data-lang="en" class="kr_sd_500"><span>English</span></a></li>',
            m_zhStr = '<li class="zh"><a href="javascript:;" data-lang="zh" class="kr_sd_500"><span>中文</span></a></li>',
            m_currentLi,
            m_appendStr = "";

        switch(g_defaultLang){
            case "ko" : m_appendStr = m_krStr+m_enStr+m_zhStr; break;
            case "en" : m_appendStr = m_enStr+m_krStr+m_zhStr; break;
            case "zh" : m_appendStr = m_zhStr+m_krStr+m_enStr; break;
        }

        g_$langDropdownUl.html(m_appendStr);
        m_currentLi = g_$langDropdownUl.find("."+g_defaultLang);

        m_currentLi.addClass("on");
        g_$langArea.find(".currentLang").html(m_currentLi.find("span").html());

    }

    function setBtns(){
        g_$langDropdownUl.find("li a").on("click", function(){
            var m_selectLang = $(this).attr("data-lang");
            var m_urlLang = m_selectLang == "ko" ? "kr" : (m_selectLang == "zh" ? "cn" : "en");
            var m_url = location.href;
            m_url = m_url.replace(/^(?:https?:\/\/[^\/]+)\/(en|kr|cn)?/, "/" + m_urlLang);
            m_url+=((m_url.indexOf("?") > 0)?"&":"?");

            $.get(m_url+"front_language="+m_selectLang, function(){
                if($('#WRAP').hasClass('nKo')){
                    location.href=('/'+m_urlLang+'/media-center/press-release/');
                }else{
                    location.href = location.href.replace(/^(?:https?:\/\/[^\/]+)\/(en|kr|cn)?/, "/" + m_urlLang);

                }
            })
        })
    }

    function loadTranslate(){
        var path = location.pathname;
        var str = path.split('/');
        str.shift();
        var len = str.length;

        if(str[len-1]==""){
            $("body").append('<script src="/js/_locale'+path+'translate.js"></script>');
        }else{
            $("body").append('<script src="/js/_locale'+path+'/translate.js"></script>');
        }

        g_langData = $.extend({}, translateStr, SubTranslateStr);

    }

    function setTranslate(){
        for(var i = 0; i < g_trnLength; ++i){
            var m_trn = g_$trn.eq(i),
                m_trnType, m_trnProperties,
                m_alt = $(m_trn).attr("alt"),
                m_placeholder = $(m_trn).attr("placeholder"),
                m_title = $(m_trn).attr("title"),
                m_trnPropertiesStr = "",
                m_dataTrn = $(m_trn).attr("data-trn"),
                m_src = $(m_trn).attr("src");

            if(m_dataTrn == "" || m_dataTrn == undefined){
                if(m_alt != undefined && m_alt != ""){
                    m_trnType = "alt";
                    m_trnPropertiesStr = m_alt;
                }else if(m_placeholder != undefined && m_placeholder != ""){
                    m_trnType = "placeholder";
                    m_trnPropertiesStr = m_placeholder;
                }else if(m_title != undefined && m_title != ""){
                    m_trnType = "title";
                    m_trnPropertiesStr = m_title;
                } else if (m_src != undefined && m_src != "") {
                    m_trnType = "src";
                    m_trnPropertiesStr = m_src;
                }else{
                    m_trnType = "el";
                    m_trnPropertiesStr = m_trn.html();
                }

                m_trnProperties = (m_trnPropertiesStr).replace(/\r\n|\r|\n|\{|\}|\ /gi, "");

                m_trn.attr("data-trn", m_trnProperties);
                m_trn.attr("data-trn-type", m_trnType);
            }
        }

        lang(g_defaultLang);
    }

    function lang(_lang){
        var m_lang = (!_lang)?g_defaultLang:_lang;

        for(var i = 0; i < g_trnLength; ++i) {
            var trn = g_$trn.eq(i);

            changeLangString(trn, m_lang);
        }
    }

    function changeLangString(_trn, _m_lang){

        var getProperties = _trn.attr("data-trn").split("."),
            getType = _trn.attr("data-trn-type"),
            currentLangStr,
            depthProperties = g_langData;


        for (var z = 0, zLen = getProperties.length; z < zLen; ++z) {
            depthProperties = depthProperties[getProperties[z]];
        }

        currentLangStr = depthProperties[_m_lang];
        switch (getType) {
            case "el" :
                _trn.html(currentLangStr);
                break;
            case "alt" :
                _trn.attr("alt", currentLangStr);
                break;
            case "placeholder" :
                _trn.attr("placeholder", currentLangStr);
                break;
            case "title" :
                _trn.attr("title", currentLangStr);
                break;
            case "src" :
                _trn.attr("src", currentLangStr);
                break;
            case "href" :
                _trn.attr("href", currentLangStr);
                break;
        }
    }

    function reload(_lang){
        g_$trn = $(".trn, .trna, .trnt, .trnp, .trns");
        g_trnLength = g_$trn.size();
        if(!_lang || _lang == "") _lang = "ko";
        g_defaultLang = _lang;

        setTranslate();
        //changeLangString(g_$trn,_lang)
    }

    function targetChangeLang(_targetArr, _lang){
        for(var i = 0, len = _targetArr.length; i < len; ++i){
            var m_trn = $(_targetArr[i]);

            changeLangString(m_trn, _lang);
        }
    }

    return {
        init:init,
        lang:lang,
        targetChangeLang:targetChangeLang,
        reload:reload,
        setTranslate:setTranslate
    }
})();



var SwiperOver = (function(){
    var g_$swiperWrap = $(".swiper-container");

    function init(){
        if(g_$swiperWrap.length > 0){
            createSwiperOver();
        }
    }

    function createSwiperOver(){
        var dom = "";

        for (var i = 0, len = g_$swiperWrap.length; i < len; ++i) {
            var m_currentContainer = g_$swiperWrap.eq(i);
            m_currentContainer.addClass("swiper-container" + i);

            dom += '<div class="over_area" data-idx="'+i+'">',
                dom += '<a href="javascript:;" class="over_l" style="cursor: url(/images/common/gallery_slide_prev.jpg), url(/images/common/gallery_slide_prev.cur), auto;">prev slide</a>',
                dom += '<a href="javascript:;" class="over_r" style="cursor: url(/images/common/gallery_slide_next.jpg), url(/images/common/gallery_slide_next.cur), auto;">next slide</a>',
                dom += '</div>';

            m_currentContainer.find(".direction_area .slide_empty").append(dom);
        }

        setSwiperOverBtns();
    }

    function setSwiperOverBtns(){
        g_$swiperWrap.find(".over_area a").on("click", function(e){
            e.preventDefault();
            var m_idx = $(this).index(),
                m_swiperIdx = parseInt($(this).parent().attr("data-idx")),
                m_currentSwiper = $(".swiper-container"+m_swiperIdx)[0].swiper;

            if(m_idx == 0) m_currentSwiper.slidePrev();
            else m_currentSwiper.slideNext();
        })
    }

    init();
})();



var ScrollInMotion = (function(){
    var g_$scrollSection = $(".common_scroll_motion_section"),
        g_scrollSectionLen = g_$scrollSection.size();

    function init(){
        if($(".common_scroll_motion").length > 0){
            addEvents();
        }

    }

    function addEvents(){
        $(window).on("scroll", function(){
            var m_$scrollSection = $(".common_scroll_motion_section"),
                m_st = $(window).scrollTop(),
                m_gap = $(window).height()-150;

            for(var i = 0, len = g_scrollSectionLen; i < len; ++i){
                var m_$currentSection = m_$scrollSection.eq(i),
                    m_offsetTop = m_$currentSection.offset().top;

                if(m_st+m_gap > m_offsetTop) m_$currentSection.addClass("on");
            }
        }).trigger("scroll");
    }

    init();
})();

Translator.init(translateStr,CommonJs.getLocale());