// Source: Chat GPT I think. I do'nt full remember

// Function for null
function createControlNull() {
    var comp = app.project.activeItem;
    if (!(comp && comp instanceof CompItem)) {
        alert("Please select a composition first.");
        return null;
    }

    // Search for a Null object named "wiggle control"
    for (var i = 1; i <= comp.numLayers; i++) {
        if (comp.layer(i).name === "wiggle control") {
            return comp.layer(i); // Return if already exists
        }
    }

    // Create a new Null object named "wiggle control"
    var controlNull = comp.layers.addNull();
    controlNull.name = "wiggle control";

    // Add three sliders for "freq" "amp" and "time"
    var freqSlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
    freqSlider.name = "freq";
    freqSlider.property("Slider").setValue(2);

    var ampSlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
    ampSlider.name = "amp";
    ampSlider.property("Slider").setValue(50);

    var timeSlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
    timeSlider.name = "time";
    timeSlider.property("Slider").setValue(10);

    return controlNull;
}

// Apply custom wiggle expression to the selected property
{
    function applyWiggle() {

        // Check if a composition and a layer are selected
        if (app.project.activeItem && app.project.activeItem instanceof CompItem &&
            app.project.activeItem.selectedLayers.length > 0) {

            // Get the selected layer
            var layer = app.project.activeItem.selectedLayers[0];
            
            // Check if a property is selected
            if (layer.selectedProperties.length > 0) {
                var property = layer.selectedProperties[0];

                // Define the expression
                var expression = 
                    'freq = thisComp.layer("wiggle control").effect("freq")("Slider");\n' +
                    'amp = thisComp.layer("wiggle control").effect("amp")("Slider");\n' +
                    'loopTime = thisComp.layer("wiggle control").effect("time")("Slider");\n' +
                    't = time % loopTime;\n' +
                    'wiggle1 = wiggle(freq, amp, 1, 0.5, t);\n' +
                    'wiggle2 = wiggle(freq, amp, 1, 0.5, t - loopTime);\n' +
                    'linear(t, 0, loopTime, wiggle1, wiggle2);\n';

                // Apply the expression
                property.expression = expression;

                alert("Expression applied to " + property.name);
            } else {
                alert("Please select a property.");
            }
        } else {
            alert("Please select a layer and a property.");
        }
    };

    applyWiggle();
    createControlNull();
}