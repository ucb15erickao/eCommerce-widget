import React from 'react';
import styles from '../css/styles.css';
import Tag from './Tag';
import Reviews from './Reviews';
import Availability from './Availability';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantityField: 1,
      stockExpansion: 'minimized',
      stores: [],
      nearbyStores: [],
      store: {},
      productInventory: new Array(20).fill({}),
      searchField: '',
      validZip: true,
      limitTooltip: false,
      closestTooltip: false,
      detailsTooltip: false,
    };
  };

  componentDidMount() {
    const { commerce, datatype: { number } } = require('faker');
    const product = {
      id: Math.floor(Math.random() * 5) + 1,
      name: `LEGO® ${commerce.productName()}`,
      tag: number({ min: 0, max: 3 }),
      price: `${number({ min: 10, max: 499 })}.99`,
      online_inventory: number({ min: 0, max: 1 }),
      rating: (Math.random() * 5).toFixed(2),
      review_count: number({ min: 0, max: 12000 }),
      customer_limit: number({ min: 5, max: 12 }),
      liked: number({ min: 0, max: 1 }),
      category_1: `${commerce.productMaterial()}™`,
      category_2: commerce.productAdjective(),
      category_3: `${commerce.department()}®`,
    };
    this.setState({ product }, () => { console.log('state.product.name:', this.state.product.name); });
  };

  render() {
    const { product } = this.state;
    return (
      <div className={styles.pageContainer}>
        <div className={styles.productWrapper}>
          <div className={`container ${styles.container}`}>
            <Tag tag={Number(product.tag)} />
            <p className={styles.productLine}>  {product.product_line}  </p>
            <h1 className={styles.productTitle}>  {product.name}  </h1>
            <Reviews rating={Number(product.rating)} count={Number(product.review_count)} />
            <h1 className={styles.price}>  {`$${product.price}`}  </h1>
            <Availability onlineInv={Number(product.online_inventory)} />
          </div>
        </div>
      </div>
    );
  };
};

export default App;
