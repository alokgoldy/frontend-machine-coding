import MyProductCard from './MyProductCard';

function MyProductList({ myProducts }) {
  if (!myProducts?.length) {
    return <p>No Products Found</p>;
  }

  return (
    <div className="my-product-list">
      {myProducts.map((myProduct) => {
        return <MyProductCard key={myProduct.id} myProduct={myProduct} />;
      })}
    </div>
  );
}

export default MyProductList;
