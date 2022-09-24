// When page loads, query TV Maze API

$(document).ready(function () {
    var requestConfig = {
        method: "GET",
        url: "http://api.tvmaze.com/shows",
    };

    // Elements to show after clicking on the show.
    $(document).on("click", ".show_id", function (event) {
        event.preventDefault();

        // hide the list of shows
        $("#showList").hide();

        // Clear the particular show to allow to select a different one
        $("#show").empty();

        $("#error-div").hide();


        // get the url of the show which is clicked
        const url = $(this).context.href;

        var requestConfig = {
            method: "GET",
            url: url,
        };

        $.ajax(requestConfig).then(function (response) {
            // Add all the attributes mentioned to the #show div.

            // Name
            let h1 = `<h1>${response.name}</h1>`;
            $("#show").append(h1);

            // image
            let image;
            // if no image is there, use the generic image from public directory
            if (!response.image) {
                image = `<img src="public/img/no_image.jpeg" alt="${response.name}"/>`;
            } else {
                image = `<img src="${response.image.medium}" alt="${response.name}"/>`;
            }
            $("#show").append(image);

            // Add definition lists with details: language, genres, rating, network name and summary

            let dl = '<dl id="definition_list"> </dl>';
            $("#show").append(dl);

            // if language missing show N/A
            let Language = "<dt>Language</dt>";
            $("#definition_list").append(Language);

            if (response.language) {
                $("#definition_list").append(`<dd>${response.language}</dd>`);
            } else {
                $("#definition_list").append("<dd>N/A</dd>");
            }

            // if genre missing, show N/A
            genre = "<dt>Genres</dt>";
            $("#definition_list").append(genre);

            let genre_list;
            if ((response.genres.length = 0)) {
                $("#definition_list").append("<dd>N/A</dd>");
            } else {
                $("#definition_list").append('<dd><ul id="genree"></ul></dd>');
                // append all genre as unoredered list items.
                for (let i of response.genres) {
                    genre_list = `<li>${i}</li>`;
                    $("#genree").append(genre_list);
                }
            }

            // if rating is missing, show N/A
            $("#definition_list").append("<dt>Average Rating</dt>");

            if (response.rating.average) {
                $("#definition_list").append(
                    `<dd>${response.rating.average}</dd>`
                );
            } else {
                $("#definition_list").append(`<dd>N/A</dd>`);
            }

            // if network is missing, show N/A
            $("#definition_list").append("<dt>Network</dt>");

            if (response.network) {
                $("#definition_list").append(
                    `<dd>${response.network.name}</dd>`
                );
            } else {
                $("#definition_list").append(`<dd>N/A</dd>`);
            }

            // if summary is missing, show N/A
            $("#definition_list").append("<dt>Summary</dt>");

            if (response.summary) {
                // response.summary=response.summary.replace(/(&nbsp;|<([^>]+)>)/ig,"");
                $("#definition_list").append(`<dd>${response.summary}</dd>`);
            } else {
                $("#definition_list").append("<dd>N/A</dd>");
            }

            // Display the selected show and the link to go back
            $("#show").show();
            $("#homeLink").show();
        });
    });

    $.ajax(requestConfig).then(function (response) {
        let list_entry;
        // populate the list of shows using for loop
        for (let array of response) {
            list_entry = `<li> <a class="show_id" href="${array._links.self.href}"> ${array.name} </a></li>`;
            $("#showList").append(list_entry);
        }

        $("#search_term").val("");
        // Show the unordered list #showList as it is hidden by default.
        $("#showList").show();
    });
});

$("#searchForm").submit(function (event) {
    event.preventDefault();

    // hide the list of shows.
    $("#showList").hide();

    // Hide any particular show which might be selected.
    $("#show").hide();

    // Display link to go back after submitting search.
    $("#homeLink").show();

    $("#error-div").hide();


    // Empty the list as we are searching for new list using search term
    $("#showList").empty();

    // store the value of search term
    let searchTerm = $("#search_term").val();

    $("error_div").empty();
    // remove blanks and check for search term
    if (!searchTerm.trim()) {
        $("#error-div").show();
        // let error_div = "<div>Provide a value to search</div>";
        // $("#searchForm").append(error_div);
        $("#search_term").val("");
    } else {
        let requestConfig = {
            method: "GET",
            url: "http://api.tvmaze.com/search/shows?q=" + searchTerm,
        };

        // Once AJAX request returns the data, create list items of links for each show that is returned
        $.ajax(requestConfig).then(function (out) {
            let list_entry;
            for (let array of out) {
                list_entry = `<li> <a class="show_id" href="${array.show._links.self.href}"> ${array.show.name} </a></li>`;
                $("#showList").append(list_entry);
            }

            $("#showList").show();
            $("#search_term").val("");
        });
    }
});
