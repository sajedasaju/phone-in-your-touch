const searchPhones = () => {
    const searchFeild = document.getElementById('search-input');
    const searchText = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchPhones(data.data))

    document.getElementById('search-input').value = '';

}
const cards = (phone, phoneContainer) => {
    // console.log(phone)
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = ` <div class="card h-100  align-items-center bg-body rounded shadow-lg ">
        <img src="${phone.image}" class="card-img-top w-50" alt="...">
        <div class="card-body ">
            <h5 class="card-title"> <span >Phone Name : </span><span class="text-color  fw-bold">${phone.phone_name}</span></h5>
            <p class="card-text"><span >Brand Name : </span><span class="text-color fw-bold">${phone.brand}</span></p>
            <div class="card-footer">
            <button onclick="loadDetails('${phone.slug}')" class="button">Phone Details</button>
      </div>
            
        </div>
    </div>`
    phoneContainer.appendChild(div);


}
const displaySearchPhones = phones => {
    const phoneContainer = document.getElementById('displayPhones');
    const errorCOntainer = document.getElementById('phoneNotFound');
    phoneContainer.textContent = '';
    errorCOntainer.textContent = '';
    let count = 0;
    // console.log(phones.length)

    if (phones.length <= 0) {

        const div = document.createElement('div');
        div.classList.add('d-flex', "justify-content-center", "align-items-center")
        div.innerHTML = `<img class="img-fluid me-2" src="./images/cross.png" alt="" width="40px">
        <h3>Phone is currently unavailable</h3>
        `
        errorCOntainer.appendChild(div);

    }
    else {

        phones.slice(0, 20).forEach(phone => {
            count++;
            cards(phone, phoneContainer);
        });
    }

}

//Details of each phone
const loadDetails = (slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
    fetch(url)
        .then(res => res.json())
        .then(data => diaplayLoadDetails(data.data))
}

const diaplayLoadDetails = (singlePhone) => {
    const sensorList = (singlePhone.mainFeatures.sensors).join();
    console.log(singlePhone.mainFeatures.sensors)
    const detailsContainer = document.getElementById('details');
    detailsContainer.textContent = '';
    const div = document.createElement('div');

    div.classList.add('card');
    div.innerHTML = `
    <img src="${singlePhone.image}" class="card-img-top w-50 rounded mx-auto d-block " alt="...">
    <div class="card-body">
      <p class="card-text"><span class="fw-bold">Name: </span>${singlePhone.name}</p>
      <p class="card-text"><span class="fw-bold">Brand: </span>${singlePhone.brand}</p>
      <p class="card-text"><span class="fw-bold">Release Date: </span>${singlePhone.releaseDate ? singlePhone.releaseDate : 'Release date not found'}</p>
      
      <p class="fw-bold">Main Features:</p> 
      <p class="card-text">Storage: </span>${singlePhone.mainFeatures.storage}</p>
      <p class="card-text"><span>Display Size: </span>${singlePhone.mainFeatures.displaySize}</p>
      <p class="card-text"><span>Chip Set: </span>${singlePhone.mainFeatures.chipSet}</p>
      <p class="card-text"><span>Memory: </span>${singlePhone.mainFeatures.memory}</p>
      <p class="card-text">Sensor: </span>${singlePhone.mainFeatures.sensors.join(' ') ? singlePhone.mainFeatures.sensors : 'not found'}</p>


    </div>
    `
    detailsContainer.appendChild(div)

}

const sensorList = (sensors) => {

    const list = sensors.join(',');
    console.log('hjkj', list);

}

/* const showAllSearchPhones = (phones) => {
    const searchFeild = document.getElementById('search-input');
    const searchText = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayAllSearchPhones(data.data))



}
const displayAllSearchPhones = (phones) => {
    const phoneContainer = document.getElementById('displayPhones');
    let count = 0;
    console.log(phones)
    // if(phoneContainer)
    phones.slice(5).forEach(phone => {
        count++;
        //     const div = document.createElement('div');
        //     div.classList.add('col');
        //     div.innerHTML = ` <div class="card h-100">
        //     <img src="${phone.image}" class="card-img-top" alt="...">
        //     <div class="card-body text-center">
        //         <h5 class="card-title"> <span class="fs-2">Phone Name : </span><span class="text-color fs-2 fw-bold">${phone.phone_name}</span></h5>
        //         <p class="card-text"><span class="fs-2">Brand Name : </span><span class="text-color fs-2 fw-bold">${phone.brand}</span></p>
        //         <button onclick="searchPhones()" class="button fs-4">Phone Details</button>
        //     </div>
        // </div>`
        // phoneContainer.appendChild(div);
        cards(phone, phoneContainer);
        document.getElementById('show-all').style.display = 'block';

        console.log(phone, count);

    });
} */
