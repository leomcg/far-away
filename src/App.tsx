/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "condoms", quantity: 20, packed: false },
// ];

const quantities = Array.from({ length: 20 }, (_, i) => i + 1);

export default function App() {
  const [items, setItems] = useState<any>([]);
  const handleAddItems = (item: any) => {
    setItems((prevItems: any) => [...prevItems, item]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => id != item.id));
  };

  const handlePackItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onPackItem={handlePackItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>🚀 What do you need for your trip? 😍</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {quantities.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onRemoveItem, onPackItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onRemoveItem={onRemoveItem}
            onPackItem={onPackItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onPackItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onPackItem(item.id)}
      />
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some items to you packing list 🚀</em>
      </footer>
    );
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You have everything set! Good trip! 🛫"
          : `💼 You have ${numItems} items on your list, and you already packed ${
              numPacked + " "
            } (${percentage}%)`}
      </em>
    </footer>
  );
}
