// Elementos
const notesContainer = document.querySelector("#notes-container");
const noteTitle = document.querySelector("#note-title");
const noteInput = document.querySelector("#note-content");
const addNoteBtn = document.querySelector(".add-note")

//========================== Funções ==========================

// Mostra notes ao iniciar a tela
function showNotes(){
    cleanNotes();

    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.title, note.content, note.fixed)

        notesContainer.appendChild(noteElement);
    });

}

// Limpar a notes
function cleanNotes(){
    notesContainer.replaceChildren([]);
}

// Adiciona notes 
function addNote(){

    // Pega o array de notes no localstorage
    const notes = getNotes();

    // Objeto note
    const noteObject ={
        id: generateId(),
        title: noteTitle.value,
        content: noteInput.value,
        fixed: false,
    };

    // cria o card da note e atribui a const noteElement
    const noteElement = createNote(noteObject.id, noteObject.title, noteObject.content, noteObject.fixed);

    // appenda o noteElement no container de notes
    notesContainer.appendChild(noteElement);

    // inclui o objeto criado no array notes
    notes.push(noteObject);

    // Salvando array notes no local storage
    saveNotes(notes);

    // Zerando os inputs
    noteTitle.value = "";
    noteInput.value = "";

}

// Gera ID de forma random
function generateId(){
    return Math.floor(Math.random() * 5000);
}

// Cria o card de anotação
function createNote(id, title, content, fixed){

    // Cria a div da nota
    const element = document.createElement("div");
    element.classList.add("note");
    // Cria o input do title e atribui um valor a ele
    const titleNote = document.createElement("input");
    titleNote.value = title;
    titleNote.placeholder = "Qual o título da anotação?";
    // Cria o textarea e atribui um valor a ele
    const textNote = document.createElement("textarea");
    textNote.value = content;
    textNote.placeholder = "O que deseja anotar?";
    // Appenda os elementos criados a div da nota
    element.appendChild(titleNote);
    element.appendChild(textNote);

    const pinIcon = document.createElement("i");
    pinIcon.classList.add(...["bi", "bi-pin"]);

    element.appendChild(pinIcon);

    if(fixed){
        element.classList.add("fixed")
    }

    // Eventos do elemento
    element.querySelector(".bi-pin").addEventListener("click", () =>{

        toggleFixNote(id);
    })

    return element;

}

// Função para fixar a note
function toggleFixNote(id){
    // pega o array de notes
    const notes = getNotes();
    // filtra pelo id passado
    const targetNote = notes.filter((note) => note.id === id)[0];
    // inverte o valor do atributo fixed
    targetNote.fixed = !targetNote.fixed;
    // Salva e atualiza array no localstorage
    saveNotes(notes)
    // chama a função para mostrar as notas novamente
    showNotes();
}

//========================== Local Storage ==========================

// Pega notes do localstorage ou retorna um array vazio
function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    // ordena os itens através do atributo fixed
    const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

    return orderedNotes;
}

//Salva a note no localstorage
function saveNotes(notes){
    localStorage.setItem("notes", JSON.stringify(notes))
}

//========================== Eventos ==========================
addNoteBtn.addEventListener("click", () => addNote());

// inicialização
showNotes()