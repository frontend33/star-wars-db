import React, { Component } from 'react'
import './random-planet.css'
import SwapiService from '../services/swapi-service'
import Spinner from '../spinner'

export default class RandomPlanet extends Component {
    SwapiService = new SwapiService()
    state = {
        planet: {},
        loading: true
    }

    constructor() {
        super()
        // В конструкторе компонента вызываем сервис, который получит данные
        this.updatePlanet()
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    updatePlanet() {
        const id = Math.floor(Math.random() * 25 + 2)
        this.SwapiService.getPlanet(id)
            // В then() обвновляем состояние компонента
            .then(this.onPlanetLoaded)
    }

    render() {
        const { planet, loading } = this.state
        const spinner = loading ? <Spinner /> : null
        const content = !loading ? <PlanetView planet={planet} /> : null
        // if (loading) {
        //     return <Spinner />
        // }
        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {/* <PlanetView planet={planet}></PlanetView> */}
            </div>
        )
    }
}

// Компоненты которые занимаются отрисовкой, отображением не занимаются логикой, а компоненты занимающиес логикой не занимаются отрисовкой
const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet
    return (
        // Фрагмент позволяет обернуть несколько компонентов JSX при этом не создавая лишних Dom элементов 
        <React.Fragment>
            <img className="planet-image" alt=""
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}