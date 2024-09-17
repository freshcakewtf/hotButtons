// credit to Maxwell Ridgeway: https://youtu.be/0wiz-h3ZU_I?si=MRmP6piEocI9-JoL for expressions used to create this effect.

{
    // Fuction to creat a Box that scales to Text
    function boxText() {
        // Create a new shape layer
        var comp = app.project.activeItem;
        var shapeLayer = comp.layers.addShape();

        // Create Text Layer
        var textLayer = comp.layers.addText("Text");

        // Add a rectangle path to the shape layer
        var shapeGroup = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
        var rectPath = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");

        // Apply a auto-scale to the size property of the rectangle path
        var size = rectPath.property("Size");
        size.expression =
        'margin = thisComp.layer("Margin Control").effect("Margin")("Slider");\n' +
        'text_width = thisComp.layer(\"Text\").sourceRectAtTime().width;\n' +
        'text_height = thisComp.layer(\"Text\").sourceRectAtTime().height;\n' +
        'box_width = text_width + margin*2;\n' +
        'box_height = text_height + margin*2;\n' +
        '[box_width, box_height]';

        //apply Position to shape layer
        var position = rectPath.property("Position");
        position.expression = 
        't = thisComp.layer(\"Text\");\n' +
        'tRect = t.sourceRectAtTime(time,false);\n' +
        'tUL = t.toComp([tRect.left,tRect.top]);\n' +
        'tLR = t.toComp([tRect.left+tRect.width,tRect.top+tRect.height]);\n' +
        'tCenter = (tUL + tLR)/2; myRect = sourceRectAtTime(time,false);\n' +
        'myUL = toComp([myRect.left,myRect.top]); myLR = toComp([myRect.left+myRect.width,myRect.top+myRect.height]);\n' +
        'myCenter = (myUL + myLR)/2; delta = myCenter - tCenter; value - delta';

        // Add a fill to the shape layer
        var fill = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
        fill.property("Color").setValue([1,0,0]); // Set the fill color to red
    }
    
    // Function for Slider control of Margin
    function sliderControl(){
        var comp = app.project.activeItem;
        if (!(comp && comp instanceof CompItem)) {
            alert("Please select a composition first.");
            return null;
        }

        // Search for a Null object named "Margin Control"
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).name === "Margin Control") {
                return comp.layer(i); // Return if already exists
            }
        }

        // Create a new Null object named "Margin Control"
        var controlNull = comp.layers.addNull();
        controlNull.name = "Margin Control";

        // Add a sliders for "Margin"
        var freqSlider = controlNull.property("Effects").addProperty("ADBE Slider Control");
        freqSlider.name = "Margin";
        freqSlider.property("Slider").setValue(50);

        return controlNull;
    }

    boxText();
    sliderControl();

}
