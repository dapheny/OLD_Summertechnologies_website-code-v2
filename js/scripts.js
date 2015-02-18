$('#main').jpreLoader({
		loaderVPos: '50%',
		autoClose: true,
	},
	function() {
		$('#main').animate({"opacity":'1'},{queue:false,duration:700,easing:"easeInOutQuad"});
	});

function initPompey() {

// functions ------------------
	"use strict";

	var al = {queue:true,duration:800,easing:"easeInOutQuad"};

// call mobile menu ------------------

	$(".nav-button").bind('click', function() {
		$('.link-holder').slideToggle();
	});


// sticky  ------------------

	$(".navigation").sticky({ topSpacing: 0, className: 'sticky', wrapperClassName: 'main-menu-wrapper' });

	$(".inner a.scroll-link").bind('click', function(event) {
		var ww = $(window).width()	;
		event.preventDefault();
		$.scrollTo(
		$(this).attr('href'),950,{easing:'swing',offset: 15,'axis':'y'} );
		if(ww < 959){
			setTimeout( function(){
				$('.link-holder').slideUp();
			},600);
		}
	});

// Call plugins  ----------------------------------------

//  superslides --------

	$('#slides').superslides({
		animation: 'fade',
		play: 10000
	});

	$('#slides').hammer().on('swipeleft', function() {
		$(this).superslides('animate', 'next');
	});

	$('#slides').hammer().on('swiperight', function() {
		$(this).superslides('animate', 'prev');
	});

//  scroll nav --------

	$('#nav').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 1250,
		scrollOffset: 10,
		scrollThreshold: 0.1,
		filter: '',
		easing: 'swing',
	});

	$("#team-carusel").owlCarousel({
		navigation:true,
		slideSpeed : 500,
		pagination : false,
		items : 3,
      	itemsDesktop : false,
      	itemsDesktopSmall : [979,2],
      	itemsTablet: [768,2],
      	itemsMobile : [768,1]

     });

// flexslider  --------

	 $('.single-media').flexslider({
		animation: "slide",
		slideDirection: "horizontal",
		slideshow: false,
		slideshowSpeed: 3500,
		animationDuration: 500,
		directionNav: true,
		controlNav: false,
	});

	$('.ticker').flexslider({
		slideshow: true,
		slideshowSpeed: 3500,
		animationDuration: 1500,
		directionNav: false,
		controlNav: false,
		animation: "slide",
		easing: "easeInOutQuad",
		direction: "vertical"
	});

	$('.testimonials-slider').flexslider({
		animation: "fade",
		smoothHeight: false,
		direction: "vertical",
		slideshow: false,
		controlNav: false,
		directionNav: false,
		start: function(slider) {
            $('.row a').click(function() {
                var slideTo = $(this).attr("name")
                var slideToInt = parseInt(slideTo)
				$('.row a').removeClass('act-test');
	  			$(this).addClass('act-test');
				var ww = $(window).width();
                if (slider.currentSlide != slideToInt)
				{
                    slider.flexAnimate(slideToInt)
                }
				if(ww < 959){
					setTimeout( function(){
						$('html').scrollTo('#testimonials h3.title',800,{'axis':'y'} );
					},600);
				}
            });
        }
	});

	$('.services-slider').flexslider({
		animation: "slide",
		smoothHeight: true,
		slideshow: false,
		controlNav: false,
		directionNav: false,
		startAt: 1,
		start: function(slider) {
            $('.row-services a').click(function() {
                var slideTo = $(this).attr("name")
                var slideToInt = parseInt(slideTo)
				var ww = $(window).width();
				$('.row-services a').removeClass('act-ser');
	 			$(this).addClass('act-ser');
                if (slider.currentSlide != slideToInt)
				{
                    slider.flexAnimate(slideToInt)
                }
				if(ww < 959){
					setTimeout( function(){
						$('html').scrollTo('#services h3.title',800,{'axis':'y'} );
					},600);
				}
            });
        }
	});

//  magnificPopup  ------

	$('.image-popup').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
	});

	$('.popup-youtube, .popup-vimeo').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

//  Mixitup  ------

	$('#options li').click(function(){
	  $('#options li').removeClass('actcat');
	  $(this).addClass('actcat');
	});

	$('#folio_container').mixitup({
		targetSelector: '.box',
		effects: ['fade'],
		easing: 'windback',
		transitionSpeed: 1200,
	});

// Subscribe   ----------------------------------------

	$('.subscriptionForm').submit(function(){
		var email = $('#subscriptionForm').val();
		$.ajax({
			url:'php/subscription.php',
			type :'POST',
			dataType:'json',
			data: {'email': email},success: function(data){
				if(data.error){
					$('#error').fadeIn()
				}
				else{
					$('#success').fadeIn();
					$("#error").hide();}
				}
			});
		return false
	});

	$('#subscriptionForm').focus(function(){
		$('#error').fadeOut();
		$('#success').fadeOut();
	});

	$('#subscriptionForm').keydown(function(){
		$('#error').fadeOut();
		$('#success').fadeOut();
	});

};
// Scroll to  --------

	$(".to-top, .logo, .start, .scroll-to-work, .order-block a").bind('click', function(event) {
		event.preventDefault();
		$.scrollTo(
			$(this).attr('href'),950,{easing:'swing',offset: 15,'axis':'y'} );
	});

// Contact submit  ----------------------------------------

	$("#submit_btn").click(function(){
		var user_name=$('input[name=name]').val();
		var user_email=$('input[name=email]').val();
		var user_message=$('textarea[name=message]').val();
		var proceed=true;
			if(user_name==""){
				$('input[name=name]').css('border','2px solid red');
				proceed=false
			}
			if(user_email==""){
				$('input[name=email]').css('border','2px solid red');
				proceed=false
			}
			if(user_message==""){
				$('textarea[name=message]').css('border','2px solid red');
				proceed=false
			}
			if(proceed){
				post_data={'userName':user_name,'userEmail':user_email,'userMessage':user_message};
				$.post('php/contact_me.html',
				post_data,
				function(data){
					$("#result").hide().html('<div class="success">'+data+'</div>').fadeIn(1500);
					$('#contact_form input').val('');
					$('#contact_form textarea').val('')}).fail(
						function(err){
							$("#result").hide().html('<div class="error">'+err.statusText+'</div>').fadeIn(1500)
					});
			}
	});

	$("#contact_form input, #contact_form textarea").keyup(function(){
		$("#contact_form input, #contact_form textarea").css('border','2px solid #fff');
			$("#result").fadeOut(1500)
	});


// Ajax portfolio   ----------------------------------------

function initPortfolio() {

	"use strict";

	var   window_height = $(window).height(),
      current,
	  next,
	  prev,
	  target,
	  hash,
	  url,
	  page,
	  title,
	  projectIndex,
	  scrollPostition,
	  projectLength,
	  ajaxLoading = false,
	  wrapperHeight,
	  pageRefresh = true,
	  content =false,
	  loader = $('div#loader'),
	  portfolioGrid = $('#folio_container'),
	  projectContainer = $('div#ajax-content-inner'),
	  projectNav = $('#project-navigation ul'),
	  exitProject = $('div#closeProject a'),
	  easing = 'easeOutExpo',
	  folderName ='projects';

		$(window).bind( 'hashchange', function() {
		hash = $(window.location).attr('hash');
		var root = '#!'+ folderName +'/';
		var rootLength = root.length;
		if( hash.substr(0,rootLength) != root ){
			return;
		} else {
			var correction = 50;
			var headerH = $('#options').outerHeight()+correction;
			hash = $(window.location).attr('hash');
			url = hash.replace(/[#\!]/g, '' );
			portfolioGrid.find('li.box.current').children().removeClass('act');
			portfolioGrid.find('li.box.current').removeClass('cur' );
			if(pageRefresh == true && hash.substr(1,rootLength) ==  root){
					$('html').scrollTo('#options',1500,{'axis':'y'},function(){
						loadProject();
					});
			}else if(pageRefresh == false && hash.substr(0,rootLength) == root){
				$('html,body').stop().animate({scrollTop: (projectContainer.offset().top-headerH)+'px'},800,'easeOutExpo', function(){
					if(content == false){
						loadProject();
					}else{
						projectContainer.animate({opacity:0,height:wrapperHeight},function(){
						loadProject();
						});
					}
				projectNav.fadeOut('100');
				exitProject.fadeOut('100');
			});
				}else if(hash=='' && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == false || hash.substr(0,rootLength) != root && pageRefresh == true){
					scrollPostition = hash;
					console.log(scrollPostition);
					$('html,body').stop().animate({scrollTop: scrollPostition+'px'},1000,function(){
					deleteProject();
				});
			}
			portfolioGrid.find('li.box a.ajax-project[href="#!' + url + '"]' ).parent().addClass( 'cur' );
			portfolioGrid.find('li.box.cur').find('a.ajax-project').addClass('act');
		}
	});

	function loadProject(){
		loader.fadeIn();
		if(!ajaxLoading) {
			ajaxLoading = true;
			projectContainer.load( url +' div#ajaxpage', function(xhr, statusText, request){
				if(statusText == "success"){
					ajaxLoading = false;
					page =  $('div#ajaxpage');
					$('.flexslider').flexslider({
						animation: "slide",
						slideDirection: "horizontal",
						slideshow: false,
						slideshowSpeed: 3500,
						animationDuration: 500,
						directionNav: false,
						controlNav: true,
					});
					$('.popup-gallery').magnificPopup({
						delegate: 'a',
						type: 'image',
						mainClass: 'my-mfp-zoom-in',
						tLoading: 'Loading image #%curr%...',
						gallery: {
								enabled: true,
								navigateByImgClick: true,
								preload: [0,1]
						},
						image: {
								tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
								titleSrc: function(item) {
								return item.el.attr('title') + '<small>by KWST</small>';
							}
						}
					});
				hideLoader();
				$(".container").fitVids();
				}
			});
		}
	}
	function hideLoader(){
		loader.fadeOut('fast', function(){
			showProject();
		});
	}

	function showProject(){
		if(content==false){
			wrapperHeight = projectContainer.children('div#ajaxpage').outerHeight()+'px';
			projectContainer.animate({opacity:1,height:wrapperHeight}, function(){
				$(".container").fitVids();
				scrollPostition = $('html,body').scrollTop();
				projectNav.fadeIn();
				exitProject.fadeIn();
				content = true;
			});
		}
		else{
				wrapperHeight = projectContainer.children('div#ajaxpage').outerHeight()+'px';
				projectContainer.animate({opacity:1,height:wrapperHeight}, function(){
					$(".container").fitVids();
					scrollPostition = $('html,body').scrollTop();
					projectNav.fadeIn();
					exitProject.fadeIn();
			});
		}
			projectIndex = portfolioGrid.find('li.box.cur').index();
			projectLength = $('li.box a.ajax-project').length-1;
		if(projectIndex == projectLength){
				$('ul li#nextProject a').addClass('disabled');
				$('ul li#prevProject a').removeClass('disabled');
		}else if(projectIndex == 0){
				$('ul li#prevProject a').addClass('disabled');
				$('ul li#nextProject a').removeClass('disabled');
		}else{
				$('ul li#nextProject a,ul li#prevProject a').removeClass('disabled');
		}
	}

	function deleteProject(closeURL){
			projectNav.fadeOut(100);
			exitProject.fadeOut(100);
			projectContainer.animate({opacity:0,height:'0px'});
			if(typeof closeURL!='undefined' && closeURL!='') {
				projectContainer.find('iframe').remove();
				location = '#_';
			}
				portfolioGrid.find('li.box.current').children().removeClass('act');
				portfolioGrid.find('li.box.current').removeClass('cur' );
		  }
			$('#nextProject a').on('click',function () {
				current = portfolioGrid.find('li.box.cur');
				next = current.next('li.box');
				target = $(next).children('a.ajax-project').attr('href');
				$(this).attr('href', target);
				if (next.length === 0) {
					 return false;
				 }
			   current.removeClass('cur');
			   current.children().removeClass('act');
			   next.addClass('cur');
			   next.children().addClass('act');
			});
			$('#prevProject a').on('click',function () {
			  current = portfolioGrid.find('li.box.cur');
			  prev = current.prev('li.box');
			  target = $(prev).children('a.ajax-project').attr('href');
			  $(this).attr('href', target);
			   if (prev.length === 0) {
				  return false;
			   }
			   current.removeClass('cur');
			   current.children().removeClass('act');
			   prev.addClass('cur');
			   prev.children().addClass('act');
			});
			$('#closeProject a').on('click',function () {
				 $('html').scrollTo('#options',1500,{'axis':'y'});
				deleteProject($(this).attr('href'));
				portfolioGrid.find('li.box.cur').children().removeClass('act');
				loader.fadeOut();
				return false;
			});
			 pageRefresh = false;
	};

	$(window).load(function(){
		$(window).trigger( 'hashchange');
	});

	$(document).ready(function(){
		initPortfolio();
		initPompey();
	});

//  definition of mobile browser------------------

	var isMobile = {
       Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }

    };

// if not mobile ------------------

  	trueMobile = isMobile.any();

	if (trueMobile == null){

	// parallax  --------

		$('#testimonials').parallax("50%", 0.3);
		$('#contacts').parallax("50%", 0.3);
		$('#single-page-head').parallax("50%", 0.1);
		$('#ticker-bg').parallax("50%", 0.4);


	// zoom --------

		$('.box a, .zoom').zoom({duration:950});
		$('.box  a').hover(
			function(){
				$(this).find('span.folio-overlay').fadeIn(300);
				$(this).find('div.folio-icon').fadeOut(10);
			},
			function(){
				$(this).find('span.folio-overlay').fadeOut(300);
				$(this).find('div.folio-icon').fadeIn(10);
		});
	}

// panel only in demo--------

$('.panel-button').click(function(){
	$('.panel').animate({left:'50px'},1000);
});
$('.close-panel').click(function(){
	$('.panel').animate({left:'-250px'},1000);
});