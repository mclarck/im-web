import useProduct from "../../controllers/useProduct";
import {useLocale} from "im-hooks";
import {Article} from "im-ui-core";
import translations from "../../resources/translations";

const Product = (props: any) => {
    const {t} = useLocale(translations);
    const {article, product, descriptions} = useProduct(props.stock);
    return (
        <Article
            {...article}
            details={{
                ...product,
                descriptions,
            }}
            onSelect={props.onSelect}
            buyText={t("Buy")}
            selectText={t("Add to Cart")}
        />
    );
};

export default Product;
