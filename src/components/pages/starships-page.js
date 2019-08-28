import React, {Component} from 'react'
import Row from '../Row'
import { StarshipDetails, StarshipList } from '../sw-components'

export default class StarshipsPage extends Component {
    state = {
        selectItem: null
    }
    onItemSelected = (selectItem) => {
        this.setState({ selectItem  })
    }
    render() {
        const { selectItem } = this.state
        return (
            <Row left={<StarshipList onItemSelected={this.onItemSelected}/>} right={<StarshipDetails itemId={this.state.selectItem} />} />
        )
    }
}