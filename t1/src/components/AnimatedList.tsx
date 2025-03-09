import React, { useState } from "react";
import "./AnimatedList.css";

//placeholder items
const items = [
  { id: 1, title: "Sample name 1", subtitle: "Some shirt description", price: "$123", image: "https://picsum.photos/500" },
  { id: 2, title: "Sample name 2", subtitle: "Another description, very cool", price: "$144", image: "https://picsum.photos/500" },
  { id: 3, title: "Sample name 3", subtitle: "It would be nice to get a postion offer", price: "$89", image: "https://picsum.photos/500" },
  { id: 4, title: "Sample name 4", subtitle: "Would be great, yeah", price: "$99", image: "https://picsum.photos/500" },
];


const AnimatedProductView = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  return (
    <div className={`container ${selectedItem !== null ? "expanded" : ""}`}>

      {selectedItem === null ? (

        //Starting view.

        <div className="list-view">
          <h1 className="title">Placeholder Shop Name</h1>
          <p className="subtitle">Take a look in our products, feel free to buy some</p>

          <div className="item-grid">
            {items.map((item) => (
              <div key={item.id} className="item" onClick={() => setSelectedItem(item.id)}>
                <img className="item-image" src={item.image} alt={item.title} />
                <h2 className="item-title">{item.title}</h2>
                <p className="item-subtitle">{item.subtitle}</p>
                <span className="item-price">{item.price}</span>
              </div>
            ))}
          </div>
          
        </div>
      ) : (

        //Detailed view.

        <div className="detail-view fade-in">
          <button className="back-button" onClick={() => setSelectedItem(null)}>← Back</button>
          <div className="detail-container">

            <img className="detail-image zoom-in" src={items[selectedItem - 1].image} alt="Selected" />

            <div className="detail-info slide-in">
              <div className="detail-header">
                <h2 className="detail-title">{items[selectedItem - 1].title}</h2>
                <p className="detail-subtitle">{items[selectedItem - 1].subtitle}</p>
                <p className="detail-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Incidunt magnam quia, explicabo dolor vel.</p>
              </div>

              <div className="detail-footer">
                <p className="detail-price">{items[selectedItem - 1].price}</p>
                <button className="add-to-cart">Add to cart</button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedProductView;
