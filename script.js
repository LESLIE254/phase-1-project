
document.addEventListener('DOMContentLoaded',()=>{
    //Event listeners
document.querySelector('#zoo-form').addEventListener('submit',handleSubmit)

//Event Handlers
function handleSubmit(e) {
    e.preventDefault()
    let animalObject = {
        name: e.target.name.value,
        image_Url: e.target.image_url.value,
        description:e.target.description.value
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




function renderAnimal(animal) {
    //build animal
    let card = document.createElement('li')
   card.style.marginLeft= '500px'
    card.className= 'card'
    card.innerHTML= `
    <img src="${animal.image_link}"style="width: 600px">
    <div class-"content">
        <h4>${animal.name}</h4>
        <p>
            KES<span class="donation-count">${animal.donations= 0}</span> Donated
        </p>
        <p>latin-name:${animal.latin_name}, animal_type:${animal.animal_type}, active_time:${animal.active_time}, length_min:${animal.length_min}, length_max:${animal.length_max}, weight_min:${animal.weight_min}, weight_max:${animal.weight_max}, lifespan:${animal.lifespan}, habitat:${animal.habitat},
        diet:${animal.diet},geo_range:${animal.geo_range}</p>
    </div>
    <div class="buttons">
        <button id="donate">Donate 1000 KES </button>
        <button id = "set_free"> SetFree </button>
    </div>    
    `

      //Add animal card to DOM
      document.querySelector('#animal-list').appendChild(card)  


    card.querySelector('#donate').addEventListener('click', () => {
        animal.donations+=1000
        card.querySelector('span').textContent = animal.donations
        updateDonations(animal)
    })

    card.querySelector('#set_free').addEventListener('click', () => {
        card.remove()
        deleteAnimal(animal.id)
    })

  
}


//Fetch Request
//Get all animal from api
function getAllAnimals() {
   fetch("https://zoo-animal-api.herokuapp.com/animals/rand/5")
    .then(resp => resp.json())
    .then(animalData => animalData.forEach(animal => renderAnimal(animal)))
}

function adoptAnimal(animalObject) {
    fetch("http://localhost:3000/animalData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(animalObject)
    })
    .then(res => res.json())
    .then(animal => console.log(animal))
}
function updateDonations(animalObject) {
    fetch(`https://zoo-animal-api.herokuapp.com/animals/rand/5${animalObject.id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObject)
    })
    .then(resp => resp.json())
    .then(animal => console.log(animal))
}

function deleteAnimal(id) {
    fetch(`https://zoo-animal-api.herokuapp.com/animals/rand/5${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json' 
        }
    })
    .then(resp => resp.json())
    .then(animal => console.log(animal))
}

getAllAnimals()

function initialize() {
    getAllAnimals()
}
//initialize()

