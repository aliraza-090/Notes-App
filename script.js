const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.Btn');
let notes = document.querySelectorAll(".input-box");

// Function to update localStorage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Function to attach keyup event handler to a note
function attachKeyupHandler(note) {
    note.onkeyup = function () {
        updateStorage();
    };
}

// Function to load and display notes from localStorage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || "";
    notes = notesContainer.querySelectorAll(".input-box");
    notes.forEach(attachKeyupHandler); // Attach keyup events to loaded notes
}

// Event listener for creating a new note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "delete.png";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachKeyupHandler(inputBox); // Attach keyup event to the new note
    updateStorage();
});

// Event listener for handling clicks inside the notes container
notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "IMG") {
        e.target.parentElement.remove(); // Remove the note
        updateStorage();
    }
});

// Prevent default behavior when pressing Enter inside a note
document.addEventListener("keydown", event => {
    if (event.key == "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Load and display notes on page load
showNotes();
