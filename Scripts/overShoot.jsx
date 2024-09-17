// source for overshoot expression https://motionscript.com/articles/bounce-and-overshoot.html
{
    // Function to add controll null
    function createControlNull() {
        var comp = app.project.activeItem;
        if (!(comp && comp instanceof CompItem)) {
            alert("Please select a composition first.");
            return null;
        }

        // Search for a Null object named "Over Shoot Control"
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).name === "Over Shoot Control") {
                return comp.layer(i); // Return if already exists
            }
        }

        // Create a new Null object named "Over Shoot Control"
        var controlNull = comp.layers.addNull();
        controlNull.name = "Over Shoot Control";

        // Add two sliders for "Freq" and "Decay"
        var freqSlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
        freqSlider.name = "Freq";
        freqSlider.property("Slider").setValue(3);

        var decaySlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
        decaySlider.name = "Decay";
        decaySlider.property("Slider").setValue(5);

        return controlNull;
    }

    // Function to apply expression to all selected keyframes on the active layer
    function applyExpressionToSelectedKeyframes() {
        var comp = app.project.activeItem;
        
        if (comp == null || !(comp instanceof CompItem)) {
            alert("Please select a composition.");
            return;
        }

        var selectedLayers = comp.selectedLayers;

        if (selectedLayers.length == 0) {
            alert("Please select a layer with keyframes.");
            return;
        }

        app.beginUndoGroup("Apply Expression to Keyframes");

        var expression = 
        'freq = thisComp.layer("Over Shoot Control").effect("Freq")("Slider");\n' +
        'decay = thisComp.layer("Over Shoot Control").effect("Decay")("Slider");\n' +
        "\n" +
        "n = 0;\n" +
        "if (numKeys > 0){\n" +
        "  n = nearestKey(time).index;\n" +
        "  if (key(n).time > time) n--;\n" +
        "}\n" +
        "if (n > 0){\n" +
        "  t = time - key(n).time;\n" +
        "  amp = velocityAtTime(key(n).time - .001);\n" +
        "  w = freq*Math.PI*2;\n" +
        "  value + amp*(Math.sin(t*w)/Math.exp(decay*t)/w);\n" +
        "}else\n" +
        "  value;";

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];

            for (var j = 1; j <= layer.selectedProperties.length; j++) {
                var prop = layer.selectedProperties[j - 1];
                
                if (prop instanceof Property && prop.isTimeVarying) {
                    prop.expression = expression;
                }
            }
        }

        app.endUndoGroup();
    }

    applyExpressionToSelectedKeyframes();
    createControlNull();
}