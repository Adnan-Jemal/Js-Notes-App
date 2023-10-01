const notesEl = document.getElementById("notes")
const addbtnEl = document.getElementById('add')
const addnoteEl = document.getElementById("addnote")

const modeEl = document.querySelector(".mode")
let darkmode = JSON.parse(localStorage.getItem("darkmode")) || false
window.onload = changeModes; 
modeEl.addEventListener("click",()=>{
    
    switch(darkmode) {
        case false:
            localStorage.setItem("darkmode",JSON.stringify(true))
            darkmode = JSON.parse(localStorage.getItem("darkmode"))
            changeModes()
            break;
        case true:
            localStorage.setItem("darkmode",JSON.stringify(false))
            darkmode = JSON.parse(localStorage.getItem("darkmode"))
            changeModes()
            break;
    }
})

function changeModes(){
    if(!darkmode){
        
        modeEl.src="moon.png"
        
        showLigntMode()
        
        
        

    }else{
        modeEl.src="sun.png"
        
        
        showDarkMode()
        
        
    }
}
function showDarkMode(){
    document.documentElement.style.setProperty('--clr-background', '#191A23');
    document.documentElement.style.setProperty('--clr-lowwhite', 'rgba(0,0,0,.6)');
    document.documentElement.style.setProperty('--clr-white', '#000000');
    document.documentElement.style.setProperty('--clr-black', 'white');
    
}
function showLigntMode(){
    document.documentElement.style.setProperty('--clr-background', '#f0f8ff');
    document.documentElement.style.setProperty('--clr-lowwhite', '#ffffffcc');
    document.documentElement.style.setProperty('--clr-white', '#ffffff');
    document.documentElement.style.setProperty('--clr-black', 'black');
    
}



getNotes().forEach((note)=>{
    const savedNote = creatNoteEl(note.id, note.content)
    notesEl.appendChild(savedNote)
})

addEmptyTxt()

function addEmptyTxt() {
    if (notesEl.childElementCount === 0) {
      const emptyNotetxt = document.createElement("h1");
      emptyNotetxt.innerText = "Click on the Add button (+) to add notes.";
      emptyNotetxt.classList.add('emptytxt');
      notesEl.appendChild(emptyNotetxt);
      console.log("no elements");
    } else {
      const emptyNotetxt = document.querySelector('.emptytxt');
      if (emptyNotetxt) {
        notesEl.removeChild(emptyNotetxt);
      }
    }
  }
  



function creatNoteEl(id,content){
    let note = document.createElement("div")
    note.classList.add("note")

    let moreSpanEl= document.createElement("span")
    moreSpanEl.classList.add("more")

    let moreh2El= document.createElement("h2")
    moreh2El.id='more'
    moreh2El.innerText="..."

    moreSpanEl.appendChild(moreh2El)
    note.appendChild(moreSpanEl)

    // <span class="more"><h2  id="more" >...</h2></span>


    let btnsdiv = document.createElement("div")
    btnsdiv.classList.add("butns")
    btnsdiv.classList.add('close')
    btnsdiv.id='btns'

  

    let deletbtnel= document.createElement("button")
    deletbtnel.classList.add("btn")
    deletbtnel.id='delet'
    deletbtnel.innerText='Delet'

    
    btnsdiv.appendChild(deletbtnel)
    note.appendChild(btnsdiv)

    // <div class="butns close" id="btns">
    //     <button class="btn" id="edit">Edit</button>
    //     <button class="btn" id="delet">Delet</button>
    // </div>


    let newtxtarea = document.createElement("textarea")
    newtxtarea.value= content
    newtxtarea.placeholder='add your note here'

    note.appendChild(newtxtarea)

    moreSpanEl.addEventListener("click",()=>{

        btnsdiv.classList.toggle("close")

      
    })

   deletbtnel.addEventListener("click",()=>{
        const warning = confirm("Delet this note?")
        if(warning){
            deletNote(id,note)
        }
   })

    newtxtarea.addEventListener("input",()=>{
        updateNote(id,newtxtarea.value)
    })

    return note
}


function deletNote(id,newEl){
    const notes = getNotes().filter((notes)=>notes.id!==id)
    saveNote(notes)
    notesEl.removeChild(newEl)
    addEmptyTxt()

}

function updateNote(id,content){
    const allnotes = getNotes()
    const target = allnotes.filter((allnotes)=>allnotes.id == id)[0];
    target.content=content
    saveNote(allnotes)
}

function creatNote(){
    const nots = getNotes()
    const noteObj = {
        id: Math.round(Math.random()*1000000),
        content: ""
    };
    const noteEl = creatNoteEl(noteObj.id, noteObj.content)
    notesEl.appendChild(noteEl)
    nots.push(noteObj);
    saveNote(nots);
    addEmptyTxt()
}

function saveNote(notes){
    localStorage.setItem("My-Notes", JSON.stringify(notes))
}

function getNotes(){
    return JSON.parse(localStorage.getItem("My-Notes") || "[]");
}

addbtnEl.addEventListener("click",creatNote)