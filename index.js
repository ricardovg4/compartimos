const input = document.getElementById('file-input');
const linkPlaceholder = document.querySelector('.p--code');
const url = 'https://file.io/';

const form = document.querySelector('.form--main');
const down = document.querySelector('.a-download');
const pError = document.querySelector('.p--error');

function sendFile(){
    const formdata = new FormData();
    formdata.append("file", input.files[0]);

    const params = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch(url, params)
        .then(res => res.text())
        .then(data => {
            data = JSON.parse(data);
            const link = data.link;
            const code = link.split('/')[3];
            linkPlaceholder.innerHTML = `El codigo de un solo uso para descarga: <strong>${code}</strong>`;
        })
        .catch(err => console.log(err));
}

function retrieveFile(event){
    const code = form.children[0].value;
    const urlRetrieve = `${url+code}`;
    const params ={
        method: 'GET'
    };
    fetch(urlRetrieve, params)
        .then(res => {
            if(res.status !== 200){
                throw new Error("Not 200 response")
            }
            return res.blob()
        })
        .catch(err => {
            down.innerHTML = '';
            pError.innerHTML = 'This code has already been used or is non-existent!'
            // console.log('not a 200')
        })
        .then(data => {
            const download = window.URL.createObjectURL(data);
            down.innerHTML = 'Descarga el archivo';
            down.href = download;
            down.target = '_blank';
            down.download = '';
            })
        .catch(err => {
            down.innerHTML = '';
            console.log('something is wrong');
            });
    event.preventDefault();
}

function removeLink(){
    this.innerHTML = '';
}

input.addEventListener('change', sendFile);
form.addEventListener('submit', retrieveFile);
down.addEventListener('click', removeLink);