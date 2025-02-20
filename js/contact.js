import {saveTask} from './firebase.js'; 

window.addEventListener('DOMContentLoaded', () => {
    
})

const contactanosForm = document.getElementById('task-form')
contactanosForm.addEventListener('submit', (e) => {
    e.preventDefault()

   const title = contactanosForm['task-title'];
   const description =  contactanosForm['task-description'];
const name =contactanosForm['task-name'];
    const dni = contactanosForm['task-dni']
   const celular = contactanosForm ['task-celular']
 const email =contactanosForm['task-email']
   saveTask(title.value, description.value,name.value, dni.value, celular.value, email.value)
//saveUser(name.value, dni.value, celular.value, email.value)
//taskUser.reset()
  //limpiar datos dentro del form 

  contactanosForm.reset()


})
