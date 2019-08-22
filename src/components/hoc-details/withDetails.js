import React, { Component } from "react";
const withDetails = (View, getData) => {
  return class extends Component {
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
      getData(itemId).then(item => {
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
    //   const { name } = item;
      return <View {...this.props} item={item} image={image} />;
    }
  };
};
export default withDetails