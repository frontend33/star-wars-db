import React, { Component } from 'react'
import './person-details.css'
import SwapiService from '../services/swapi-service';
import ErrorButton from '../error-button/error-button';

export default class PersonDetails extends Component {
    swapiService = new SwapiService ()
    state = {
        person: null
    }
    // Первый раз компонент может быть проинициализирован с id персонажем
    componentDidMount () {
        console.log('Component Did Mount')
        this.updatePerson()
    }
    // Если компонент обновляется мы получаем prevProps
    // Функция вызывается когда компонент обновился и от рендерился
    componentDidUpdate (prevProps) {
        console.log('componentDidUpdate')
        // Очень важно Только в том случае если они отличаются только тогда обновлять персонажа
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson()
        }
    }

    updatePerson () {
        const {personId} = this.props
        if(!personId) {
            return
        }
        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person })
            }) 
    }

    render() {
        if(!this.state.person) {
            return <span>Select a person from a list</span>
        }

        const { id, name, gender, birthDay, eyeColor } = this.state.person
        return (
            <div className="person-details card">
                <img className="person-image" alt=""
                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
                <div className="card-body">
                    <h4>{name}</h4>
                    {/* { this.props.person.id } */}
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthDay}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                    <ErrorButton/>
                </div>
            </div>
        )
    }
}