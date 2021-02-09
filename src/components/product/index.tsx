import useProduct from "../../controllers/useProduct";
import {useLocale} from "im-hooks";
import {Article} from "im-ui-core";
import translations from "../../resources/translations";
import {useParams} from "react-router-dom";

const Product = (props: any) => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale);
    const {article, product, descriptions} = useProduct(props.stock);
    return (
        <Article
            {...article}
            details={{
                ...product,
                descriptions,
            }}
            onSelect={props.onSelect}
            selectText={t("Add to Cart")}
        />
    );
};

export default Product;
