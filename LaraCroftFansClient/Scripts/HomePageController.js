$(document).ready(function () {

    var homeDiv = $('#initialPosts');

    if (homeDiv.length) {
        LoadPost("Home");
    }

    var tabDiv = $('#filterDiv');

    if (tabDiv.length) {
        var id = $('#idTag').val();
        $.ajax({
            type: "POST",
            url: "/Home/LoadByTag?id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (response) {

                $("#title").append("Posts from: " + response[0].description);

                response.forEach(function (value, index) {
                    var imageUrl = new Image();
                    imageUrl.src = 'http://admin.laracroftfans.com/Images/Posts/' + value.image;

                    var imageUser = new Image();
                    imageUser.src = "http://admin.laracroftfans.com/Images/Users/image" + value.iduser + ".jpg";

                    var html = "<li class=\"g1-collection-item\">" +
                        "<article class=\"entry-tpl-list\">" +
                        "<figure class=\"entry-featured-media\">" +
                        "<a class=\"g1-frame\" href=\"/posts/ViewPost/" + value.idpost + "\">" +
                        "<span class=\"g1-frame-inner\" style=\"padding-bottom:55%;\">" +
                        "<img width=\"308\" height=\"205\" src=\"" + imageUrl.src + "\" class=\"attachment-bimber-list-standard size-bimber-list-standard wp-post-image\" alt=\"\">" +
                        "</span>" +
                        "</a>" +
                        "</figure>" +
                        "<div class=\"entry-body\">" +
                        "<header class=\"entry-header\">" +
                        "<div class=\"entry-before-title\"></div>" +
                        "<h3 class=\"g1-gamma g1-gamma-1st entry-title\"><a href=\"/posts/ViewPost/" + value.idpost + "\">" + value.title + "</a></h3>" +
                        "</header>" +
                        "<footer>" +
                        "<p class=\"g1-meta entry-meta entry-byline entry-byline-with-avatar\">" +
                        "<span class=\"entry-author\">" +
                        "<span class=\"entry-meta-label\">By</span>" +
                        "<a href=\"/posts/ViewPost/" + value.idpost + "\" title=\"" + value.name + "\" rel=\"author\">" +
                        "<img alt=\"\" src=\"" + imageUser.src + "\" class=\"avatar avatar-30 photo\" height=\"30\" width=\"30\">" +
                        "<strong> " + value.name + "</strong>" +
                        "</a>" +
                        "</span>" +
                        "<time class=\"entry-date\" datetime=\"" + value.postdate + "\" title=\"" + value.postdate + "\">" + moment(value.postdate).startOf('day').fromNow() + "</time>" +
                        "</p>" +
                        "</footer>" +
                        "</div>" +
                        "</article>" +
                        "</li>";

                    var htmlNew =
                        '<div class="col-md-4">' +
                        '<article class="entry card">' +
                        '<div class="entry__img-holder card__img-holder">' +
                        '<a href="/posts/ViewPost/' + value.idpost + '">' +
                        '<div class="thumb-container thumb-70">' +
                        '<img data-src="' + imageUrl.src + '" src=' + imageUrl.src + ' class="entry__img lazyloaded" alt="">' +
                        '</div>' +
                        '</a>' +
                        '<a href="/Home/Filter" onclick = "SetSession(' + value.tagId + ')" class="entry__meta-category entry__meta-category--label entry__meta-category--align-in-corner entry__meta-category--violet" >' + value.description + '</a >' +
                        '</div>' +
                        '<div class="entry__body card__body">' +
                        '<div class="entry__header">' +
                        '<h2 class="entry__title">' +
                        '<a href="/posts/ViewPost/' + value.idpost + '">' + value.title + '</a>' +
                        '</h2>' +
                        '<ul class="entry__meta">' +
                        '<li class="entry__meta-author">' +
                        '<span>by &nbsp</span>' +
                        '<a href="#">' + value.name + '&nbsp</a>' +
                        '</li>' +
                        '<li class="entry__meta-date">' +
                        " <time class=\"entry-date\" datetime=\"" + value.postdate + "\" title=\"" + value.postdate + "\">" + moment(value.postdate).startOf('day').fromNow() + "</time>" +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '<div class="entry__excerpt">' +
                        '<p>' + value.content + ' ...</p>' +
                        '</div>' +
                        '</div>' +
                        '</article>' +
                        '</div >';

                    $("#filterDiv").append(htmlNew);
                    $("#filterDiv").show("fade", 1000);
                });
            },
            failure: function (response) {
                alert(response.responseText);
            },
            error: function (response) {
                alert(response.responseText);
            }
        });
    }

    $(".left-mobile-menu ul li").click(function () {
        var child = this.children[1];
        $(child).toggle('blind');

    });

    $("#hamburguer").click(function () {
        $(".left-mobile-menu").toggle('drop');
    });


});

function SetSession(id) {
    $.ajax({
        type: "POST",
        url: "/Home/SetSectionFilter?id=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        async: false
    });
}

function LoadPost(actionPage) {
    $.ajax({
        type: "POST",
        url: "/Home/LoadInitialPosts",
        data: { action: actionPage },
        dataType: "json",
        cache: false,
        success: function (result) {
        
            $("#initialPosts").empty();

            var actualPage = 0;
            var totalPages = 0;

            result.forEach(function (value) {

                actualPage = value.page;

                $("#pageNumberArea").empty();
                $("#pageNumberArea").append("Page " + (value.page + 1));

                var imageUrl = new Image();
                imageUrl.src = 'http://admin.laracroftfans.com/Images/Posts/' + value.image;

                var imageUser = new Image();
                imageUser.src = "http://admin.laracroftfans.com/Images/Users/image" + value.iduser + ".jpg";

                var html = "<li class=\"g1-collection-item\">" +
                    "<article class=\"entry-tpl-list\">" +
                    "<figure class=\"entry-featured-media\">" +
                    "<a class=\"g1-frame\" href=\"/posts/ViewPost/" + value.idpost + "\">" +
                    "<span class=\"g1-frame-inner\" style=\"padding-bottom: 55%;\">" +
                    "<img width=\"308\" height=\"205\" src=\"" + imageUrl.src + "\" class=\"home-img\" alt=\"\">" +
                    "</span>" +
                    "</a>" +
                    "</figure>" +
                    "<div class=\"entry-body\">" +
                    "<header class=\"entry-header\">" +
                    "<div class=\"entry-before-title\"></div>" +
                    "<h3 class=\"g1-gamma g1-gamma-1st entry-title\"><a href=\"/posts/ViewPost/" + value.idpost + "\">" + value.title + "</a></h3>" +
                    "</header>" +
                    "<footer>" +
                    "<p class=\"g1-meta entry-meta entry-byline entry-byline-with-avatar\">" +
                    "<span class=\"entry-author\">" +
                    "<span class=\"entry-meta-label\">By</span>" +
                    "<a href=\"/posts/ViewPost/" + value.idpost + "\" title=\"" + value.name + "\" rel=\"author\">" +
                    "<img alt=\"\" src=\"" + imageUser.src + "\" class=\"avatar avatar-30 photo\" height=\"30\" width=\"30\">" +
                    "<strong> " + value.name + "</strong>" +
                    "</a>" +
                    "</span>" +
                    "<time class=\"entry-date\" datetime=\"" + value.postdate + "\" title=\"" + value.postdate + "\">" + moment(value.postdate).startOf('day').fromNow() + "</time>" +
                    "</p>" +
                    "</footer>" +
                    "</div>" +
                    "</article>" +
                    "</li>";

                var htmlNew =
                    '<div class="col-md-6">' +
                    '<article class="entry card">' +
                    '<div class="entry__img-holder card__img-holder">' +
                    '<a href="/posts/ViewPost/' + value.idpost + '">' +
                    '<div class="thumb-container thumb-70">' +
                    '<img data-src="' + imageUrl.src + '" src=' + imageUrl.src + ' class="entry__img lazyloaded" alt="">' +
                    '</div>' +
                    '</a>' +
                    '<a href="/Home/Filter" onclick = "SetSession(' + value.tagId + ')" class="entry__meta-category entry__meta-category--label entry__meta-category--align-in-corner entry__meta-category--violet" >' + value.description + '</a >' +
                    '</div>' +
                    '<div class="entry__body card__body">' +
                    '<div class="entry__header">' +
                    '<h2 class="entry__title">' +
                    '<a href="/posts/ViewPost/' + value.idpost + '">' + value.title + '</a>' +
                    '</h2>' +
                    '<ul class="entry__meta">' +
                    '<li class="entry__meta-author">' +
                    '<span>by &nbsp</span>' +
                    '<a href="#">' + value.name + '&nbsp</a>' +
                    '</li>' +
                    '<li class="entry__meta-date">' +
                    " <time class=\"entry-date\" datetime=\"" + value.postdate + "\" title=\"" + value.postdate + "\">" + moment(value.postdate).startOf('day').fromNow() + "</time>" +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="entry__excerpt">' +
                    '<p>' + value.content + ' ...</p>' +
                    '</div>' +
                    '</div>' +
                    '</article>' +
                    '</div >';

                $("#initialPostsLoader").hide();

                $("#initialPosts").append(htmlNew);

                $("#initialPosts").show("fade", 1000);

                totalPages++;
            });

            if (actualPage == 0) {
                $("#btnPrevious").hide();
                $("#btnNext").show();
            } else if (actualPage != totalPages && actualPage != 0) {
                $("#btnPrevious").show();
                $("#btnNext").show();
            } else if (actualPage == totalPages) {
                $("#btnPrevious").show();
                $("#btnNext").hide();
            }

            if (actualPage != 0) {
                $("body, html").animate({
                    scrollTop: $(".layout-main-size").position().top
                });
            }
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}
