import React, {Component} from 'react'
import Spinner  from '../spinner'
import ErrorIndicator from '../error-indicator'
// В этот компонент обертку мы вынесем всю часть получения данных с сервера лоадеров обработки ошибок и Вынесли весь state
// В аргумент view можем передать любой компонент который захотим использовать внутри
const withData = (View, getData) => {
    return class extends Component {
      // По скольку наш внутренний анонимный класс это компонент мы можем передать componentDidMount
      state = {
        data: null
      };
      componentDidMount() {
        getData().then(data => {
          // Передаем ответ сервера в state
          this.setState({
            data
          });
        });
      }
      render() {
        const { data } = this.state;
        
        if (!data) {
          return <Spinner />;
        }
        // console.log('this.props', this.props)
        // Отрисовываем компонент полученный из аргумента и добавляем в него все данные которые посчитали в данном компоненте
        // Мы передаем все данные из пропс и в этот же объект передаем ключ data - с данными с сервера
        // в компоненте все данные лежат в аргументе props const { data, onItemSelected, children: renderLabel } = props;
        return <View {...this.props} data={data} />;
      }
    }
  };

  export default withData