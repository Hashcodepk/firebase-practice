const cafelist = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let area = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    area.textContent = doc.data().area;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(area);
    li.appendChild(cross);

    cafelist.appendChild(li);

    //deleting data 
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })
}


//getting Data
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc)
//     });
// })


//saving Data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        area: form.area.value
    });
    form.name.value = '';
    form.area.value = '';
})



//getting realtime data
db.collection('cafes').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if(change.type == 'removed'){
            let li = cafelist.querySelector('[data-id='+change.doc.id+']');
            cafelist.removeChild(li);
        }
    });
})
