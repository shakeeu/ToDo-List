// Selectors
const todoInput = document.querySelector(".todo-input");
const inputButton = document.querySelector(".submit-button");
const todoList = document.querySelector(".todo-list");
const meldung = document.querySelector(".meldung");
const meldungDiv = document.querySelector(".anzeige");
const okButoon = document.querySelector(".meldung-button");

//
const children = document.body.children;

//EventListener
inputButton.addEventListener("click",todoHinzufügen);

//Funktion
function todoHinzufügen(event){
    event.preventDefault();
    
    if(todoInput.value !== ""){
        //Todo DIV erstellen
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Todo li erstellen
        let li = document.createElement("li");
        li.innerHTML = `${todoInput.value}`;
        li.classList.add("todo-li");

        todoDiv.appendChild(li);

        // DIV für Buttons erstellen
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("todoButton-container")

        todoDiv.appendChild(buttonContainer);

        //Todo abgeschlossenButton erstellen
        let abgeschlossenButton = document.createElement("button");
        abgeschlossenButton.innerHTML = '<i class ="fas fa-check"></i>';
        abgeschlossenButton.classList.add("abgeschlossen-button");

        todoDiv.appendChild(abgeschlossenButton);

        //Todo Löschbutton
        let löschButton = document.createElement("button");
        löschButton.innerHTML = '<i class="fas fa-trash"></i>'
        löschButton.classList.add("lösch-button");

        todoDiv.appendChild(löschButton);

        // Buttons in Buttoncontainer einfügen
        buttonContainer.appendChild(abgeschlossenButton);
        buttonContainer.appendChild(löschButton);
        // Alles ins Parent-Element einfügen
        todoList.appendChild(todoDiv);
        //ToDo zu lokalem Speicher hinzufügen
        lokalSpeichern(todoInput.value);
        //
        todoInput.value = "";
    }
    else{
       meldung.innerHTML = "Bitte eine Tätigkeit angeben!";
       meldungDiv.style.display = "block";
       okButoon.addEventListener("click", function(){
           meldungDiv.style.display = "none";
       })
    }
};

// BIS HIER KANN DAS PROGRAMM TODO AUFGABEN HINZUFÜGEN


const löschButton = document.querySelector(".lösch-button");

todoList.addEventListener("click",checkDelete);

function checkDelete(event){
    let clickedItem = event.target;

    if(clickedItem.classList.contains("lösch-button")){
        let parent = clickedItem.closest(".todo");
        parent.classList.add("fall");
        lokaleDatenLöschen(parent);
        parent.addEventListener("transitionend",function(){
            parent.remove();
        });
    }
    else if(clickedItem.classList.contains("abgeschlossen-button")){
        let parent = clickedItem.closest(".todo");
        parent.classList.toggle("completed");

        
    }
}

// Filter Funktion einfügen
const todoFilter = document.querySelector("#filter-todo");

todoFilter.addEventListener("click", Filterung);

function Filterung(event){
    let filter = todoList.childNodes;

    for(let i = 1; i < filter.length;i++)
    {
            switch(event.target.value){
                case "All":
                    filter[i].style.display = "flex";
                    break;
                
                case "Abgeschlossen":
                    if(filter[i].classList.contains("completed")){
                        filter[i].style.display = "flex";
                    }
                    else{
                        filter[i].style.display = "none";
                    }
                    break;
                case "nicht-abgeschlossen":
                    if(!filter[i].classList.contains("completed")){
                        filter[i].style.display = "flex";
                    }
                    else{
                        filter[i].style.display = "none";
                    }
                    break;
            }
        }
    };

// Lokale Speicherung der ToDos

function lokalSpeichern(einzufügendesTodo){
    // Checken, ob Daten im lokalen Speicher sind
    let todosArray;
    if(localStorage.getItem("todosArray") === null)
    {
        todosArray = [];
    }
    else{
        todosArray = JSON.parse(localStorage.getItem("todosArray"));
    }
    todosArray.push(einzufügendesTodo);
    localStorage.setItem("todosArray", JSON.stringify(todosArray));
};


function lokaleDatenAnfordern(){
    let todosArray;
    if(localStorage.getItem("todosArray") === null)
    {
        todosArray = [];
    }
    else{
        todosArray = JSON.parse(localStorage.getItem("todosArray"));
    }

    todosArray.forEach(function(Aufgabe){
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Todo li erstellen
        let li = document.createElement("li");
        li.innerHTML = Aufgabe;
        li.classList.add("todo-li");

        todoDiv.appendChild(li);

        // DIV für Buttons erstellen
        let buttonContainer = document.createElement("div");
        buttonContainer.classList.add("todoButton-container")

        todoDiv.appendChild(buttonContainer);

        //Todo abgeschlossenButton erstellen
        let abgeschlossenButton = document.createElement("button");
        abgeschlossenButton.innerHTML = '<i class ="fas fa-check"></i>';
        abgeschlossenButton.classList.add("abgeschlossen-button");

        todoDiv.appendChild(abgeschlossenButton);

        //Todo Löschbutton
        let löschButton = document.createElement("button");
        löschButton.innerHTML = '<i class="fas fa-trash"></i>'
        löschButton.classList.add("lösch-button");

        todoDiv.appendChild(löschButton);

        // Buttons in Buttoncontainer einfügen
        buttonContainer.appendChild(abgeschlossenButton);
        buttonContainer.appendChild(löschButton);
        // Alles ins Parent-Element einfügen
        todoList.appendChild(todoDiv);
    });
}

// Eventlistener zum Laden Hinzufügen
document.addEventListener("DOMContentLoaded",lokaleDatenAnfordern);

// Daten aus lokalem Speicher löschen
function lokaleDatenLöschen(aufgabe){
    let todosArray;
    if(localStorage.getItem("todosArray") === null)
    {
        todosArray = [];
    }
    else{
        todosArray = JSON.parse(localStorage.getItem("todosArray"));
    }
    let gelöschteAufgabe = aufgabe.children[0].innerHTML;
    let todoIndex = todosArray.indexOf(gelöschteAufgabe);
    todosArray.splice(todoIndex,1);

    // Array in lokalen Speicher wiedereinfügen
    localStorage.setItem("todosArray", JSON.stringify(todosArray));

}