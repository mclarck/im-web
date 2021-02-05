import useProduct from "../../controllers/useProduct";
import { useLocale } from "im-hooks";
import { Article } from "im-ui-core";

const Product = (props: any) => {
  const { t } = useLocale();
  const { article, product, descriptions } = useProduct(props.stock);
  return (
    <Article
      {...article}
      details={{
        ...product,
        descriptions,
      }}
      onSelect={props.onSelect}
      button={t("Add to cart")}
    />
  );
};

export default Product;
