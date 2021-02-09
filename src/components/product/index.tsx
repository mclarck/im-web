import useProduct from "../../controllers/useProduct";
import {useLocale} from "im-hooks";
import {Article} from "im-ui-core";
import translations from "../../resources/translations";
import React from "react";

const Product = (props: any) => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale);
    const {article, product, descriptions} = useProduct(props);
    return (
        <Article
            {...article}
            details={{
                ...product,
                descriptions,
            }}
            readonly={props.readonly}
            onClick={props.onClick}
            onSelect={props.onSelect}
            buyText={t("Buy")}
            selectText={t("Add to Cart")}
        />
    );
};

export default Product;
