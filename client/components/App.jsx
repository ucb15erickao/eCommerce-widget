import React from 'react';
import { commerce, datatype } from 'faker';
const { number } = datatype;

class App extends React.Component {
  constructor(props) {
    super(props);
    const pline = `${commerce.productMaterial()}™`;
    this.state = {
      product: {
        id: Math.floor(Math.random() * 5) + 1,
        name: `LEGO® ${commerce.productName()}`,
        product_line: pline,
        tag: number({ min: 0, max: 3 }),
        price: `${number({ min: 10, max: 499 })}.99`,
        online_inventory: number({ min: 0, max: 1 }),
        rating: Math.random() * 5,
        review_count: number({ min: 0, max: 1000 }),
        customer_limit: number({ min: 5, max: 12 }),
        liked: number({ min: 0, max: 1 }),
        category_1: pline,
        category_2: commerce.productAdjective(),
        category_3: `${commerce.department()}®`,
      },
    };
  };

  componentDidMount() {
    console.log('componentDidMount/product.name:', this.state.product.name);
  };

  render() {
    return (
      <div>App.jsx/product.id: {this.state.product.id}</div>
    );
  };
};

export default App;
