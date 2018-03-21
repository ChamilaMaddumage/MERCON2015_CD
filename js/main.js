(function($){
	$(document).ready(function(){

        /*----------------------------------------------------*/
		/*	Sticky Header
		/*----------------------------------------------------*/
        (function() {

            var docElem = document.documentElement,
                didScroll = false,
                changeHeaderOn = 190;
                //changeHeaderOn = header.clientTop;
                var p = $( "header" );
                var offset = p.offset();
               // alert(offset.top);
                document.querySelector( "nav-bar" );
            
                //changeHeaderOn = offset.top
               // alert(changeHeaderOn);
            function init() {
                window.addEventListener( 'scroll', function() {
                    if( !didScroll ) {
                        didScroll = true;
                        setTimeout( scrollPage, 250 );
                    }
                }, false );
            }

            function scrollPage() {
                var sy = scrollY();
                if ( sy >= changeHeaderOn ) {
                    // $("header").animate({top:changeHeaderOn},{duration:500,queue:false});
                    $("header").addClass("fixed-header");
                    $(".mean-bar").addClass("fixed");
                }else {
                   $("header").removeClass("fixed-header");
                   $(".mean-bar").removeClass("fixed");
                }
                didScroll = false;
            }

            function scrollY() {
                var top_val = window.pageYOffset || docElem.scrollTop;
                return top_val;
            }

            init();
            
        })();


		/*----------------------------------------------------*/
		/*	Navigation
		/*----------------------------------------------------*/
		$('.menu ul').superfish({
			delay:       100,                              // one second delay on mouseout
			speed:       500,                              // animation speed
			speedOut:    200,                                // out animation speed
			animation:   {opacity:'show',height:'show'}   // fade-in and slide-down animation
		});

		/*----------------------------------------------------*/
		/*	Mobile Navigation
		/*----------------------------------------------------*/
        $('header nav').meanmenu({
            meanScreenWidth: "768"
        });


        if ($.fn.cssOriginal != undefined) {
            $.fn.css = $.fn.cssOriginal;
        }

		/*----------------------------------------------------*/
		/*	Carousel
		/*----------------------------------------------------*/
		// Add classes for other carousels
		var $carousel = $('.recent-work-jc');
		var scrollCount;
		function adjustScrollCount() {
			if( $(window).width() < 768 ) {
				scrollCount = 1;
			} else {
				scrollCount = 3;
			}
		}

		function adjustCarouselHeight() {
			$carousel.each(function() {
				var $this    = $(this);
				var maxHeight = -1;
				$this.find('li').each(function() {
					maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
				});
				$this.height(maxHeight);
			});
		}

		function initCarousel() {
			adjustCarouselHeight();
			adjustScrollCount();
			var i = 0;
			var g = {};
			$carousel.each(function() {
				i++;
				var $this = $(this);
				g[i] = $this.jcarousel({
					animation           : 600,
					scroll              : scrollCount
				});
				$this.jcarousel('scroll', 0);
				 $this.prev().find('.jcarousel-prev').bind('active.jcarouselcontrol', function() {
					$(this).addClass('active');
				}).bind('inactive.jcarouselcontrol', function() {
					$(this).removeClass('active');
				}).jcarouselControl({
					target: '-='+scrollCount,
					carousel: g[i]
				});

				$this.prev().find('.jcarousel-next').bind('active.jcarouselcontrol', function() {
					$(this).addClass('active');
				}).bind('inactive.jcarouselcontrol', function() {
					$(this).removeClass('active');
				}).jcarouselControl({
					target: '+='+scrollCount,
					carousel: g[i]
				});

				$this.touchwipe({
					wipeLeft: function() {
						$this.jcarousel('scroll','+='+scrollCount);
					},
					wipeRight: function() {
						$this.jcarousel('scroll','-='+scrollCount);
					}
				});
			});
		}

		$(window).load(function(){
			initCarousel();
		});

		$(window).resize(function () {
			$carousel.each(function() {
				var $this = $(this);
				$this.jcarousel('destroy');
			});
			initCarousel();
		});


		$("body").tooltip({
			selector: '[data-toggle="tooltip"]'
		});


		//  ============================
		//  = Scroll event function =
		//  ===========================
		var goScrolling = function(elem) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = elem.offset().top;
			var elemBottom = elemTop + elem.height();
			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
		};


		//  =======================
		//  = Progress bars =
		//  =======================
		$('.progress_skill .bar').data('width', $(this).width()).css({
			width : 0,
			height:0
		});
		$(window).scroll(function() {
			$('.progress_skill .bar').each(function() {
				if (goScrolling($(this))) {
					$(this).css({
						width : $(this).attr('data-value') + '%',
						height : $(this).attr('data-height') + '%'
					});
				}
			});
		});


        //  ===================
        //  = Flickr Gallery =
        //  ===================
        $('#flickrFeed').jflickrfeed({
            limit: 9,
            qstrings: {
                //id: '124787947@N07' our id //
                id: '124787947@N07'
            },
            itemTemplate: '<li><a class="mfp-gallery" title="{{title}}" href="{{image_b}}"><i class="fa fa-search"></i><div class="hover"></div></a><img src="{{image_s}}" alt="{{title}}" /></li>'
        });


        /*===========================================================*/
        /*	Isotope Posrtfolio
        /*===========================================================*/
        if(jQuery.isFunction(jQuery.fn.isotope)){
            jQuery('.portfolio_list').isotope({
                itemSelector : '.list_item',
                layoutMode : 'fitRows',
                animationEngine : 'jquery'
            });

            /* ---- Filtering ----- */
            jQuery('#filter li').click(function(){
                var $this = jQuery(this);
                if ( $this.hasClass('selected') ) {
                    return false;
                } else {
                        jQuery('#filter .selected').removeClass('selected');
                        var selector = $this.attr('data-filter');
                        $this.parent().next().isotope({ filter: selector });
                        $this.addClass('selected');
                        return false;
                    }
            });
        }


        /*----------------------------------------------------*/
        /*	Magnific Popup
        /*----------------------------------------------------*/
            $('body').magnificPopup({
                type: 'image',
                delegate: 'a.mfp-gallery',
                fixedContentPos: true,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: true,
                removalDelay: 0,
                mainClass: 'mfp-fade',
                gallery:{enabled:true},
                callbacks: {
                    buildControls: function() {
                        console.log('inside'); this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
                    }
                }
            });

            $('.mfp-image').magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                mainClass: 'mfp-fade',
                image: {
                    verticalFit: true
                }
            });

            $('.mfp-youtube, .mfp-vimeo, .mfp-gmaps').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 0,
                preloader: false,
                fixedContentPos: false
            });

        /*----------------------------------------------------*/
        /*	Swipe Slider
        /*----------------------------------------------------*/
            window.mySwipe = new Swipe(document.getElementById('slider'), {
              startSlide: 2,
              speed: 400,
              auto: 3000,
              continuous: true,
              disableScroll: false,
              stopPropagation: false,
              callback: function(index, elem) {},
              transitionEnd: function(index, elem) {}
            });

        /*----------------------------------------------------*/
        /*	Accordians
        /*----------------------------------------------------*/

        $('.accordion').on('shown.bs.collapse', function (e) {
            $(e.target).parent().addClass('active_acc');
            $(e.target).prev().find('.switch').removeClass('fa-plus-circle');
            $(e.target).prev().find('.switch').addClass('fa-minus-circle');
        });
        $('.accordion').on('hidden.bs.collapse', function (e) {
            $(e.target).parent().removeClass('active_acc');
            $(e.target).prev().find('.switch').addClass('fa-plus-circle');
            $(e.target).prev().find('.switch').removeClass('fa-minus-circle');
        });


        /*----------------------------------------------------*/
        /*	Toggles
        /*----------------------------------------------------*/
        $('.toggle').on('shown.bs.collapse', function (e) {
            $(e.target).parent().addClass('active_acc');
            $(e.target).prev().find('.switch').removeClass('fa-plus-circle');
            $(e.target).prev().find('.switch').addClass('fa-minus-circle');
        });
        $('.toggle').on('hidden.bs.collapse', function (e) {
            $(e.target).parent().removeClass('active_acc');
            $(e.target).prev().find('.switch').addClass('fa-plus-circle');
            $(e.target).prev().find('.switch').removeClass('fa-minus-circle');
        });


        /* ------------------ End Document ------------------ */
	});
})(this.jQuery);

$(document).ready(function() {

	        /*=================
			*	Contact Form
			* #contact
			===================*/

			try{
				jQuery('#contact').validate({
					submitHandler: function(form) {
						jQuery('#contact .message').hide();
						var ajaxurl = 'contact.php';
						var data = {
							action: 'contact_us',
							datas: jQuery(form).serialize()
						};

						jQuery.ajax({
							type: 'POST',
							url: ajaxurl,
							data: data,
							success: function(response){
								jQuery('#contact .message').text(response.error).css({'display' : 'inline-block'});
							},
							dataType: 'json'
						});
						return false;
 					},
 					rules: {
 						c_name: {
 							 required: true,
      						 minlength: 3
 						},
 						c_mail: {
 							required: true,
 							email: true
 						},
 						c_subject: {
 							required: true,
 							minlength: 6
 						},
 						c_message:{
 							required: true,
 							minlength: 20
 						}
 					}
				});
			}catch(e){

			}


    /*============
        BUTTON UP
    * ===========*/
		var btnUp = $('<div/>', {'class':'btntoTop'});
		btnUp.appendTo('body');
		$(document)
			.on('click', '.btntoTop', function() {
				$('html, body').animate({
					scrollTop: 0
				}, 700);
			});

		$(window)
			.on('scroll', function() {
				if ($(this).scrollTop() > 200)
					$('.btntoTop').addClass('active');
				else
					$('.btntoTop').removeClass('active');
			});
});
        jQuery(document).ready(function ($) {
            var options = {
                $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
                $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
                $SlideDuration: 500,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
                $UISearchMode: 0,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).

                $ThumbnailNavigatorOptions: {
                    $Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
                    $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always

                    $Loop: 1,                                       //[Optional] Enable loop(circular) of carousel or not, 0: stop, 1: loop, 2 rewind, default value is 1
                    $SpacingX: 3,                                   //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
                    $SpacingY: 3,                                   //[Optional] Vertical space between each thumbnail in pixel, default value is 0
                    $DisplayPieces: 6,                              //[Optional] Number of pieces to display, default value is 1
                    $ParkingPosition: 253,                          //[Optional] The offset position to park thumbnail,

                    $ArrowNavigatorOptions: {
                        $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                        $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                        $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                        $Steps: 6                                       //[Optional] Steps to go for each navigation request, default value is 1
                    }
                }
            };

            var jssor_slider1 = new $JssorSlider$("slider1_container", options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
            function ScaleSlider() {
                var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
                if (parentWidth)
                    jssor_slider1.$ScaleWidth(Math.min(parentWidth, 720));
                else
                    window.setTimeout(ScaleSlider, 30);
            }
            ScaleSlider();

            $(window).bind("load", ScaleSlider);
            $(window).bind("resize", ScaleSlider);
            $(window).bind("orientationchange", ScaleSlider);
            //responsive code end
        });



        $('.tlt').textillate({
            // the default selector to use when detecting multiple texts to animate
            selector: '.texts',

            // enable looping
            loop: true,

            // sets the minimum display time for each text before it is replaced
            minDisplayTime: 2000,

            // sets the initial delay before starting the animation
            // (note that depending on the in effect you may need to manually apply 
            // visibility: hidden to the element before running this plugin)
            initialDelay: 0,

            // set whether or not to automatically start animating
            autoStart: true,

            // custom set of 'in' effects. This effects whether or not the 
            // character is shown/hidden before or after an animation  
            inEffects: ['rollIn'],

            // custom set of 'out' effects
            outEffects: ['rollOut'],

            // in animation settings
            in : {
                // set the effect name
                effect: 'rollIn',

                // set the delay factor applied to each consecutive character
                delayScale: 1.5,

                // set the delay between each character
                delay: 50,

                // set to true to animate all the characters at the same time
                sync: false,

                // randomize the character sequence 
                // (note that shuffle doesn't make sense with sync = true)
                shuffle: false,

                // reverse the character sequence 
                // (note that reverse doesn't make sense with sync = true)
                reverse: false,

                // callback that executes once the animation has finished
                callback: function () {}
            },

            // out animation settings.
            out: {
                effect: 'rotateOut',
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: false,
                reverse: true,
                callback: function () {}
            },

            // callback that executes once textillate has finished 
            callback: function () {},

            // set the type of token to animate (available types: 'char' and 'word')
            type: 'char'
        });

        $('.tlt2').textillate({
            // the default selector to use when detecting multiple texts to animate
            selector: '.texts',

            // enable looping
            loop: true,

            // sets the minimum display time for each text before it is replaced
            minDisplayTime: 2000,

            // sets the initial delay before starting the animation
            // (note that depending on the in effect you may need to manually apply 
            // visibility: hidden to the element before running this plugin)
            initialDelay: 3,

            // set whether or not to automatically start animating
            autoStart: true,

            // custom set of 'in' effects. This effects whether or not the 
            // character is shown/hidden before or after an animation  
            inEffects: ['rollIn'],

            // custom set of 'out' effects
            outEffects: ['rollOut'],

            // in animation settings
            in : {
                // set the effect name
                effect: 'rollIn',

                // set the delay factor applied to each consecutive character
                delayScale: 1.5,

                // set the delay between each character
                delay: 50,

                // set to true to animate all the characters at the same time
                sync: false,

                // randomize the character sequence 
                // (note that shuffle doesn't make sense with sync = true)
                shuffle: false,

                // reverse the character sequence 
                // (note that reverse doesn't make sense with sync = true)
                reverse: false,

                // callback that executes once the animation has finished
                callback: function () {}
            },

            // out animation settings.
            out: {
                effect: 'rotateOut',
                delayScale: 1.5,
                delay: 50,
                sync: false,
                shuffle: false,
                reverse: true,
                callback: function () {}
            },

            // callback that executes once textillate has finished 
            callback: function () {},

            // set the type of token to animate (available types: 'char' and 'word')
            type: 'char'
        });




/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch, iPad, and Android mobile phones
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 */
(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);



