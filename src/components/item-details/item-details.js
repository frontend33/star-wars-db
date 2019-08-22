import React, { Component } from "react";
import "./item-details.css";
import SwapiService from "../services/swapi-service";
import ErrorButton from "../error-button/error-button";
// import withDetails from '../hoc-details'

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{ item[field] }</span>
    </li>
  );
};

export {
  Record
};

// const ItemDetails = props => { 
//   const { item, image, children: renderLabel } = props;
//   // return (
//     // if (!item) {
//     //   return <span>Select a item from a list</span>;
//     // }
//     const { name } = item;
//     return (
//       <div className="item-details card">
//         <img className="item-image"
//           // src={image}
//           alt="item"/>

//         <div className="card-body">
//           <h4>{name}</h4>
//           {/* Компонент может решать как именно использовать children
//           Функция React.Children.map() упрощает обработку props.children
//           Child элементы можно заменять, оборачивать, в другие компоненты или скрывать (если вернуть null) */}
//           <ul className="list-group list-group- flush">
//             {/* {this.props.children} */}
//             {
//               // В реакте есть специальный апи для работы с детьми React.Children.map приведет все к одному типу
//               // Пройдется по всем child и обработает все случае (null, undefined)
//               // Функция позволяет пройтись проитерировать this.props.children и сделать что то с каждым child
//               React.Children.map(this.props.children, (child) => {
//                 return React.cloneElement(child, { item });
//               })
//             }
//           </ul>
//           <ErrorButton />
//         </div>
//       </div>
//   )

// }
// const { getPerson } = new SwapiService()
// export default withDetails(ItemDetails, getPerson);

// export default ItemDetails
// // Default уже занят экспортируем как именной компонент
export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: getImageUrl(item)
        });
      });
  }

  render() {

    const { item, image } = this.state;
    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { id, name, gender,
      birthYear, eyeColor } = item;


    return (
      <div className="item-details card">
        <img className="item-image"
          // src={image}
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          {/* Компонент может решать как именно использовать children
          Функция React.Children.map() упрощает обработку props.children
          Child элементы можно заменять, оборачивать, в другие компоненты или скрывать (если вернуть null) */}
          <ul className="list-group list-group- flush">
            {/* {this.props.children} */}
            {
              // В реакте есть специальный апи для работы с детьми React.Children.map приведет все к одному типу
              // Пройдется по всем child и обработает все случае (null, undefined)
              // Функция позволяет пройтись проитерировать this.props.children и сделать что то с каждым child
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}