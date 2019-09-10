import React from 'react'
import Row from '../Row'
import { PersonDetails, PersonList } from '../sw-components'
import { withRouter } from 'react-router-dom'
// export default class PeoplePage extends Component {
//     state = {
//         selectItem: null
//     }
//     onItemSelected = (selectItem) => {
//         this.setState({ selectItem  })
//     }
//     render() {
//         const { selectItem } = this.state
//         return (
//             <Row left={<PersonList onItemSelected={this.onItemSelected}/>} right={<PersonDetails itemId={this.state.selectItem} />} />
//         )
//     }
// }


const PeoplePage = ({ history, match }) =>  {
    const { id } = match.params
        return (
            <Row
                left={<PersonList onItemSelected={(id) => history.push(id)}/>}
                right={<PersonDetails itemId={id} />} />
        )
}

export default withRouter(PeoplePage)
