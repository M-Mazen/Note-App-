// new Date() GET cuurnt Time 
let notes = [
	{
		id: new Date(),
		title: 'Sample Note',
		body: 'This is a description for our sample note',
		bgColor: 'pink'
	},
    {
		id: new Date(),
		title: '2 Note',
		body: 'This is a description for our sample note',
		bgColor: 'pink'
	}
]
// classes = []
// Funxtion to create el 
const createElement = (tag, classes = []) => {
	const element = document.createElement(tag);
	classes.forEach(cl => {
		element.classList.add(cl);
	})
	return element;
}
// display note

const createNoteView = (note) => {
	const noteDiv = createElement('div', ['note']);
	noteDiv.id = note.id;
	const textDiv = createElement('div', ['text']);
	textDiv.style.background = note.bgColor;
	const titleP = createElement('b', ['title']);
    // titleP.setAttribute("contenteditable",true);
	titleP.innerHTML = note.title;
	const bodyP = createElement('p', ['body']);
	bodyP.innerHTML = note.body;
	const editButton = createElement('button', ['edit']);
	editButton.innerHTML = 'Edit Note';
	const deleteButton = createElement('button', ['delete']);
	deleteButton.innerHTML = 'Delete Note';

	textDiv.append(titleP)
	textDiv.append(bodyP)
	noteDiv.append(textDiv)
	noteDiv.append(editButton)
	noteDiv.append(deleteButton)
	editButton.onclick = () => editNote(noteDiv);
	deleteButton.onclick = () => deleteNote(noteDiv);
	return noteDiv;
}
const saveNote = () => {
    const titleInput = document.querySelector('input#title');
	const bodyInput = document.querySelector('input#body');
	const bgColorInput = document.querySelector('select');
	const id = new Date().getTime();

	const note = {
        id, title: titleInput.value, body: bodyInput.value, bgColor: bgColorInput.value
    }
    if(note.title !=="" && note.body !=="" && note.bgColor !=="Select Color"){

            const noteDiv = createNoteView(note);
            notesDiv.prepend(noteDiv);
            titleInput.value = '';
            bodyInput.value = '';
            bgColorInput.value = '';
        }

        


}
document.querySelector(".add").onclick=()=> saveNote();
const deleteNote=(noteDiv)=>{
    noteDiv.remove();
	notes = notes.filter(note => note.id != noteDiv.id);
}

const editNote = (noteDiv, editSave = false) => {
	const titleP = noteDiv.querySelector('b.title');
	titleP.contentEditable = true;
	titleP.focus();
	const bodyP = noteDiv.querySelector('p.body');
	bodyP.contentEditable = true;

	const editButton = noteDiv.querySelector('button.edit');
	editButton.innerHTML = 'Save Note';
	const deleteButton = noteDiv.querySelector('button.delete');
	deleteButton.innerHTML = 'Cancel Edit';
	deleteButton.onclick = () => cancelEdit(noteDiv);
	editButton.onclick = () => editNote(noteDiv, true);

	if (editSave) {
		const note = notes.find(note => note.id == noteDiv.id);
		note.title = titleP.innerText.trim();
		note.body = bodyP.innerText.trim();
		deleteButton.innerHTML = 'Delete Note';
		editButton.innerHTML = 'Edit Note';
		titleP.contentEditable = false;
		bodyP.contentEditable = false;
		editButton.onclick = () => editNote(noteDiv);
		deleteButton.onclick = () => deleteNote(noteDiv);
	}
}
const cancelEdit = (noteDiv)=>{
	const titleP = noteDiv.querySelector('b.title');
	titleP.contentEditable = false;
	const bodyP = noteDiv.querySelector('p.body');
	bodyP.contentEditable = false;
    const deleteButton = noteDiv.querySelector('button.delete');
    const editButton = noteDiv.querySelector('button.edit');


    deleteButton.innerHTML = 'Delete Note';
    editButton.innerHTML = 'Edit Note';
    const note=notes.find(note=>note.id === noteDiv.id)
    editButton.onclick = () => editNote(noteDiv);
    deleteButton.onclick = () => deleteNote(noteDiv);
}

 const notesDiv=document.querySelector(".notesDiv");
 notes.forEach(note =>{
  const noteDiv =   createNoteView(note);
    notesDiv.append(noteDiv)
 })