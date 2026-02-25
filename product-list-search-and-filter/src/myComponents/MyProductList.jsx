import MyProductCard from './MyProductCard';

function MyProductList({ myProducts }) {
  if (!myProducts?.length) {
    return <p>No products..</p>;
  }
}
