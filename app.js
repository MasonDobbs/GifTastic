var gifArr = ["spongebob", "office", "seinfield"];

$(document).ready(function () {
    for (var i = 0; i < gifArr.length; i++) {
        $("#gifButton").append("<button type='button' onclick='searchedGif(\"" + gifArr[i] + "\")' class='btn btn-primary' value=' " + gifArr[i] + "'> " + gifArr[i] + " </button>");
    }
});


$("#submit").on("click", function () {

    event.preventDefault();

    var input = $("#gifInput").val();

    gifFinder(input)

    if (input) {
        $("#gifButton").append("<button type='button' onclick='gifFinder(\"" + input + "\")' class='btn btn-primary' value=' " + input + "'> " + input + " </button>");
    }

    console.log(input);

});

function searchedGif() {
    var input = $("gifInput").val();
    gifFinder(input);
}

function gifFinder() {

    var input = $("#gifsInput").val();

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8MRaxiXl3YXFMedwXuRe20Fj2Wa7hApp&q=" + input + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET"

    })

        .then(function (response) {

            console.log(response);

            gifDisplay(response);

        });
}


function gifDisplay() {

    var input = $("#gifsInput").val();

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8MRaxiXl3YXFMedwXuRe20Fj2Wa7hApp&q=" + input + "&limit=1&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function (response) {


            $("#gifs").empty();
            for (var i = 0; i < response.data.length; i++) {
                var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
                var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
                    '" data-still=" ' + response.data[i].images.fixed_height_still.url +
                    ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

                image = '<div class="col-md-4">' + image + "</div>";
                $('#gifs').prepend(image);
            }
        })
}

function imageChangeState() {

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if (state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }
}


