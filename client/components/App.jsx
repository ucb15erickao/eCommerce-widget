import React from 'react';
import styles from '../css/styles.css';
import Tag from './Tag';
import Reviews from './Reviews';
import Availability from './Availability';
import AddToBag from './AddToBag';
import Wishlist from './Wishlist';
import Stock from './Stock';
import Similar from './Similar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      quantityField: 1,
      stockExpansion: 'minimized',
      sid: Math.floor(Math.random() * 20),
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
    this.inputQuantity = this.inputQuantity.bind(this);
    this.adjustQuantity = this.adjustQuantity.bind(this);
    this.handleTooltips = this.handleTooltips.bind(this);
    this.updateWishlist = this.updateWishlist.bind(this);
    this.expander = this.expander.bind(this);
    this.changeStore = this.changeStore.bind(this);
    this.storeSearch = this.storeSearch.bind(this);
    this.searchButton = this.searchButton.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.selectStore = this.selectStore.bind(this);
  };

  componentDidMount() {
    const { address, commerce, datatype: { number }, phone: { phoneNumber } } = require('faker');
    const product = {
      id: Math.floor(Math.random() * 5) + 1,
      name: `LEGO® ${commerce.productName()}`,
      tag: number({ min: 0, max: 3 }),
      price: `${number({ min: 10, max: 499 })}.99`,
      online_inventory: number({ min: 0, max: 1 }),
      rating: (Math.random() * 5).toFixed(2),
      review_count: number({ min: 0, max: 12000 }),
      customer_limit: number({ min: 5, max: 12 }),
      liked: 0,
      category_1: `${commerce.productMaterial()}™`,
      category_2: commerce.productAdjective(),
      category_3: `${commerce.department()}®`,
    };

    const stores = [];
    for (let i = 1; i <= 20; i++) {
      const random = Math.floor(Math.random() * 2);
      const inv = random === 0 ? 0 : number({ min: 1, max: 20 });
      const fakeStore = {
        id: i,
        name: `LEGO® Store ${address.streetName()}`,
        address: address.streetAddress(),
        city: address.city(),
        state: address.stateAbbr(),
        zip: address.zipCode('#####'),
        phone: phoneNumber(),
        details: `https://fec-lego.s3-us-west-1.amazonaws.com/Store+Details/store+${i}.png`,
      };
      stores.push(fakeStore);
    };

    const { sid } = this.state;
    const store = stores[sid - 1];
    const nearbyStores = [];
    const storesCopy = stores.slice();
    storesCopy.splice(sid - 1, 1);
    const random = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < random; i++)
      nearbyStores.push(storesCopy.splice(Math.floor(Math.random() * storesCopy.length), 1)[0]);

    this.setState({ product, store, stores, nearbyStores });
  };

  adjustQuantity(buttonText) {
    const { quantityField } = this.state;
    // let newQuantity = quantityField;

    // if (buttonText === '+')
    //   newQuantity++;
    // else
    //   newQuantity--;

    this.setState({ quantityField: buttonText === '+' ?  quantityField++ : quantityField-- });
  }

  inputQuantity(userInput) {
    const { product, quantityField } = this.state;
    let newQuantity = Number(userInput);
    if (Number.isNaN(newQuantity))
      newQuantity = quantityField;
    else if (newQuantity > product.customer_limit)
      newQuantity = product.customer_limit;
    else if (newQuantity < 1)
      newQuantity = 1;
    this.setState({ quantityField: newQuantity });
  };

  handleTooltips(clickedItem) {
    const { limitTooltip, closestTooltip, detailsTooltip } = this.state;
    // let updatedStatus = true;
    if (clickedItem === 'limit')
      this.setState({ limitTooltip: !limitTooltip });
    else if (clickedItem === 'closest')
      this.setState({ closestTooltip: !closestTooltip });
    else {
      document.body.className = styles.noScroll;
      if (detailsTooltip === true)
        document.body.className = '';
      this.setState({
        detailsTooltip: !detailsTooltip,
        storeMenuExpansion: 'minimized',
      });
    }
  };

  updateWishlist() {
    const { product } = this.state;
    // const productUpdate = product;
    // productUpdate.liked = !product.liked;
    product.liked = !product.liked;
    // this.setState({ product: productUpdate });
    this.setState({ product });
  };

  expander() {
    const { stockExpansion } = this.state;
    // let updatedStatus = 'minimized';
    // if (stockExpansion === 'minimized') {
    //   updatedStatus = 'expanded';
    // }
    this.setState({
      stockExpansion: stockExpansion === 'minimized' ? 'expanded' : 'minimized',
      storeMenuExpansion: 'minimized',
    });
  };

  changeStore() {
    this.setState({ stockExpansion: 'change store' });
  };

  storeSearch(userInput) {
    this.setState({ searchField: userInput });
  };

  searchButton(searchTerm) {
    const zipCode = Number(searchTerm);
    if (Number.isNaN(zipCode) || zipCode < 10000 || zipCode > 99999) {
      this.setState({
        validZip: false,
        stockExpansion: 'expanded',
        storeMenuExpansion: 'minimized',
      });
    } else {
      const { stores, sid } = this.state;
      const nearbyStores = [];
      const storesCopy = stores.slice();
      storesCopy.splice(sid - 1, 1);
      const random = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < random; i++) {
        const removed = storesCopy.splice(Math.floor(Math.random() * storesCopy.length), 1);
        nearbyStores.push(removed[0]);
      }
      const store = storesCopy[Math.floor(Math.random() * storesCopy.length)];
      this.setState({
        validZip: true,
        store,
        nearbyStores,
        stockExpansion: 'expanded',
        storeMenuExpansion: 'minimized',
      });
    }
  }

  toggleDrop() {
    const { storeMenuExpansion } = this.state;
    // let updatedStatus = 'minimized';
    // if (storeMenuExpansion === 'minimized') {
    //   updatedStatus = 'expanded';
    // }
    this.setState({ storeMenuExpansion: storeMenuExpansion === 'minimized' ? 'expanded' : 'minimized' });
  };

  selectStore(previousStore, selectedStore, selectedStoreIndex) {
    const { nearbyStores } = this.state;
    const nearbyCopy = nearbyStores.slice();
    nearbyCopy.splice(selectedStoreIndex, 1);
    nearbyCopy.unshift(previousStore);
    this.setState({
      store: selectedStore,
      nearbyStores: nearbyCopy,
      storeMenuExpansion: 'minimized',
      sid: selectedStore.id,
    });
  };

  render() {
    const {
      product, quantityField, searchField, stores, nearbyStores, store, stockExpansion,
      storeMenuExpansion, productInventory, sid, validZip, limitTooltip, closestTooltip,
      detailsTooltip,
    } = this.state;
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
            <AddToBag
              limit={Number(product.customer_limit)}
              quantity={quantityField}
              buttonHandler={this.adjustQuantity}
              changeHandler={this.inputQuantity}
              handleTooltips={this.handleTooltips}
              limitTooltip={limitTooltip}
            />

            <Wishlist liked={Number(product.liked)} updater={this.updateWishlist} />
            <Stock
              status={stockExpansion}
              expander={this.expander}
              storeChanger={this.changeStore}
              toggleDrop={this.toggleDrop}
              selectStore={this.selectStore}
              searchButton={this.searchButton}
              storeSearch={this.storeSearch}
              handleTooltips={this.handleTooltips}
              searchField={searchField}
              validZip={validZip}
              storeMenuExpansion={storeMenuExpansion}
              stores={stores}
              nearbyStores={nearbyStores}
              productInventory={productInventory}
              store={store}
              sid={sid}
              inventory={Number(productInventory[sid - 1].inventory)}
              closestTooltip={closestTooltip}
              detailsTooltip={detailsTooltip}
            />
            <Similar cat1={`${product.category_1}`} cat2={`${product.category_2}`} cat3={`${product.category_3}`} />
          </div>
        </div>
      </div>
    );
  };
};

export default App;
