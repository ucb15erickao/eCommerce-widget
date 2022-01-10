import React from 'react';
import styles from '../css/styles.css';
import StoreSelect from './StoreSelect';

const Stock = ({
  status, expander, storeChanger, toggleDrop, storeMenuExpansion, selectStore, stores, nearbyStores,
  storeSearch, searchField, searchButton, store, sid, validZip, closestTooltip,
  detailsTooltip, handleTooltips,
}) => {
  if (status === 'minimized') {
    return (
      <div className={styles.storeContainer}>
        <button type="button" className={`${styles.stock}`} onClick={expander}>
          <div className={styles.buttonTextWrapper}>
            <div className={styles.stockText}>Check Store Stock</div>
            <div className={styles.expander}>
              <div className={`${styles.horizontal} ${styles.horizontalInit}`} />
              <div className={`${styles.vertical} ${styles.verticalInit}`} />
            </div>
          </div>
        </button>
      </div>
    );
  }
  if (status === 'expanded') {
    return (
      <div className={styles.storeContainer}>

        <button type="button" className={`${styles.stock} ${styles.expanded}`} onClick={expander}>
          <div className={styles.buttonTextWrapper}>
            <div className={styles.stockText}>Check Store Stock</div>
            <div className={styles.expander}>
              <div className={`${styles.horizontal} ${styles.horizontalToggled}`} />
              <div className={`${styles.vertical} ${styles.verticalToggled}`} />
            </div>
          </div>
        </button>
        <div className={styles.storePanel}>
          <div className={styles.storeHeader}>
            <span className={styles.storeHeaderText}>Closest Store</span>
            <div className={styles.infoContainer}>
              <span className={styles.infoWrapper}>
                <button type="button" className={styles.info} onClick={() => { handleTooltips('closest'); }} />
              </span>

              {closestTooltip === true && (
                <div>
                  <div className={styles.closestTooltipWrapper}>
                    <div className={styles.closestTooltipContainer}>
                      <button type="button" className={styles.closestX} aria-label="button" onClick={() => { handleTooltips('closest'); }}>
                        <svg viewBox="0 0 17 17" width="17px" height="17px">
                          <path d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z" fill="currentColor" fillRule="evenodd" />
                        </svg>
                      </button>
                      <div className={styles.closestTooltipHeader}>Please Note:</div>
                      <div className={styles.closestTooltipText}>
                        The green check mark indicates that this item is currently available in this
                        location. Items sell at varying rates and this is not a guarantee that the item
                        will remain in stock for an extended period of time.  If you want to ensure
                        availability, visit the store soon or call ahead and speak with a Brick
                        Specialist.
                      </div>
                    </div>
                  </div>
                  <button type="button" className={styles.closestTooltip} aria-label="button" onClick={() => { handleTooltips('closest'); }} />
                </div>
              )}

            </div>
            <button
              className={styles.changeStore}
              onClick={storeChanger}
              type="button"
            >
              <span className={styles.changeStoreText}>
                Change Store Location
              </span>
            </button>
          </div>
          {validZip === true && (
            <div className={styles.selectPanel}>
              <StoreSelect
                stores={stores}
                nearbyStores={nearbyStores}
                store={store}
                sid={sid}
                toggleDrop={toggleDrop}
                storeMenuExpansion={storeMenuExpansion}
                selectStore={selectStore}
              />
              <div className={styles.store}>
                {store.inventory > 0 && (
                  <div className={`${styles.storeInventory} ${styles.inStock}`}>
                    <svg width="20px" height="13px" viewBox="0 0 20 13">
                      <path d="M0 5.703L7.177 13 20 0h-4.476L7.177 8.442 4.476 5.723H2.238z" fill="currentColor" fillRule="evenodd" />
                    </svg>
                  </div>
                )}
                {store.inventory <= 0 && (
                  <div className={`${styles.storeInventory} ${styles.outOfStock}`}>
                    <svg viewBox="0 0 17 17" width="17px" height="17px">
                      <path d="M10.377 8.142l5.953-5.954-2.234-2.234-5.954 5.954L2.188-.046-.046 2.188l5.954 5.954-5.954 5.954 2.234 2.234 5.954-5.953 5.954 5.953 2.234-2.234z" fill="currentColor" fillRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className={styles.storeTitle}>{store.name}</div>
                {store.inventory > 0 && (
                  <div className={styles.storeStock}>In Stock at this time</div>
                )}
                {store.inventory <= 0 && (
                  <div className={styles.storeStock}>Out of Stock</div>
                )}
                <div className={styles.storeDetails}>{store.address}</div>
                <div className={styles.storeDetails}>{`${store.city}, ${store.state} ${store.zip}`}</div>
                <button
                  type="button"
                  className={styles.seeStore}
                  onClick={() => { handleTooltips('details'); }}
                >
                  See Store Details
                </button>
                {detailsTooltip === true && (
                  <div className={styles.detailsTooltipContainer}>
                    <button type="button" className={styles.detailsTooltip} aria-label="button" onClick={() => { handleTooltips('details'); }} />
                    <div className={styles.detailsTooltipContent}>
                      <img src={store.details} alt="store details" />
                      <button type="button" className={styles.detailsX} aria-label="button" onClick={() => { handleTooltips('details'); }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {validZip === false && (
            <div className={styles.noStoreFound}>
              No stores found within a 60-mile radius of your zip code
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.storeContainer}>
      <button type="button" className={`${styles.stock} ${styles.expanded}`} onClick={expander}>
        <div className={styles.buttonTextWrapper}>
          <div className={styles.stockText}>Check Store Stock</div>
          <div className={styles.expander}>
            <div className={`${styles.horizontal} ${styles.horizontalToggled}`} />
            <div className={`${styles.vertical} ${styles.verticalToggled}`} />
          </div>
        </div>
      </button>
      <div className={styles.storeHeader}>
        <span className={styles.findStoreText}>Enter your address to find a store near you.</span>
      </div>
      <div className={styles.searchContainer}>
        <input className={styles.storeSearch} placeholder="Enter zip code" onChange={(e) => { storeSearch(e.target.value); }} />
        <button type="button" className={styles.searchButton} onClick={() => { searchButton(searchField); }}>
          <svg width="18px" height="18px" viewBox="0 0 18 18">
            <path d="M18 16.615c0 .375-.137.7-.412.973a1.331 1.331 0 0 1-.973.412 1.28 1.28 0 0 1-.973-.412l-3.71-3.7a7.41 7.41 0 0 1-4.317 1.342c-1.03 0-2.017-.2-2.958-.6a7.616 7.616 0 0 1-2.434-1.623 7.605 7.605 0 0 1-1.622-2.433A7.472 7.472 0 0 1 0 7.616c0-1.032.2-2.018.6-2.96a7.65 7.65 0 0 1 1.623-2.433A7.616 7.616 0 0 1 4.657.601 7.49 7.49 0 0 1 7.615 0c1.032 0 2.018.2 2.959.601.94.4 1.752.941 2.434 1.622a7.624 7.624 0 0 1 1.622 2.434c.4.941.601 1.927.601 2.959a7.403 7.403 0 0 1-1.342 4.316l3.71 3.71c.267.266.401.592.401.973m-5.539-9c0-1.334-.474-2.475-1.423-3.423C10.09 3.244 8.95 2.77 7.615 2.77c-1.333 0-2.475.474-3.423 1.422C3.243 5.14 2.77 6.28 2.77 7.616c0 1.334.474 2.475 1.423 3.423.948.949 2.09 1.422 3.423 1.422 1.335 0 2.475-.473 3.423-1.422.95-.948 1.423-2.09 1.423-3.423" fill="#006DB7" fillRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Stock;
