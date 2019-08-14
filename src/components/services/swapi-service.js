
// Код который работает с сетью лучше изолировать в отдельный класс-сервис
export default class SwapiService {
    _apiBase = 'https://swapi.co/api'
    async getResource (url) {
        // Чтобы получить данные с сервера нужно выполнить два вызова (каждый вернет Promise)
        const res = await fetch(`${this._apiBase}${url}`)
        // res.ok содержит true если result.status содержит один из ОК статусов (200-299)
        if (!res.ok ) {
            throw new Error (`Could not fetch ${url} received ${res.status}`)
        }
        return await res.json() //Кроме json есть и другие типы ответа arrayBuffer(), text(), formData(), blob()
    }
    async getAllPeople () {
        const res = await this.getResource(`/people/`)
        return res.results
    }
    getPerson(id) {
        return this.getResource(`/people/${id}/`)
    }
    async getAllPlanets () {
        const res = await this.getResource(`/planets/`)
        return res.result
    }
    getPlanet (id) {
        return this.getResource(`/planets/${id}`)
    }
    async getAllStarships () {
        const res = await this.getResource(`/starships/`)
        return res.result
    }
    getStarships (id) {
        return this.getResource(`/starships/${id}`)
    }
}

const swapi = new SwapiService ()
swapi.getPerson(3).then((p) => {
    console.log(p.name)
})

