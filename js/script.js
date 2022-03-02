let searchText;
const searchPhones = () => {
    const searchFeild = document.getElementById('search-input');
    searchText = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchPhones(data.data))

    document.getElementById('search-input').value = '';
    //display spinner
    toggleSpinner('block');
    show = document.getElementById('showAllPhones');
    show.style.display = 'none';

}
//function for spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//function for collection of cards
const cards = (phone, phoneContainer) => {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = ` <div class="card h-100  align-items-center bg-body rounded shadow-lg ">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <div class="card-body ">
            <h5 class="card-title"> <span class="fs-6 fw-bold">Phone Name : </span><span class="text-color  fw-bold">${phone.phone_name}</span></h5>
            <p class="card-text"><span class="fs-6 fw-bold">Brand Name : </span><span class="text-color fw-bold">${phone.brand}</span></p>
            <div class="card-footer">
            <a href="#details"><button onclick="loadDetails('${phone.slug}')" class="button">Phone Details</button></a>
      </div>
            
        </div>
    </div>`
    phoneContainer.appendChild(div);


}
//display phone collection first 20
const displaySearchPhones = phones => {
    const phoneContainer = document.getElementById('displayPhones');
    const errorCOntainer = document.getElementById('phoneNotFound');
    phoneContainer.textContent = '';
    errorCOntainer.textContent = '';
    let count = 0;


    if (phones.length <= 0) {

        const div = document.createElement('div');
        div.classList.add('d-flex', "justify-content-center", "align-items-center")
        div.innerHTML = `<img class="me-2" src="./images/cross.png" alt="" width="30px">
        <h3 class="fs-5">Phone is currently unavailable</h3>
        `
        errorCOntainer.appendChild(div);

    }
    else {

        phones.slice(0, 20).forEach(phone => {
            count++;
            cards(phone, phoneContainer);

        });
        const show = document.getElementById('showAllPhones');
        show.style.display = 'block';

    }
    //remove spinner 
    toggleSpinner('none');


}

//fetch phone collection more than 20
const showAllCollection = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayRemainingCollections(data.data))
    //display spinner 
    toggleSpinner('block');

}
//display phone collection more than 20
const displayRemainingCollections = (phones) => {

    const phoneContainer = document.getElementById('displayPhones');
    let count = 0;
    console.log(phoneContainer, phones)
    phones.slice(20).forEach(phone => {
        count++;
        cards(phone, phoneContainer);

    });
    show = document.getElementById('showAllPhones');
    show.style.display = 'none';
    //remove spinner 
    toggleSpinner('none');
}

//fetch Details of individual phone
const loadDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => diaplayLoadDetails(data.data))
    // display spinner 
    toggleSpinner('block');
}


//display individual phone details
const diaplayLoadDetails = (singlePhone) => {
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');

    div.classList.add('card', 'fs-5', 'lh-1');
    div.innerHTML = `
    <button onclick="closeCard()" type="button" class="btn-close" aria-label="Close"></button>
    <img src="${singlePhone.image}" class="card-img-top w-25 rounded mx-auto d-block " alt="...">
    <div class="card-body">
    
      <p class="card-text"><span class="text-color fw-bold">Name: </span>${singlePhone.name}</p>
      <p class="card-text"><span class="text-color fw-bold">Brand: </span>${singlePhone.brand}</p>
      <p class="card-text border-bottom border-secondary"><span class="text-color fw-bold b">Release Date: </span>${singlePhone.releaseDate ? singlePhone.releaseDate : 'Release date not found'}</p>
      
      <p class="text-color fw-bold">Main Features:</p> 
      <p class="card-text ms-2">Storage  <small class="text-color fw-bold">--></small>  </span>${singlePhone.mainFeatures.storage}</p>
      <p class="card-text ms-2"><span>Display Size  <small class="text-color fw-bold">--></small>  </span>${singlePhone.mainFeatures.displaySize}</p>
      <p class="card-text ms-2"><span>Chip Set <small class="text-color fw-bold">--></small>  </span>${singlePhone.mainFeatures.chipSet}</p>
      <p class="card-text ms-2 border-bottom border-secondary"><span>Memory  <small class="text-color fw-bold">--></small>  </span>${singlePhone.mainFeatures.memory}</p>

      <p class="text-color fw-bold border-bottom border-secondary">Sensor:</p> 
      <p class="card-text ms-2">${singlePhone.mainFeatures.sensors.join(' ') ? singlePhone.mainFeatures.sensors : 'not found'}</p>

      <p class="text-color fw-bold border-bottom border-secondary">Others: </p> 
      <p class="card-text ms-2"><span>Bluetooth  <small class="text-color fw-bold">--></small>  </span>${singlePhone?.others?.Bluetooth ?? "No result Found"}</p>
      <p class="card-text ms-2"><span>GPS  <small class="text-color fw-bold">--></small>  </span>${singlePhone?.others?.GPS ?? "No result Found"}</p>
      <p class="card-text ms-2"><span>NFC  <small class="text-color fw-bold">--></small>  </span>${singlePhone?.others?.NFC ?? "No result Found"}</p>
      <p class="card-text ms-2"><span>Radio  <small class="text-color fw-bold">--></small>  </span>${singlePhone?.others?.Radio ?? "No result Found"}</p>
      <p class="card-text ms-2"><span>USB <small class="text-color fw-bold">--></small> </span>${singlePhone?.others?.USB ?? "No result Found"}</p>
      <p class="card-text ms-2"><span>WLAN <small class="text-color fw-bold">--> </small> </span>${singlePhone?.others?.WLAN ?? "No result Found"}</p>


    </div>
    `
    detailsContainer.appendChild(div)
    //remove spinner 
    toggleSpinner('none');

}

//for close button in card
const closeCard = () => {

    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';

}

