
document.addEventListener('DOMContentLoaded',()=>{
    //Event listeners
document.querySelector('#zoo-form').addEventListener('submit',handleSubmit)

//Event Handlers
function handleSubmit(e) {
    e.preventDefault()
    let animalObject = {
        name: e.target.name.value,
        image_link: e.target.image_link.value,
        latin_name: e.target.latin_name.value,
        animal_type: e.target.animal_type.value,
        active_time: e.target.active_time.value,
        length_min: e.target.length_min.value,
        length_max: e.target.length_max.value,
        weight_min: e.target.weight_min.value,
        weight_max: e.target.weight_max.value,
        lifespan: e.target.lifespan.value,
        habitat: e.target.habitat.value,
        diet:e.target.diet.value,
        geo_range: e.target.geo_range.value,
        donations: 0
    }
    renderAnimal(animalObject)
    adoptAnimal(animalObject)
 /*fetch('http://localhost:3000/animalData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
 })
 .then(resp => resp.json())
 .then(animal => console.log(animal))  */
}

})




function renderAnimal(animalData) {
    //build animal
    let card = document.createElement('li')
   card.style.marginLeft= '500px'
    card.className= 'card'
    card.innerHTML= `
    <img src="${animalData.image_link}"style="width: 600px">
    <div class-"content">
        <h4>${animalData.name}</h4>
        <p>
            KES<span class="donation-count">${animalData.donations}</span> Donated
        </p>
        <p>latin-name:${animalData.latin_name}, animal_type:${animalData.animal_type}, active_time:${animalData.active_time}, length_min:${animalData.length_min}, length_max:${animalData.length_max}, weight_min:${animalData.weight_min}, weight_max:${animalData.weight_max}, lifespan:${animalData.lifespan}, habitat:${animalData.habitat},
        diet:${animalData.diet},geo_range:${animalData.geo_range}</p>
    </div>
    <div class="buttons">
        <button id="donate">Donate 1000 KES </button>
        <button id = "set_free"> SetFree </button>
    </div>    
    `

      //Add animal card to DOM
      document.querySelector('#animal-list').appendChild(card)  


    card.querySelector('#donate').addEventListener('click', (e) => {
        e.preventDefault()
        animalData.donations+=1000
        card.querySelector('span').textContent = animalData.donations
        updateDonations(animalData)
    })

    card.querySelector('#set_free').addEventListener('click', () => {
        card.remove()
        deleteAnimal(animalData.id)
    })

  
}


//Fetch Request
//Get all animal from api
// function getAllAnimals() {
//    fetch("https://zoo-animal-api.herokuapp.com/animals/rand/5")
//     .then(resp => resp.json())
//     .then(animalData => animalData.forEach(animal => renderAnimal(animal)))
// }
function getAllAnimals() {
    fetch("http://localhost:3000/animalData")
    .then(resp => resp.json())
    .then(animal => animal.forEach(animalData => renderAnimal(animalData)))
}
function adoptAnimal(animalObject) {
    fetch("http://localhost:3000/animalData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        },
        body:JSON.stringify(animalObject)
    })
    .then(res => res.json())
    .then(animalData => console.log(animalData))
}
function updateDonations(animalObject) {
    fetch(`http://localhost:3000/animalData/${animalObject.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObject)
    })
    .then(resp => resp.json())
    .then(animalData => console.log(animalData))
}

function deleteAnimal(id) {
    fetch(`http://localhost:3000/animalData/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    .then(resp => resp.json())
    .then(animalData => console.log(animalData))
}

getAllAnimals()

function initialize() {
    getAllAnimals()
}
//initialize()

