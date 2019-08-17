import React, { Component } from 'react'
import './people-page.css'
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../services/swapi-service';

const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
}

class ErrorBoundary extends Component {
    state = {
        hasError: false
    }
    componentDidCatch(error, info) {
        debugger
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }
        console.log('test children',this.props.children)
        return this.props.children
    }
}
// Теперь на компоненте people page нет кода который отлавливает ошибки
// этот код перешел в отдельный компонент который можно переиспользовать в любой части приложения и может отлавливать ошибки
export default class PeoplePage extends Component {
    swapiService = new SwapiService
    state = {
        selectedPerson: 3,
    }


    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson })
    }

    render() {
        // if (this.state.hasError) {
        //     return <ErrorIndicator />
        // }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}
            >
                {/* Функция которая будет описывать как выгдядит тело компонента
                Получить доступ к этой функции из компонента если у функции нет имени */}
                {(i) => (
                    `${i.name} (${i.birthYear})`
                )}
            </ItemList>
        )

        const personDetails = (
            <ErrorBoundary>
                <PersonDetails personId={this.state.selectedPerson} />
            </ErrorBoundary>
        )

        return (
            <div>
                <Row left={itemList} right={personDetails} />
                <Row left={<p>Hello</p>} right="Bar" />
            </div>
        );

    }
} 