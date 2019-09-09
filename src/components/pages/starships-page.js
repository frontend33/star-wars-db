import React from "react";
import { StarshipList } from "../sw-components";
// Импортируем компонент высшего порядка
import { withRouter } from "react-router-dom";

// export default class StarshipsPage extends Component {
//     // state = {
//     //     selectItem: null
//     // }
//     // onItemSelected = (selectItem) => {
//     //     this.setState({ selectItem  })
//     // }
//     render() {
//         const { selectItem } = this.state
//         return (
//             <StarshipList onItemSelected={()=> {}}></StarshipList>
//             // <Row left={<StarshipList onItemSelected={this.onItemSelected}/>} right={<StarshipDetails itemId={this.state.selectItem} />} />
//         )
//     }
// }

// Как компоненту больше не нужен  state переделываем в реакт функцию

const StarshipsPage = ({ history }) => {
  return <StarshipList onItemSelected={id => history.push(id)} />;
};

export default withRouter(StarshipsPage);
