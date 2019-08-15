import React, { Component } from 'react'
import './random-planet.css'
import SwapiService from '../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {
    SwapiService = new SwapiService()
    state = {
        planet: {},
        loading: true,
        error: false
    }
    // Хорошее место для того чтобы получать данные
    componentDidMount() {
        // В MOUNTING методе жизненного цикла вызываем сервис, который получит данные
        this.updatePlanet()
        this.interval = setInterval(this.updatePlanet, 10000)
        console.log(' componentDidMount Dead mount')
    }
    // Вызовится перед тем как компонент удалится со страницы
    componentWillUnmount() {
        console.log(' componentWillUnmount')
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    updatePlanet = () => {
        console.log('Update')
        // const id = 12
        const id = Math.floor(Math.random() * 25 + 3)
        this.SwapiService.getPlanet(id)
            // В then() обвновляем состояние компонента
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }
    //  2) Функция рендер возвращает дерево реакт элементов, элементы превращаютс в DOM элементы которые за тем добавляются к DOM дереву на странице 
    render() {
        console.log('render')
        const { planet, loading, error } = this.state
        const hasData = !(loading || error)
        const errorMessage = error ? <ErrorIndicator /> : null
        const spinner = loading ? <Spinner /> : null
        const content = hasData ? <PlanetView planet={planet} /> : null

        // if (loading) {
        //     return <Spinner />
        // }
        return (
            <div className="random-planet jumbotron rounded">
                {errorMessage}
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