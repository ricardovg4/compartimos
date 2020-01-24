const input = document.getElementById('file-input');

const url = 'https://file.io/';

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
            const res = JSON.parse(data);
            console.log(`This is the one-time use link for your data!: ${res.link}`);
        })
        .catch(err => console.log(err));
}


input.addEventListener('change', sendFile);