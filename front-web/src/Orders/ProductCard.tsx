import { FormatPrice } from "./helper";
import { Product } from "./typess";


type Props = {
    product : Product;
    onSelectedProduct: (product : Product) => void;
    isSelected : boolean
}

function ProductCard({ product, onSelectedProduct, isSelected } : Props){

    return (
        <div className={`order-card-container ${isSelected ? "selected" : ""} `} onClick={ () => onSelectedProduct(product)}>
            <h3 className="order-card-title">
                {product.name}
            </h3>
            <img src={product.imageUri} className="order-card-image" alt={product.name}/>
            <h3 className="order-card-price">
                {FormatPrice(product.price)}
            </h3>
            <div className="order-card-description">
                <h3>Descrição</h3>
                {product.description}
            </div>
        </div>
    )
}

export default ProductCard;