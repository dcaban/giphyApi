$(document).ready(function () {

// Initial array of animals
    var animals = ["lion", "dog", "tiger"];

// Function for displaying animal data
    function renderButtons() {

        // Deleting the animals prior to adding new animals
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

            // Then dynamicaly generating buttons for each animal in the array
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of ani to our button
            a.addClass("ani");
            // Adding a data-attribute
            a.attr("data-animal", animals[i]);
            // Providing the initial button text
            a.text(animals[i]);
            // Adding the button to the HTML
            $("#buttons-view").append(a);
        }
    }
renderButtons();
// This function handles events where one button is clicked
    $(document).on("click", "#add-ani", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var ani = $("#animal-input").val().trim();

        // Adding the animal from the textbox to our array
        animals.push(ani);

        // Calling renderButtons which handles the processing of our animal array
        // renderButtons();

// Calling the renderButtons function to display the intial buttons
        renderButtons();
    });



// Adding click event listen listener to all buttons
        $(document).on("click",".ani",function() {
            console.log("clickled");

            // Grabbing and storing the data-animal property value from the button
            var animal = $(this).attr("data-animal");
                console.log(animal);
            // Constructing a queryURL using the animal name
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=a780e565477e45fba164d71635f6f76a&limit=10";

            // Performing an AJAX request with the queryURL
            $.ajax({
                url: queryURL,
                method: "GET"
            })

            // After data comes back from the request
                .done(function (jerk) {
                    console.log(queryURL);

                    console.log(jerk);
                    // storing the data from the AJAX request in the results variable
                    var results = jerk.data;

                    // Looping through each result item
                    for (var i = 0; i < results.length; i++) {

                        // Creating and storing a div tag
                        var animalDiv = $("<div>");

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Creating and storing an image tag
                        var animalImage = $("<img>");
                        // Setting the src attribute of the image to a property pulled off the result item
                        animalImage.attr("src", results[i].images.fixed_height.url);

                        // Appending the paragraph and image tag to the animalDiv
                        animalDiv.append(p);
                        animalDiv.append(animalImage);
                        animalImage.addClass("gifs");
                        animalDiv.addClass("gif-div");

                        // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                        $("#gifs-appear-here").prepend(animalDiv);

                    }

                });

        });


    $(document).on("click",".gifs",function() {
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
    })

});





