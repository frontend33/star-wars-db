// Разделять ответственность компонентов: логику и рендеринг
// Код который работает с сетью лучше изолировать в отдельный класс-сервис
export default class SwapiService {
    _apiBase = 'https://swapi.co/api'
    async getResource(url) {
        // Чтобы получить данные с сервера нужно выполнить два вызова (каждый вернет Promise)
        const res = await fetch(`${this._apiBase}${url}`)
        // res.ok содержит true если result.status содержит один из ОК статусов (200-299)
        if (!res.ok) {
            throw new Error(`Could not fetch ${url} received ${res.status}`)
        }
        return await res.json() //Кроме json есть и другие типы ответа arrayBuffer(), text(), formData(), blob()
    }
    async getAllPeople() {
        const res = await this.getResource(`/people/`)
        console.log('getAllPeople', res)
         console.log('getAllPeople', res.results)
        return res.results.map(this._transformPerson)
    }
    
    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`)
        return this._transformPerson(person)
    }
    async getAllPlanets() {
        const res = await this.getResource(`/planets/`)
        console.log('zho', res.result)
        return res.result.map(this._transformPlanet)
    }
    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`)
        return this._transformPlanet(planet)
    }
    async getAllStarships() {
        const res = await this.getResource(`/starships/`)
        return res.result.map(this._transformStarship)
    }
    getStarships(id) {
        const starship = this.getResource(`/starships/${id}`)
        return this._transformStarship(starship)
    }
    _extractId(item) {
        const idRegExp = /\/([0-9])*\/$/
        return item.url.match(idRegExp)[1]
    }
    // Трансформируйте данные до того как их получит компонент
    _transformPlanet = (planet) => {
        return {
            id: this._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
        }
    }
    _transformStarship = (starship) => {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }
    _transformPerson = (person) => {
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,
        }
    }
}

const swapi = new SwapiService()
swapi.getPerson(3).then((p) => {
    console.log(p.name)
})

