import React, { Component } from 'react'
import './item-list.css'
import SwapiService from '../services/swapi-service';
import Spinner from '../spinner';
export default class ItemList extends Component {
    swapiService = new SwapiService
    state = {
        itemList: null
    }

    componentDidMount() {
        const { getData } = this.props
        getData()
            .then((itemList) => {
                // Передаем ответ сервера в state
                this.setState({
                    itemList
                })
            })
    }
    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item
            const label = this.props.renderItem(item)
            return (
                <li className="list-group-item"
                    key={id}
                    // При клике на компонент передаем его id родителю для детального просмотра
                    onClick={() => this.props.onItemSelected(id)}>
                        {/* Передадим функцию что бы отображать разные условия item list */}
                    {/* {name} */}
                    {label}

                </li>
            )
        })
    }

    render() {
        const { itemList } = this.state
        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList)
        return (
            <ul className="item-list item-list-group" >
                {items}
            </ul>
        )
    }

}