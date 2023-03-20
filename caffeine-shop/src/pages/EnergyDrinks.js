import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductPage from "./ProductPage";


export default function EnergyDrinks() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        const PHP = "http://localhost:3001/products/categories.php?category=1";
        axios.get(PHP)
          .then(response => {
            setError(null);
            setIsLoaded(true);
            setSearchResults(response.data);
            console.log(response.data)
          })
          .catch(error => {
            alert(error);
          });
      }, []);

      function handleProductClick(product) {
        setSelectedItem(product);
      }

      function handleClose() {
        setSelectedItem(null);
      }

      if (selectedItem) {
        return (
          <ProductPage product={selectedItem} onClose={handleClose} />
        );
      } else if (error) {
        return <p>{error.message}</p>;
      } else if (!isLoaded) {
        return <p>Loading...</p>;
      } else {
        return (
          <div>
            <h1>Tuotteet</h1>
            <div className='product-container'>
              {searchResults.map((product) => (
                <div className="product" key={product.id} onClick={() =>
                  handleProductClick(product)}>
                  <img src={product.img} alt="" srcSet="" />
                  <ul>
                    <h5>{product.name}</h5>
                    <li>{product.description.substring(0, 100)}{product.description.length > 100 ? "..." : ""}</li>
                    <li>{product.price} eur</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }