import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator"
// В этот компонент обертку мы вынесем всю часть получения данных с сервера лоадеров обработки ошибок и Вынесли весь state
// В аргумент view можем передать любой компонент который захотим использовать внутри
const withData = View => {
  return class extends Component {
    // По скольку наш внутренний анонимный класс это компонент мы можем передать componentDidMount
    state = {
      data: null,
      loading: true,
      error: false
    };
    componentDidMount() {
      this.update();
    }
    componentDidUpdate(prevProps) {
      if (this.props.getData !== prevProps.getData) {
        this.update();
      }
    }
    update() {
      this.setState({
        loading: true,
        error: false
      });
      this.props
        .getData()
        .then(data => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }
    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorIndicator/>
      }
      // console.log('this.props', this.props)
      // Отрисовываем компонент полученный из аргумента и добавляем в него все данные которые посчитали в данном компоненте
      // Мы передаем все данные из пропс и в этот же объект передаем ключ data - с данными с сервера
      // в компоненте все данные лежат в аргументе props const { data, onItemSelected, children: renderLabel } = props;
      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
