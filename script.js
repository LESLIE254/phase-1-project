//const apiUrl = "https://zoo-animal-api.herokuapp.com/animals/rand/5"
/*async function zooData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    //console.log(data)
    
   for(let datas of data){
    document.getElementById('animal-list').innerHTML = data
        return datas
    }

}
zooData()*/
function renderAnimal(animal) {
    let card = document.createElement('li')
   card.style.marginLeft= '500px'
    card.className= 'card'
    card.innerHTML= `
    <img src="${animal.image_link}"style="width: 600px">
    <div class-"content">
        <h4>${animal.name}</h4>
        <p>
            $<span class="donation-count">${animal.donations}</span> Donated
        </p>
        <p>latin-name:${animal.animal_type}, animal_type:${animal.animal_type}, active_time:${animal.active_time}, length_min:${animal.length_min}, length_max:${animal.length_max}, weight_min:${animal.weight_min}, weight_max:${animal.weight_max}, lifespan:${animal.lifespan}, habitat:${animal.habitat},
        diet:${animal.diet},geo_range:${animal.geo_range}</p>
    </div>
    <div class="buttons">
        <button>Donate 1000 KES </button>
        <button> Set Free </button>
    </div>    
    `
   //let img = document.querySelector('img')
   //card.classList.add('cards')
    //Add cards to DOM
    document.querySelector('#animal-list').appendChild(card)
}
function getAllAnimals() {
    fetch("https://zoo-animal-api.herokuapp.com/animals/rand/5")
    .then(resp => resp.json())
    .then(animalData => animalData.forEach(animal => renderAnimal(animal)))
}
//getAllAnimals()

function initialize() {
    getAllAnimals()
}
initialize()
