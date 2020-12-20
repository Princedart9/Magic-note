console.log("Hello User! Welcome to the magic note");
showNotes();

//If user adds a note,add it to a local storage

//To check local storage in console of browser use command "localStorage"

//To clear local storage use command "localStorage.clear()"

let addbtn = document.getElementById("addBtn");     //target button
addbtn.addEventListener("click", function (e) {
    //after targeting event performed

    let addtxt = document.getElementById("addTxt");    //Target textarea
    let notes = localStorage.getItem("notes");
    //if any things are present then show me otherwise "if-else" loop
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }

    notesObj.push(addTxt.value); //new notes are added

    localStorage.setItem("notes", JSON.stringify(notesObj));
    //Are stored inside note array by first convert into string
    addTxt.value = "";
    console.log(notesObj);
    showNotes();    //used to display notes in downward section
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    //if any things are present then show me otherwise "if-else" loop
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";  //Creating a blank String

    notesObj.forEach(function (element, index) {
        // += will append mean when ever you add new note placed in a new section of card
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Notes ${index + 1}</h5>
                        <p class="card-text">${element}</p>
                        <button id ="${index}" onclick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
        `;                  //"onclick" lead to call the deleteNote() function
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesObj.innerHTML = 'Nothing to Show! Please add Yours note';
    }

}

function deleteNote(index) {
    //console.log('I am deleting', index);

    //After deleting update their sequence
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));        //updating localStorage which lead to perform deletion operation
    showNotes();
}

// search the text written inside notes

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(){

    let inputVal = search.value
    //console.log("Input event fired", inputVal);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }

        //console.log(cardTxt);
    })
})
