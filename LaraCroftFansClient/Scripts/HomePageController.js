$(document).ready(function () {

    var homeDiv = $('#initialPosts');

    if (homeDiv.length) {
        $.ajax({
            type: "POST",
            url: "/Home/LoadInitialPosts",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (response) {
                response.forEach(function (value, index) {
                    var imageUrl = new Image();
                    imageUrl.src = 'http://admin.laracroftfans.com/Images/Posts/' + value.image;

                    var imageUser = new Image();
                    imageUser.src = "http://admin.laracroftfans.com/Images/Users/image" + value.iduser + ".jpg";

                    var ratio = (imageUrl.height / imageUrl.width) * 100;

                    var ratioValue;

                    if (ratio)
                        ratioValue = ratio + "%";
                    else
                        ratioValue = "205px;";

                    var html = "<li class=\"g1-collection-item\">" +
                        "<article class=\"entry-tpl-list\">" +
                        "<figure class=\"entry-featured-media\">" +
                        "<a class=\"g1-frame\" href=\"/posts/ViewPost/" + value.idpost + "\">" +
                        "<span class=\"g1-frame-inner\" style=\"padding-bottom:" + ratioValue + ";\">" +
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
                    $("#initialPostsLoader").hide();

                    $("#initialPosts").append(html);

                    $("#initialPosts").show("fade", 1000)
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

                    var ratio = (imageUrl.height / imageUrl.width) * 100;

                    var ratioValue;

                    if (ratio)
                        ratioValue = ratio + "%";
                    else
                        ratioValue = "205px;";

                    var html = "<li class=\"g1-collection-item\">" +
                        "<article class=\"entry-tpl-list\">" +
                        "<figure class=\"entry-featured-media\">" +
                        "<a class=\"g1-frame\" href=\"/posts/ViewPost/" + value.idpost + "\">" +
                        "<span class=\"g1-frame-inner\" style=\"padding-bottom:" + ratioValue + ";\">" +
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


                    $("#filterDiv").append(html);
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