import React from "react"
import style from "./style.module.css";
import Header from "../../components/header";
import {Loader} from "im-ui-core";
import useSales from "../../controllers/useSales";
import {Route, Switch} from "react-router-dom";
import SalesMenu from "../../components/salesMenu";
import Operations from "../operations";
import Shipping from "../operations/shipping";
import Pending from "../operations/pending";


const Sales = (props: any) => {
    const {t, loading, getPath} = useSales()
    return (
        <div className={style.Sales}>
            <div className={style.header}>
                <Header title={t("Sales")} subtitle={t("Manage sales operations")}/>
            </div>
            <div className={style.content}>
                <SalesMenu/>
                <Switch>
                    <Route path={getPath("/shipping")} component={Shipping} exact/>
                    <Route path={getPath("/pending")} component={Pending} exact/>
                    <Route path={getPath()} component={Operations} exact/>
                </Switch>
            </div>
            {loading && <Loader/>}
        </div>
    )
}

export default Sales
