const addBtn = document.querySelector('#addBtn');
const main = document.querySelector('#main');
addBtn.addEventListener('click', () =>{
  addNote();

});

function changeTextareaColor(textarea, color) {
    textarea.style.color = color;
    textarea.style.backgroundColor = 'white' ;
}
function changeTextareaColor2(textarea, color) {
    textarea.style.color = color;
    textarea.style.backgroundColor = 'black';

}


const saveNotes =  () => {
    const notes= document.querySelectorAll('.note textarea');
    
    const data = [];
    notes.forEach(
        (note ) =>{
            data.push(note.value);
        }
    )
   
 
    if(data.length == 0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
    
}


const  addNote = ( text ="") =>{
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <div class="dropdown">
         <i class="fa-solid fa-paintbrush"></i> 
        <div class="dropdown-content">
            <a href="#" id="blue"> Blue</a>
            <a href="#" id="green"> Green</a>
            <a href="#" id="red"> Red</a>
            <a href="#" id="yellow"> Yellow</a>
            <a href="#" id="black"> Black</a>
            <a href="#" id="white"> White</a>
            <a href="#" id="orange"> Orange</a>
        </div>
    </div>
         <i class="trash fas fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener('click',() => {
        note.remove();
        saveNotes();
    })
    note.querySelector(".save").addEventListener('click',() => {
       saveNotes();
    })
    note.querySelector('textarea').addEventListener('focusout', () =>{
        saveNotes();
    })
    note.querySelector('textarea').addEventListener('click', () =>{
        saveNotes();
    })
    note.querySelector('.dropdown-content').addEventListener('click', (event) => {
        
        if (event.target.tagName === 'A') {
            const color = event.target.id;
            console.log(color);
            if ((color === 'white') || (color === 'yellow')) {
                changeTextareaColor2(note.querySelector('textarea'), color);
            } else {
                changeTextareaColor(note.querySelector('textarea'), color);
            } 
        }
        saveNotes();
    });
    
    main.appendChild(note);
}

(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null){
            addNote()
        }else{
            lsnotes.forEach(
                (lsnotes) =>{
                    addNote(lsnotes);
                }
               )
        }
    
    }
)()