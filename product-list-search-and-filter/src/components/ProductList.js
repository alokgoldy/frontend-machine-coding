import ProductCard from './ProductCard';

function ProductList({ products }) {

    if (!products?.length) {
        return <p>No products found</p>;
    }
    return (<div className='product-list'>
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>)

}

export default ProductList;