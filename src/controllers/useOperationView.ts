import _ from "lodash";
import {useCalculator, useFile, useLocale} from "im-hooks";
import {useContext, useState} from "react";
import {RestClient} from "../services/database";
import {AnalyticIO} from "../services/io/IOProvider";
import {useParams} from "react-router-dom";

const useOperationView = (props?: any) => {
    const {t} = useLocale();
    const {company} = useParams<any>()
    const [sender] = useState<any>(() => ({username: company, phone: company}))
    const [dest] = useState<any>(() => ({username: company, phone: "analytic@" + company}))
    const bounds = props?.setting?.bounds;
    const orders = _.map(props?.cart?.orders?.edges, (o) => o.node);
    const {tax, shipment, subTotal, amount} = useCalculator(orders);
    const file = useFile()
    const rest = useContext(RestClient)
    const anal = useContext(AnalyticIO)
    const onError = (e: any) => console.log(e.message)
    const bills = [
        {name: t("subtotal"), value: subTotal()},
        {name: t("shipment"), value: shipment()},
        {name: t("tax"), value: tax()},
        {name: t("total"), value: amount(), istotal: true},
    ];
    const orderProps = orders?.map((order) => {
        const product = order?.stock?.product;
        return {
            ...product,
            quantity: order?.quantity,
            img: `http://${file.url(order?.stock?.file)}`,
            descriptions: `${product?.variety} ${product?.container} (${order?.stock?.price})`,
        };
    });
    const send = async (res: any) => {
        try {
            if (anal) {
                if (res.ok) {
                    const content = await res.json()
                    anal.emit("message", {sender: sender, dest: dest, content})
                }
            }
        } catch (e) {
            onError(e)
        }
    }
    const update = async (status: string) => {
        try {
            const verb = "PUT";
            const path = props.cart?.id;
            rest?.request(verb, path, {status}).then(send).catch(onError)
        } catch (error) {
            console.log(error.message);
        }
    };

    return {update, bills, cart: props?.cart, bounds, orderProps}
}

export default useOperationView