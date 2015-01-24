/* jshint jquery:true*/
// omit feature is buggy. will fix later.

$(document).ready(function () {
    var api = "https://www.reddit.com/api/recommend/sr/";
    var redditBaseLink = "https://www.reddit.com/r/";
    var srLink;
    var srArray;
    var srString = '';
    //var omitArray = [];
    //var omitString;

    /*// DEBUG CODE
    var codepoint = 0;

    function debug(alertMsg) {
        codepoint++;
        alert(codepoint + ": " + alertMsg + " END MSG (refresh page after no more dialogs!!)");
        // copypasta call debug("");
    }*/

    $(".srInputForm").submit(function (event) {
        event.preventDefault();

        srArray = $(this).serializeArray();
        // omitArray = $(".omitForm").serializeArray();

        $.each(srArray, function (i, field) {
            srString += field.value + ",";
        });
        api = api.concat(srString, ".json?jsonp=recommendedSubredditResponse" /*, "?omit="*/ );

        /*if (omitArray[1].value === "" && omitArray[2].value === "" && omitArray[3].value === "") {
            api.replace("?omit=", "/");
        } else {
            $.each(omitArray, function (i, field) {
                api += field.value + ",";
            });
        }*/

        $.getJSON(api, function (json) {
            $.each(json, function (i, response) {
                srLink = '<div class="recommendation">' + '<a href="' + redditBaseLink + response.sr_name + '/" target="_blank">' + response.sr_name + '</a></div>';
                $(srLink).hide().appendTo(".recommendationsCol").fadeIn('slow', function () {
                    //console.log("Fade in successful.");
                });
                srLink = "";
            });
        }, function () {
            console.log(arguments);
        });

        /*$.ajax({
            dataType: 'json',
            type: 'GET',
            url: api,
            success: function (json) {
                $.each(json, function (i, response) {
                    srLink = '<div class="recommendation">' + '<a href="' + redditBaseLink + response.sr_name + '/" target="_blank">' + response.sr_name + '</a></div>';
                    $(srLink).hide().appendTo(".recommendationsCol").fadeIn('slow', function () {
                        console.log("Fade in successful.");
                    });
                    srLink = "";
                });
            },
            error: function () {
                console.log(arguments);
            }
        });*/
        api = "http://www.reddit.com/api/recommend/sr/";
    });
});