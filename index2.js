const input = document.getElementById('file-input');
input.addEventListener('change',)

const url = 'https://file.io/';
const formdata = new FormData();
formdata.append("text", "Hello World!");

const params = {
method: 'POST',
body: formdata
}

fetch(url, params)
    .then(res => res.text())
    .then(data => {
        const res = JSON.parse(data);
        console.log(`This is the one-time use link for your data!: ${res.link}`);
        fetch(res.link, {
            method: 'GET'
        })
            .then(res => res.text())
            .then(data => {
            console.log(data)
    })
})