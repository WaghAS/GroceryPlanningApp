import React, { useState, useEffect } from "react";
import "./Home.css";
const Home = () => {
  const [groceryItem, setGroceryItem] = useState("");
  const [grocery, setGrocery] = useState([]);
  const [line, setLine] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddItem = () => {
    fetch("http://localhost:3001/grocery/add", {
      method: "POST",
      body: JSON.stringify({ groceryItem, isPurchased: false }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((dt) => {
        alert("Item inserted successfully");
      });
  };

  async function getProducts() {
    let insert = await fetch("http://localhost:3001/grocery/getAll");
    insert = await insert.json();
    setGrocery(insert);
  }

  const handlePurchaseItem = (id) => {
    setLine(true);
    console.log(id);

    fetch("http://localhost:3001/grocery/updatePurchaseStatus/" + id, {
      method: "PUT",
      body: JSON.stringify({ id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((dt) => {
        alert("Item updated successfully");
      });
  };

  const removeProduct = async (id) => {
    console.log(id);

    fetch("http://localhost:3001/grocery/deleteGroceryItem/" + id, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((dt) => {
        alert("Item deleted successfully");
        getProducts();
      });
  };

  return (
    <>
      <div>
        <p className="a">Monthly Grocery Planning</p>
        <h1 className="b">Here You Can Plan For Month</h1>
      </div>
      <br></br>
      <form>
        <div>
          <input
            type="text"
            placeholder="Add your items here..."
            autoComplete="off"
            className="c"
            value={groceryItem}
            onChange={(e) => {
              setGroceryItem(e.target.value);
            }}
          ></input>
        </div>
        <br></br>
        <div>
          <button onClick={handleAddItem()}>ADD </button>
        </div>
      </form>
      <div>
        <div className="table">
          <table>
            {grocery.map((items) => (
              <tr>
                <td style={{ textDecoration: line ? "line-through" : "none" }}>
                  {items.groceryItem}
                </td>
                <td>
                  <span className="d">
                    <input
                      type="button"
                      value="Purchase"
                      className="e"
                      onClick={() => handlePurchaseItem(items._id)}
                    ></input>
                  </span>
                </td>
                <td>
                  <span className="c">
                    <input
                      type="button"
                      value="Remove"
                      className="f"
                      onClick={() => removeProduct(items._id)}
                    ></input>
                  </span>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
