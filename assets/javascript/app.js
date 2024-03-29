// Initial array of gbArray
var gbArray = ["Peter Venkman", "Ray Stantz", "Egon Spengler", "Winston Zeddemore", "Dana Barrett",
    "Louis Tully", "Janine Melnitz", "Slimer", "Stay Puft Marshmallow Man", "Gozer", "Janosz Poha",
    "Vigo the Carpathian"
];

// Function for displaying gb data
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of gbArray
    for (var i = 0; i < gbArray.length; i++) {

        // Then dynamicaly generating buttons for each gb item in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var gbItem = $("<button>");
        // Adding a class
        gbItem.addClass("gbThing");
        // Adding a data-attribute with a value of the gbReference at index i
        gbItem.attr("data-gb", gbArray[i]);
        // Providing the button's text with a value of the gbReference at index i
        gbItem.text(gbArray[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(gbItem);
    }
    // Adding click event listen listener to all .gbThing buttons
    $(".gbThing").on("click", function () {
        // Grabbing and storing the data-gb property value from the button
        var gbReference = $(this).attr("data-gb");

        // Constructing a queryURL using the gbReference
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gbReference + "&api_key=6BwRm4X1gTL0g1tTN9Ua60lTi3rf9274&limit=10";

        // Performing an AJAX request with the queryURL
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating and storing a div tag
                        var gbReferenceDiv = $("<div>");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Creating and storing an image tag
                        var gbReferenceImage = $("<img>");
                        // Setting the src attribute of the image to a property pulled off the result item
                        // Set to still image first
                        gbReferenceImage.attr("src", results[i].images.fixed_height_still.url);
                        gbReferenceImage.attr("data-state", "still");
                        gbReferenceImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gbReferenceImage.attr("data-animate", results[i].images.fixed_height.url);
                        gbReferenceImage.addClass("gif");

                        // Appending the paragraph and image tag to the gbReferenceDiv
                        gbReferenceDiv.append(p);
                        gbReferenceDiv.append(gbReferenceImage);

                        // Prependng the gbReferenceDiv to the HTML page in the "#gifs-appear-here" div
                        $("#gifs-appear-here").prepend(gbReferenceDiv);
                        
                        
                    } //End rating if statement
                } //End for loop
            });
    });
}

// This function handles events where one button is clicked
$("#add-gbThing").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var gbThing = $("#gb-input").val().trim();
    // The gb reference from the textbox is then added to our array
    gbArray.push(gbThing);

    // calling renderButtons which handles the processing of our gbArray
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of gbArray
renderButtons();
//
$(document).on("click", ".gif", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });