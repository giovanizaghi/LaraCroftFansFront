$(document).ready(function () {
    var id = $("#tagID").val();
    if (id) {
        $.ajax({
            type: "POST",
            url: "/posts/SeeMorePosts",
            data: '{id: "' + id + '" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                response.forEach(function (value, index) {
                    var bgImgUrl = 'http://admin.laracroftfans.com/Images/Posts/' + value.image;
                    $("#moreposts").append(
                        "<div class=\"suggest-item\" style=\"background-image: url('" + bgImgUrl + "');\" onclick=\"window.location.href = 'Posts/ViewPost/" + value.id + "'\">" +
                        "<span> " + value.title + "</span>" +
                        "</div>");
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

    var idInterviewWidget = $("#interview-widget");

    if (idInterviewWidget) {
        $.ajax({
            type: "POST",
            url: "/Home/LoadInterviews",
            data: '{id: "4" }',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                response.forEach(function (value, index) {
                    var bgImgUrl = 'http://admin.laracroftfans.com/Images/Posts/' + value.image;
                    idInterviewWidget.append(
                        "<div class=\"interview-item\" onclick =\"window.location.href = 'Posts/ViewPost/" + value.id + "' \">" +
                        "<div class=\"image\" style=\"background-image:url('" + bgImgUrl + "')\"</div>" +
                        "<div class=\"content\">" +
                        "<div class=\"red-line\"></div>" +
                        "<h1 class=\"interview-title\">Raiding Tombs</h1>" +
                        "<a>Interview | " + value.title + "</a>" +
                        "</div>" +
                        "</div>");
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
});