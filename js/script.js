$(function () {
    /* Inits */
    initLazy();
    initMenu();
    /* Lazy */
    function initLazy() {

        let
            lazyArr = [].slice.call(document.querySelectorAll('.lazy')),
            active = false,
            threshold = 200
            ;

        const lazyLoad = function (e) {
            if (active === false) {
                active = true;

                setTimeout(function () {
                    lazyArr.forEach(function (lazyObj) {
                        if ((lazyObj.getBoundingClientRect().top <= window.innerHeight + threshold && lazyObj.getBoundingClientRect().bottom >= -threshold) && getComputedStyle(lazyObj).display !== 'none') {

                            if (lazyObj.dataset.src) {
                                let
                                    img = new Image(),
                                    src = lazyObj.dataset.src
                                    ;
                                img.src = src;
                                img.onload = function () {
                                    if (!!lazyObj.parent) {
                                        lazyObj.parent.replaceChild(img, lazyObj);
                                    } else {
                                        lazyObj.src = src;
                                    }
                                }
                                lazyObj.removeAttribute('data-src');
                            }

                            if (lazyObj.dataset.srcset) {
                                lazyObj.srcset = lazyObj.dataset.srcset;
                                lazyObj.removeAttribute('data-srcset');
                            }

                            lazyObj.classList.remove('lazy');
                            lazyObj.classList.add('lazy-loaded');

                            lazyArr = lazyArr.filter(function (obj) {
                                return obj !== lazyObj;
                            });

                            if (lazyArr.length === 0) {
                                document.removeEventListener('scroll', lazyLoad);
                                window.removeEventListener('resize', lazyLoad);
                                window.removeEventListener('orientationchange', lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        lazyLoad();

        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
    /*header menu*/
    function initMenu() {
        $('.header__menu').on('click', function () {
            $('.header__nav').toggleClass('active')

        });
        $('.header__nav-link').on('click', function () {
            $('.ham, .header__nav').removeClass('active');
        });
    }
    //backgraundmenu
    function initScrollHeader() {
        const header = $('.header');
        const scroll = $(window).scrollTop();
        if (scroll >= 40) {
            header.addClass('active');

        } else {
            header.removeClass('active');
        }
    }

    $(window).scroll(() => initScrollHeader())
    /*header menu*/
    /* Program Модули */
    $('.program__item-button').click(function () {
        $(this).closest('.program__item').toggleClass("active");
    })
    /* Program Модули */


    /* Слайдеры */
    //reviews slider woow!
    let $reviews_slider = $('.reviews__block'),
        settingsReviews = {
            infinite: false,
            mobileFirst: false,

            centerMode: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0',
            responsive: [
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: '0'
                    }

                }

            ]
        }
    if ($reviews_slider.length) {
        var currentSlide;
        var slidesCount;
        var sliderCounter = document.createElement('div');
        sliderCounter.classList.add('slider__counter');

        var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).text(currentSlide + ' / ' + slidesCount)
        };

        $reviews_slider.on('init', function (event, slick) {
            $reviews_slider.append(sliderCounter);
            updateSliderCounter(slick);
        });

        $reviews_slider.on('afterChange', function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
        });
    }
    $reviews_slider.slick(settingsReviews);

    $(window).on('resize', function () {
        if (!$reviews_slider.hasClass('slick-initialized')) {
            return $reviews_slider.slick(settingsReviews);
        }
    });


});