$(document).ready(function () {
    var userAgent = navigator.userAgent,
        cardShoppingMobile = $("#card-shopping-mobile"),
        searchMobile = $("#search-mobile"),
        categories = $("#categories"),
        search = $("#search"),
        searchInputMobile = $("#searchMobile"),
        resultSearch = $("#resultSearch"),
        visible = $("#visible"),
        carouselOffer = $("#carouselOffer"),
        i,
        n;

    if (
        userAgent.match(/Android/i) ||
        userAgent.match(/webOS/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPod/i) ||
        userAgent.match(/BlackBerry/i) ||
        userAgent.match(/Windows Phone/i)
    ) {
        cardShoppingMobile.removeClass("d-none");
        searchMobile.removeClass("d-none");
        categories.addClass("d-none");
    }

    function initCarousel() {
        if (visible.css("display") === "block") {
            carouselOffer.find(".carousel-item").each(function () {
                i = $(this).next();
                i.length || (i = $(this).siblings(":first"));
                i.children(":first-child").clone().appendTo($(this));

                for (n = 0; n < 4; n++) {
                    i = i.next();
                    i.length || (i = $(this).siblings(":first"));
                    i.children(":first-child").clone().appendTo($(this));
                }
            });
        }
    }

    $(window).on({
        resize: initCarousel,
        load: initCarousel
    });

    search.keyup(function (e) {
        showContainerSearchResult(e);
        e.preventDefault();
    });

    searchInputMobile.keyup(function (e) {
        showContainerSearchResult(e);
        e.preventDefault();
    });

    search.blur(function (e) {
        resultSearch.addClass("d-none");
        e.preventDefault();
    });

    searchInputMobile.blur(function (e) {
        resultSearch.addClass("d-none");
        e.preventDefault();
    });

    $.fn.inputStyle = function (options) {
        var settings = $.extend({
            value: 0,
            step: undefined,
            min: undefined,
            max: undefined
        }, options);

        return this.each(function () {
            var input = $(this);
            var container = document.createElement('div');
            var btnAdd = document.createElement('div');
            var btnRem = document.createElement('div');
            var min = settings.min || input.attr('min');
            var max = settings.max || input.attr('max');
            var value = settings.value || parseFloat(input.val());

            container.className = 'input-number-qty';
            btnAdd.className = (max && value >= max) ? 'qty-btn qty-add disabled' : 'qty-btn qty-add';
            btnAdd.innerHTML = '+';
            btnRem.className = (min && value <= min) ? 'qty-btn qty-rem disabled' : 'qty-btn qty-rem';
            btnRem.innerHTML = '-';
            input.wrap(container);
            input.closest('.input-number-qty').prepend(btnRem).append(btnAdd);

            $(document).off('click', '.qty-btn').on('click', '.qty-btn', function (e) {
                var input = $(this).siblings('input');
                var sibBtn = $(this).siblings('.qty-btn');
                var step = settings.step || parseFloat(input.attr('step'));
                var min = settings.min || input.attr('min');
                var max = settings.max || input.attr('max');
                var oldValue = parseFloat(input.val());
                var newVal;

                if ($(this).hasClass('qty-add')) {
                    newVal = (oldValue >= max) ? oldValue : oldValue + step;
                    newVal = (newVal > max) ? max : newVal;

                    if (newVal === max) {
                        $(this).addClass('disabled');
                    }
                    sibBtn.removeClass('disabled');
                } else {
                    newVal = (oldValue <= min) ? oldValue : oldValue - step;
                    newVal = (newVal < min) ? min : newVal;

                    if (newVal === min) {
                        $(this).addClass('disabled');
                    }
                    sibBtn.removeClass('disabled');
                }
                input.val(newVal).trigger('change');
            });

            input.on('change', function () {
                var val = parseFloat(input.val());
                var min = settings.min || input.attr('min');
                var max = settings.max || input.attr('max');

                if (val > max) {
                    input.val(max);
                }

                if (val < min) {
                    input.val(min);
                }
            });
        });
    };

    $('.input-number').inputStyle();

    function showContainerSearchResult(e) {
        if (e.target.value.length >= 2) {
            resultSearch.removeClass("d-none");
        } else resultSearch.addClass("d-none");
    }
});