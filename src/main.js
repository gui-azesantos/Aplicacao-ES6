import api from './api'

class App {
    constructor() {
        this.repositories = []
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]')
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();

    }
    registerHandlers() {
        this.formEl.onsubmit = (event) => this.addRepository(event);

    }



    async addRepository() {
        event.preventDefault();

        const repoInput = this.inputEl.value;
        if (repoInput.length === 0)
            return;

        this.setloading();
        try {

            const response = await api.get(`/repos/${repoInput}`);
            console.log(response);

            const {
                name,
                description,
                html_url,
                owner: {
                    avatar_url
                }
            } = response.data;


            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });

            this.inputEl.value = '';
            this.render()
        } catch (err) {
            alert('O repositório não existe!')
        }
    }F

    render() {
        this.listEl.innerHTML = "";

        this.repositories.forEach(repo => {
            let imgEL = document.createElement('img');
            imgEL.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let description = document.createElement('p');
            description.appendChild(document.createTextNode(repo.description));

            let link = document.createElement('a');
            link.setAttribute('href', repo.html_url);
            link.setAttribute('target', '_blanck');
            link.appendChild(document.createTextNode("Acessar"));


            let li = document.createElement('li');
            li.appendChild(imgEL);
            li.appendChild(titleEl);
            li.appendChild(description);
            li.appendChild(imgEL);
            li.appendChild(link)

            this.listEl.appendChild(li)


        })
    }
}

new App();
































//Util para API
/* import axios from 'axios'
class Api {
    static async getUserInfo(username) {
        try {
            const response = await axios.get(`http://api.github.com/users/${username}`)
            console.log(response)
        } catch(error) {
            console.warn('Requisição Inválida')
        }
    }
}
Api.getUserInfo('gui-azesantos') 
 */

// Funão delay aciona o .then após 1s