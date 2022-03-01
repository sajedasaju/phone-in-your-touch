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
    console.log(phone)
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = ` <div class="card h-100">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body text-center">
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

        phones.slice(0, 5).forEach(phone => {
            count++;
            cards(phone, phoneContainer);
        });
    }

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
