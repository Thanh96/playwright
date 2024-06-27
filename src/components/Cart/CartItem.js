import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']} data-cy="cartItem">
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price} data-cy="cartItem_price">{price}</span>
          <span className={classes.amount} data-cy="cartItem_amount">x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions} data-cy="cartItem_actions">
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
