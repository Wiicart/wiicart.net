document.getElementById("bold-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    nameInput.value = currentValue + "&l";
    update();
};

document.getElementById("italic-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    nameInput.value = currentValue + "&o";
    update();
};

document.getElementById("underline-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    nameInput.value = currentValue + "&n";
    update();
};

document.getElementById("strike-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    nameInput.value = currentValue + "&m";
    update();
};

document.getElementById("reset-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    nameInput.value = currentValue + "&r";
    update();
};

document.getElementById("color-button").onclick = function() {
    let nameInput = document.getElementById("nameInput");
    let currentValue = nameInput.value;
    let color = "&#" + document.getElementById("colorPicker").value.substr(1);
    nameInput.value = currentValue + color;
    update();
};

function update() {
    color();
    updateCommand();
}

function updateCommand() {
    document.querySelector("#commandText").value = "/nick " + document.getElementById("nameInput").value;
}

function color() {
    const nameInput = document.getElementById("nameInput").value;
    const outputDiv = document.getElementById("formattedOutput");

    console.log("Processing input:", nameInput); // Debug
    outputDiv.innerHTML = ""; // Clear output

    let currentText = "";
    let currentStyles = {
        color: "#ffffff", // Default white
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false
    };

    let i = 0;
    while (i < nameInput.length) {
        if (nameInput[i] === "&" && i + 1 < nameInput.length) {
            const code = nameInput[i + 1].toLowerCase();
            console.log(`Found & code: &${code} at index ${i}`); // Debug
            // Output current text before applying new style
            if (currentText) {
                const span = createStyledSpan(currentText, currentStyles);
                outputDiv.appendChild(span);
                console.log(`Added span: "${currentText}" with color ${currentStyles.color}`); // Debug
                currentText = "";
            }
            i += 2;

            if (code === "l") currentStyles.bold = true;
            else if (code === "o") currentStyles.italic = true;
            else if (code === "n") currentStyles.underline = true;
            else if (code === "m") currentStyles.strikethrough = true;
            else if (code === "r") {
                currentStyles = {
                    color: "#ffffff",
                    bold: false,
                    italic: false,
                    underline: false,
                    strikethrough: false
                };
                console.log("Reset styles:", currentStyles); // Debug
            } else if (code === "#" && i + 6 < nameInput.length && /^[0-9A-Fa-f]{6}$/.test(nameInput.substr(i, 6))) {
                // Handle hex color (e.g., &#ff0000)
                currentStyles.color = "#" + nameInput.substr(i, 6);
                console.log(`Applied hex color: ${currentStyles.color} at index ${i - 2}`); // Debug
                i += 6; // Skip xxxxxx
            } else {
                currentText += "&" + code; // Treat invalid code as text
            }
        } else {
            currentText += nameInput[i];
            i++;
        }
    }

    // Output any remaining text
    if (currentText) {
        const span = createStyledSpan(currentText, currentStyles);
        outputDiv.appendChild(span);
        console.log(`Added span: "${currentText}" with color ${currentStyles.color}`); // Debug
    }
}

// Helper function to create a styled span
function createStyledSpan(text, styles) {
    const span = document.createElement("span");
    span.textContent = text;

    // Styles for constant size
    span.style.fontFamily = "Minecraftia, serif";
    span.style.fontSize = "300%";
    span.style.lineHeight = "5vh"; // Match div height
    span.style.display = "inline-flex"; // Prevent height distortion
    span.style.alignItems = "center"; // Center vertically

    // Apply color
    span.style.color = styles.color;

    // Apply styles using CSS classes
    if (styles.bold) span.classList.add("bold");
    if (styles.italic) span.classList.add("italic");
    if (styles.underline) span.classList.add("underline");
    if (styles.strikethrough) span.classList.add("strikethrough");

    return span;
}