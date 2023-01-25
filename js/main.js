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

    function showContainerSearchResult(e) {
        if (e.target.value.length >= 2) {
            resultSearch.removeClass("d-none");
        } else resultSearch.addClass("d-none");
    }
});