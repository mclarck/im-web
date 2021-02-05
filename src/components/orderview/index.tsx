import React from "react";
import {Order} from "im-ui-core";
import useCart from "../../controllers/useCart";

const OrderView = ({order, onRemove}: any) => {
    const {file} = useCart();
    const stock = order?.stock;
    const product = order?.stock?.product;
    return (
        <Order
            size="sm"
            specie={product?.specie}
            mark={product?.mark}
            price={stock?.price}
            strike={stock?.strike}
            descriptions={`${product?.variety || ""} ${product?.container || ""}`}
            img={`http://${file.url(stock?.file)}`}
            quantity={order?.quantity}
            onRemove={onRemove ? () => onRemove(order) : undefined}
        />
    );
};

export default OrderView;
