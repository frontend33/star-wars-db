import React, {Component} from 'react'
import Row from '../Row'
import { PlanetDetails, PlanetList } from '../sw-components'

export default class PlanetsPage extends Component {
    state = {
        selectItem: null
    }
    onItemSelected = (selectItem) => {
        this.setState({ selectItem  })
    }
    render() {
        const { selectItem } = this.state
        return (
            <Row left={<PlanetList onItemSelected={this.onItemSelected}/>} right={<PlanetDetails itemId={this.state.selectItem} />} />
        )
    }
}