function MyProductCard({ myProduct }) {
  const { name, category, price } = myProduct;

  return (
    <div className="my-product-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Price: {price}</p>
    </div>
  );
}

export default MyProductCard;
