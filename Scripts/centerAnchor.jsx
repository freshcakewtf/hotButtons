// Source: I forget where I learned this one. maybe copilot or Chat GPT?

// Get the active composition
var comp = app.project.activeItem;

// Check if the active item is a composition
if (comp && comp instanceof CompItem) {
    // Get the selected layer
    var selectedLayer = comp.selectedLayers[0];

    // Check if a layer is selected
    if (selectedLayer) {
        // Apply the expression to the anchor point of the selected layer
        selectedLayer.property("Anchor Point").expression =
        'var sourceRect = sourceRectAtTime(time);\n' +
        '[sourceRect.left + (sourceRect.width / 2), sourceRect.top + (sourceRect.height / 2)]';
    
    } else {
        alert("Please select a layer.");
    }
} else {
    alert("Please open a composition and select a layer.");
}