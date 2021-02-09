import {Loader} from "im-ui-core";
import React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import useStocks from "../../controllers/useStocks";
import style from "./style.module.css";

const Stocks = (props: any) => {
    const {onSearch, loading, filter, buy, addToCart} = useStocks();
    return (
        <div className={style.Stocks}>
            <div className={style.header}><Header onChange={onSearch}/></div>
            <div className={style.content}>
                <div className={style.items}>
                    {filter().map((o: any, idx: number) => (
                        <Product key={idx} stock={o.node} onBuy={buy} onSelect={addToCart}/>
                    ))}
                </div>
            </div>
            {loading && <Loader/>}
        </div>
    );
};
export default Stocks;
