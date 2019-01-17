$(document).ready(function() {
    /*client testimonial sec*/
    $('.customer_slide').owlCarousel({
		loop : true,
		margin : 0,
		dots : true,
		nav : false,
		center: true,
		autoplay : false,
		autoplayHoverPause : true,
		autoplayTimeout : 4000,
		autoplaySpeed : false,
		responsive : {
			0 : {
				items : 1
			},
			768 : {
				items : 1
			},
			800 : {
				items : 1
			},
            
			1000 : {
				items : 1
			}
		}
	});
});

/*Scroll to top when arrow up clicked BEGIN*/
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}
/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 2000);
        return false;
    });

});
 /*Scroll to top when arrow up clicked END*/

/* start header menu scrollin sec js */


$(document).ready(function() {
	$('.navbar-nav > li > a').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			 //nv_ht = $('.navbar_bg ').height();
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop : targetOffset //-nv_ht-122
				}, 800);
				return false;
			}
		}
	});
});

$(document).ready(function() {
	$('.mobilemenu > li > a').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			 //nv_ht = $('.navbar_bg ').height();
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop : targetOffset //-nv_ht-122
				}, 800);
				return false;
			}
		}
	});
});
/* footer section */
$(document).ready(function() {
	$('.foo-nav > li > a').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			 //nv_ht = $('.navbar_bg ').height();
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
			if ($target.length) {
				var targetOffset = $target.offset().top;
				$('html,body').animate({
					scrollTop : targetOffset //-nv_ht-122
				}, 800);
				return false;
			}
		}
	});
});

/* 4-1-19*/

/* 4-1-19*/
!!window['addEventListener'] && new WOW().init();

