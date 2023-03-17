// Made by Juan "Aether" Martínez, an ITLA student by the time this was created. 
// Date of creation: 3/5/23

let button = Array.from(document.querySelectorAll(".btn"));
let screen = document.querySelector(".screen");
let equalsCounter = 0;
let buffer = 0 // This variable is for saving the last value, so it can be used to execute operations such as `M+`

function emptyScreen() { // Function that empties the text on screen
    screen.textContent = "";
}

function resetVariables() { // Function that resets all variables
    equalsCounter = 0;
    buffer = 0;
}

function percentage(partialValue, totalValue) { // Calculates the percentage
    return (partialValue / 100) * totalValue;
}

function handleMath(number1, operator, number2) {
    number1 = Number(number1); // Make number1 an int
    number2 = Number(number2); //Make number2 an int
    switch (operator) { // Execute an operation for every operator
        case "-":
            emptyScreen();
            screen.append(number1 - number2);
            break;

        case "+":
            emptyScreen();
            screen.append(number1 + number2);
            break;

        case "/":
            emptyScreen();
            screen.append(number1 / number2);
            break;

        case "*":
            emptyScreen();
            screen.append(number1 * number2);
            break;

        case "%":
            emptyScreen();
            screen.append(percentage(number1, number2));
            break;

        default:
            break;
    }
}


function handleButtonPress(button) {  // Handles button clicks

    switch (button) {
        case "MC":
            buffer = 0; // Since MC clears the memory, empty buffer.
            alert("Memory cleared!"); // Just for aethetics
            break;

        case "M+": // TO BE FIXED
            equalsCounter += 1;
            let mPlus = 0;
            for (let i = 0; i < screen.textContent.length; i++) { // Check every element on screen and if it's any sign, write "ERROR"
                if (screen.textContent[i] === "+" || screen.textContent[i] === "-" || screen.textContent[i] === "*" || screen.textContent[i] === "/") {
                    emptyScreen();
                    screen.append("ERROR");
                }
            }
            if (screen.textContent === "ERROR") { // In case the content on screen is "ERROR" then break
                break;
            }
            else {
                mPlus = (buffer + Number(screen.textContent)); // Set a variable `mPlus` to the sum of the value in buffer and the content on screen
                emptyScreen();
                screen.append(mPlus); // Set the screen to the content on mPlus
                break;
            }
            break;

        case "M-":
            emptyScreen();
            break;

        case "MR":
            emptyScreen();
            break;

        case "Del":
            if (equalsCounter === 1) {
                emptyScreen(); // In case the numbers on screen are a result from an operation, then clean the screen...
            }
            else { // ... Otherwise, just delete the last element
                
                screen.textContent = screen.textContent.slice(0, -1); // Deletes, from left to right, the last element on screen, being right the last element.
            }
            // `slice()` returns the substring parting from a starting and an ending index of a given string.
            break;

        case "C": // In case pressed button is C, clear the screen;
            emptyScreen();
            break;

        case "=":
            equalsCounter += 1;
            for (let i = 0; i < screen.textContent.length; i++) { // Check every character on screen, in case it is a sign, call the handleMath function
                if (screen.textContent[i] === "+") {
                    handleMath(screen.textContent.split("+")[0], "+", screen.textContent.split("+")[1]); // Split uses () instead of [], since it's a function and has to be called
                }
                else if (screen.textContent[i] === "-") {
                    handleMath(screen.textContent.split("-")[0], "-", screen.textContent.split("-")[1]);
                }
                else if (screen.textContent[i] === "*") {
                    handleMath(screen.textContent.split("*")[0], "*", screen.textContent.split("*")[1]);
                }
                else if (screen.textContent[i] === "/") {
                    handleMath(screen.textContent.split("/")[0], "/", screen.textContent.split("/")[1]);
                }
                else if (screen.textContent[i] === "%") {
                    handleMath(screen.textContent.split("%")[0], "%", screen.textContent.split("%")[1]);
                }
            }
            break;
        default:
            if (equalsCounter === 1) {
                buffer = Number(screen.textContent); // Save the current value on screen on the variable called `buffer`.
                screen.textContent = ""; screen.append(button); // Delete content on screen and write the new pressed button
                equalsCounter = 0; // Reset `equalsCounter`
            }
            else {
                screen.append(button);
            }
            break;
    }

    // The append is done inside the function since the append cannot be called in the event listener, this creates an error.
}
//            //buttonClick can only be called within the addEventListener, because if another function is used besides, this will result in an error
// This is wrong since addEventListener is something to be added to each element on the array individually.

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function (event) { // Add an event listener to every button, if click happens, call the `handleButtonPress` function and pass the pressed button
        handleButtonPress(event.target.textContent)
    });
}

//document.addEventListener("keydown", function (event) { // Currently not working.
//    handleButtonPress(event.target.textContent)
//})
