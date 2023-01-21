$(document).ready(function () {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        $("#card-shopping-mobile").removeClass("d-none");
        $("#search-mobile").removeClass("d-none");
        $("#categories").addClass("d-none");
    }

    function initCarousel() {
        if ($("#visible").css("display") == "block") {
            $("#carouselOffer .carousel-item").each(function () {
                var i = $(this).next();
                i.length || (i = $(this).siblings(":first")),
                    i.children(":first-child").clone().appendTo($(this));

                for (var n = 0; n < 4; n++)
                    (i = i.next()).length || (i = $(this).siblings(":first")),
                        i.children(":first-child").clone().appendTo($(this));
            });
        }
    }

    $(window).on({
        resize: initCarousel(),
        load: initCarousel()
    });
});