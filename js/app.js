'use strict';


 jQuery(document).ready(function ($) {

    var lastId,
    topMenu = $("#top-navigation"),
    topMenuHeight = topMenu.outerHeight(),
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function () {
            var href = $(this).attr("href");
            if(href.indexOf("#") === 0){
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
            }
        });

    var containerWidth = $('.section .container').width();
    $(".triangle").css({
        "border-left": containerWidth / 2 + 'px outset transparent',
        "border-right": containerWidth / 2 + 'px outset transparent'
    });
    $(window).resize(function () {
        containerWidth = $('.container').width();
        $(".triangle").css({
            "border-left": containerWidth / 2 + 'px outset transparent',
            "border-right": containerWidth / 2 + 'px outset transparent'
        });
    });


    $('#da-slider').cslider();

    $('#portfolio-grid').mixitup({
        'onMixStart': function (config) {
            $('div.toggleDiv').hide();
        }
    });


    $('#clint-slider').bxSlider({
        pager: false,
        minSlides: 1,
        maxSlides: 5,
        moveSlides: 2,
        slideWidth: 210,
        slideMargin: 25,
        prevSelector: $('#client-prev'),
        nextSelector: $('#client-next'),
        prevText: '<i class="icon-left-open"></i>',
        nextText: '<i class="icon-right-open"></i>'
    });


    $('input, textarea').placeholder();


    $(window).scroll(function () {


        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }

        if ($(this).scrollTop() > 130) {
            $('.navbar').addClass('navbar-fixed-top animated fadeInDown');
        } else {
            $('.navbar').removeClass('navbar-fixed-top animated fadeInDown');
        }


        var fromTop = $(this).scrollTop() + topMenuHeight + 10;


        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });


        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            menuItems
            .parent().removeClass("active")
            .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    });


    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });


    $(window).load(function () {
        function filterPath(string) {
            return string.replace(/^\//, '').replace(/(index|default).[a-zA-Z]{3,4}$/, '').replace(/\/$/, '');
        }
        $('a[href*=#]').each(function () {
            if (filterPath(location.pathname) == filterPath(this.pathname) && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
                var $targetId = $(this.hash),
                $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
                var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;

                if ($target) {

                    $(this).click(function () {

       
                        topMenu.parent().attr('style', 'height:0px').removeClass('in'); 
                        $('.navbar .btn-navbar').addClass('collapsed');

                        var targetOffset = $target.offset().top - 63;
                        $('html, body').animate({
                            scrollTop: targetOffset
                        }, 800);
                        return false;
                    });
                }
            }
        });
});


    $('#subscribe').click(function () {
        var error = false;
        var emailCompare = /^([a-z0-9_.-]+)@([0-9a-z.-]+).([a-z.]{2,6})$/; 
        var email = $('input#nlmail').val().toLowerCase(); 
        if (email == "" || email == " " || !emailCompare.test(email)) {
            $('#err-subscribe').show(500);
            $('#err-subscribe').delay(4000);
            $('#err-subscribe').animate({
                height: 'toggle'
            }, 500, function () {
                
            });
            error = true; 
        }

        if (error === false) {
            $.ajax({
                type: 'POST',
                url: 'php/newsletter.php',

                data: {
                    email: $('#nlmail').val()
                },
                error: function (request, error) {
                    alert("An error occurred");
                },
                success: function (response) {
                    if (response == 'OK') {
                        $('#success-subscribe').show();
                        $('#nlmail').val('')
                    } else {
                        alert("An error occurred");
                    }
                }
            });
        }

        return false;
    });


$("#send-mail").click(function () {

        var name = $('input#name').val(); 
        var error = false;
        if (name == "" || name == " ") {
            $('#err-name').show(500);
            $('#err-name').delay(4000);
            $('#err-name').animate({
                height: 'toggle'
            }, 500, function () {
                
            });
            error = true; 
        }

        var emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; 
        var email = $('input#email').val().toLowerCase(); 
        if (email == "" || email == " " || !emailCompare.test(email)) {
            $('#err-email').show(500);
            $('#err-email').delay(4000);
            $('#err-email').animate({
                height: 'toggle'
            }, 500, function () {
              
            });
            error = true;
        }


        var comment = $('textarea#comment').val();
        if (comment == "" || comment == " ") {
            $('#err-comment').show(500);
            $('#err-comment').delay(4000);
            $('#err-comment').animate({
                height: 'toggle'
            }, 500, function () {
              
            });
            error = true; 
        }

        if (error == false) {
            var dataString = $('#contact-form').serialize(); 
            $.ajax({
                type: "POST",
                url: $('#contact-form').attr('action'),
                data: dataString,
                timeout: 6000,
                error: function (request, error) {

                },
                success: function (response) {
                    response = $.parseJSON(response);
                    if (response.success) {
                        $('#successSend').show();
                        $("#name").val('');
                        $("#email").val('');
                        $("#comment").val('');
                    } else {
                        $('#errorSend').show();
                    }
                }
            });
            return false;
        }

        return false; 
    });



    
    $.fn.showHide = function (options) {
        var defaults = {
            speed: 1000,
            easing: '',
            changeText: 0,
            showText: 'Show',
            hideText: 'Hide'
        };
        var options = $.extend(defaults, options);
        $(this).click(function () {
            $('.toggleDiv').slideUp(options.speed, options.easing);
            var toggleClick = $(this);
            var toggleDiv = $(this).attr('rel');
            $(toggleDiv).slideToggle(options.speed, options.easing, function () {
                if (options.changeText == 1) {
                    $(toggleDiv).is(":visible") ? toggleClick.text(options.hideText) : toggleClick.text(options.showText);
                }
            });
            return false;
        });
    };

   
    $('div.toggleDiv').hide();
    $('.show_hide').showHide({
        speed: 500,
        changeText: 0,
        showText: 'View',
        hideText: 'Close'
    });

   
    jQuery('.thumbnail').one('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });

    
    jQuery('.triangle').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    
    
    jQuery('#first-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#first-person').addClass("animated pulse");
        } else {
            jQuery('#first-person').removeClass("animated pulse");
        }
    });
    
    jQuery('#second-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#second-person').addClass("animated pulse");
        } else {
            jQuery('#second-person').removeClass("animated pulse");
        }
    });

    jQuery('#third-person').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('#third-person').addClass("animated pulse");
        } else {
            jQuery('#third-person').removeClass("animated pulse");
        }
    });
    
    jQuery('.price-column, .testimonial').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).addClass("animated fadeInDown");
        } else {
            jQuery(this).removeClass("animated fadeInDown");
        }
    });
    
    jQuery('.contact-form').bind('inview', function (event, visible) {
        if (visible == true) {
            jQuery('.contact-form').addClass("animated bounceIn");
        } else {
            jQuery('.contact-form').removeClass("animated bounceIn");
        }
    });

    jQuery('.skills > li > span').one('inview', function (event, visible) {
        if (visible == true) {
            jQuery(this).each(function () {
                jQuery(this).animate({
                    width: jQuery(this).attr('data-width')
                }, 3000);
            });
        }
    });
});


function initializeMap() {

    var lat = '44.8164056'; 
    var lon = '20.46090424'; 

    var centerLon = lon - 0.0105;

    var myOptions = {
        scrollwheel: false,
        draggable: false,
        disableDefaultUI: true,
        center: new google.maps.LatLng(lat, centerLon),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, lon),

    });

    var infowindow = new google.maps.InfoWindow({
        content: "Your content goes here!"
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

    infowindow.open(map, marker);
}