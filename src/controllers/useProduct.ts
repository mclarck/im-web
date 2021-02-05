import { useFile } from "im-hooks"
const useProduct = (stock: any) => {
    const file = useFile()
    const product = stock?.product || {}
    const article: any = { img: "http://"+file.url(stock?.file), limit: stock?.avQuantity, dataType: "stock", data: stock }
    const descriptions = `${product?.variety || ""} ${product?.container || ""}`

    return { article, product, descriptions }
}

export default useProduct