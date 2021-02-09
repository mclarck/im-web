import React from "react";
import Header from "../../components/header";
import Product from "../../components/product";
import useStocks from "../../controllers/useStocks";
import style from "./style.module.css";
import {Loader, Modal} from "im-ui-core";
import StockForm from "../../components/stockForm";

const Stocks = (props: any) => {
    const {
        t,
        onSelect,
        selected,
        onSearch,
        onCreate,
        showForm,
        form,
        closeForm,
        filter,
        loading
    } = useStocks();
    return (
        <div className={style.Stocks}>
            <div className={style.header}>
                <Header
                    title={t("Stocks")}
                    subtitle={t("Manage stocks entries")}
                    onClick={showForm}
                    onChange={onSearch}/>
            </div>
            <div className={style.content}>
                <div className={style.items}>
                    {filter().map((o: any, idx: number) => (
                        <Product mode={"stock"} readonly={true} key={idx} stock={o.node}
                                 onClick={() => onSelect(o.node)}/>
                    ))}
                </div>
            </div>
            {loading && <Loader/>}
            {form &&
            <Modal dimension={{width: "70vw", height: "60vh"}} onClose={closeForm}>
                <StockForm defaultValue={selected} onCreate={onCreate}/>
            </Modal>}
        </div>
    );
};
export default Stocks;
