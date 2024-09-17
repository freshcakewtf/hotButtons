(function hotButton(thisObj) {
    function buildUI(thisObj) {
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Hot Buttons", undefined, { resizeable: true });

        // UI Elements
        var btn1 = myPanel.add("button", undefined, "Text with Box");
        var btn2 = myPanel.add("button", undefined, "Auto Center Anchor point");
        var btn3 = myPanel.add("button", undefined, "Over Shoot");
        var btn4 = myPanel.add("button", undefined, "Wiggle Loop");
        var btn5 = myPanel.add("button", undefined, "info");

        // Functions to run scripts
        function runButton1() {
            // Provide the correct path to your script file
            var scriptFile = new File("/Applications/Adobe After Effects 2024/Scripts/boundingBoxText.jsx");

            // Check if the script file exists and execute it
            if (scriptFile.exists) {
                try {
                    $.evalFile(scriptFile);
                } catch (e) {
                    alert("Error executing script: " + e.toString()); // Catch any errors during execution
                }
            } else {
                alert("Error: boundingBoxText.jsx not found in the Scripts folder.");
            }
        }

        function runButton2() {
            // Provide the correct path to your script file
            var scriptFile = new File("/Applications/Adobe After Effects 2024/Scripts/centerAnchor.jsx");

            // Check if the script file exists and execute it
            if (scriptFile.exists) {
                try {
                    $.evalFile(scriptFile);
                } catch (e) {
                    alert("Error executing script: " + e.toString()); // Catch any errors during execution
                }
            } else {
                alert("Error: boundingBoxText.jsx not found in the Scripts folder.");
            }
        }

        function runButton3() {
            // Provide the correct path to your script file
            var scriptFile = new File("/Applications/Adobe After Effects 2024/Scripts/overShoot.jsx");

            // Check if the script file exists and execute it
            if (scriptFile.exists) {
                try {
                    $.evalFile(scriptFile);
                } catch (e) {
                    alert("Error executing script: " + e.toString()); // Catch any errors during execution
                }
            } else {
                alert("Error: boundingBoxText.jsx not found in the Scripts folder.");
            }
        }

        function runButton4() {
            // Provide the correct path to your script file
            var scriptFile = new File("/Applications/Adobe After Effects 2024/Scripts/wiggleLoop.jsx");

            // Check if the script file exists and execute it
            if (scriptFile.exists) {
                try {
                    $.evalFile(scriptFile);
                } catch (e) {
                    alert("Error executing script: " + e.toString()); // Catch any errors during execution
                }
            } else {
                alert("Error: boundingBoxText.jsx not found in the Scripts folder.");
            }
        }

        function runButton5() {
            // Replace this with the script you want to run
            alert(
                'Here is what each button will do. \n\n' +
                'Text with Box: Creates a Text layer with a box that auto scales around it. Use Margin slider to adjust padding.\n\n' + 
                'Auto center Anchor Point: Ensures the anchor point is always centered on the selected layer.\n\n' +
                'Over Shoot: Applies expression to selected keyframes, creating an overshoot bounce animation. Use Freq and Decay sliders on the generated null to adjust the effect.\n\n' +
                'Wiggle Loop: Creates a wiggle effect that can be adjusted using the frequency, amplitude, and time via the slider on the created null'
            );
        }

        // Button Click Handlers
        btn1.onClick = runButton1;
        btn2.onClick = runButton2;
        btn3.onClick = runButton3;
        btn4.onClick = runButton4;
        btn5.onClick = runButton5;

        // Layout settings
        myPanel.layout.layout(true);
        myPanel.onResizing = myPanel.onResize = function () { myPanel.layout.resize(); };

        return myPanel;
    }

    // Execute the script
    var myWindow = buildUI(thisObj);
    if (myWindow instanceof Window) {
        myWindow.center();
        myWindow.show();
    }

})(this);

//        i
//     |~~~~~| 
//  |~~~~~~~~~~~|
//  |~~~~~~~~~~~| Enjoy.
