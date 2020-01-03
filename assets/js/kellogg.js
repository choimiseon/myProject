$(document).ready(function(){
	m_menu();
	
	$('.menu_open').on('click',function(){
		var $sideBar = $('.menu_open .close_x');
		if(!($sideBar.hasClass('active'))){
			
			$(this).find('.hamburger_menu').removeClass('before');
			$(this).find('.hamburger_menu').addClass('active');
			$(this).find('.close_x').addClass('active');
			
		} else {
			$(this).find('.close_x').removeClass('active');
			$(this).find('.hamburger_menu').removeClass('active');
		}
	});
});

function m_menu (){
	$('.hamburger_menu').removeClass('before');
}