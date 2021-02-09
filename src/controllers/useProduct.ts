import {useFile, useLocale} from "im-hooks"

const useProduct = (props: any) => {
    const {t} = useLocale()
    const stock = props.stock
    const mode = props.mode
    const file = useFile()
    const product = stock?.product || {}
    const article: any = {
        img: "http://" + file.url(stock?.file),
        limit: stock?.avQuantity,
        dataType: "stock",
        data: stock
    }
    let descriptions = `${product?.variety || ""} ${product?.container || ""}`
    if (mode === "stock") descriptions = `${stock.quantityAv || 0}/${stock.quantity || 0} ${t("from")} ${stock.entry?.provider?.name} ${descriptions}`
    return {article, product, descriptions}
}

export default useProduct