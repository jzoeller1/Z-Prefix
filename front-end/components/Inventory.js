import React, { useState, useEffect } from 'react';

const Inventory = () => {

  const [item, setItem] = useState([]);


  useEffect(
    () => {
      async function getItems() {
        const response = await fetch('http://localhost:8081/items');
        const data = await response.json();
        setItem(data);
      }
      getItems();
    }, [])


  return (
    <div>
      <div>
        {item.map((item, index) => {
          return (
            <div>
              {/* key={item.id} */}
              <h1>item: {item.item_name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Inventory;