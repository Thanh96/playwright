import { useState } from 'react';
import classes from './MealItem/AddMealItemForm.module.css';
import Card from '../UI/Card';
import classes2 from './AvailableMeals.module.css';

const AddMeal = ({ meals, setMeals }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [nameIsValid, setNameIsValid] = useState();
  const [priceIsValid, setPriceIsValid] = useState();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameIsValid(event.target.value !== '');
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setPriceIsValid(event.target.value !== '' && +event.target.value >= 0.01);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!nameIsValid || !priceIsValid || !price || !name) {
      if (!price) {    setPriceIsValid(false);
      }
      if (!name) {    setNameIsValid(false);
      }
      return;
    }
    const newMeal = {
      id: `m${Math.random().toString().slice(2, 11)}`,
      name,
      description,
      price: parseFloat(price),
    };
    setMeals([...meals, newMeal]);
    setName('');
    setDescription('');
    setPrice('');
    setNameIsValid(true);
    setPriceIsValid(true);
  };

  return (
    <section className={classes2.meals} data-cy="addMeal">
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Add a Meal</h2>
          <label className="mt-2" data-cy="addMeal_name">
            Name:
            <input className="mt-2" type="text" value={name} onChange={handleNameChange} />
            {!nameIsValid && <p className="mt-1 pb-0 red">Please enter a valid name.</p>}
          </label>
          <br />
          <label className="mt-2" data-cy="addMeal_description">
            Description:
            <input className="mt-2" type="text" value={description} onChange={handleDescriptionChange} />
          </label>
          <br />
          <label className="mt-2" data-cy="addMeal_price">
            Price:
            <input className="mt-2" type="number" value={price} onChange={handlePriceChange} step="0.01" />
            {!priceIsValid && <p className="mt-1 pb-0 red">Please enter a valid price (at least 0.01).</p>}
          </label>
          <br />
          <button className="mt-2" type="submit">Add Meal</button>
        </form>
      </Card>
    </section>
  );
};

export default AddMeal;
