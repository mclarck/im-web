import React from "react";
import {Alert, Button, Field, ImagePicker, Loader} from "im-ui-core";
import style from "./style.module.css";
import moment from "moment";
import useStockForm from "../../controllers/useStockForm";

const StockForm = (props: any) => {
    const {
        t,
        notice,
        notify,
        loading,
        setFile,
        file,
        handleProv,
        parseDate,
        handleSubmit,
        submit,
        register
    } = useStockForm(props)

    return (
        <form className={style.stockForm} onSubmit={handleSubmit(submit)}>
            <div className={style.fields}>
                <div className="hidden">
                    <input
                        defaultValue={props.defaultValue?.product?.id}
                        ref={register}
                        type="hidden"
                        name="product.id"
                    />
                    <input
                        defaultValue={props.defaultValue?.entry?.id}
                        ref={register}
                        type="hidden"
                        name="entry.id"
                    />
                    <input
                        defaultValue={props.defaultValue?.entry?.provider?.id}
                        type="hidden"
                        name="entry.provider.id"
                        ref={register}
                    />
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Sent at")}>
                        <input
                            type="text"
                            onBlur={parseDate}
                            ref={register}
                            placeholder="DD/MM/YYYY"
                            defaultValue={
                                props.defaultValue?.entry?.sent || moment().format("L")
                            }
                            name="entry.sent"
                        />
                    </Field>
                    <Field label={t("Stocked at")}>
                        <input
                            type="text"
                            ref={register}
                            placeholder="DD/MM/YYYY"
                            defaultValue={
                                props.defaultValue?.entry?.stocked || moment().format("L")
                            }
                            onBlur={parseDate}
                            name="entry.stocked"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Branch")}>
                        <input type="text" ref={register} name="entry.branch"/>
                    </Field>
                    <Field label={t("Receipt Number")}>
                        <input type="text" ref={register} name="entry.receipt"/>
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-3"]}`}>
                    <Field label={t("Provider Alias")}>
                        <input
                            type="text"
                            ref={register}
                            name="entry.provider.alias"
                            defaultValue={props.defaultValue?.entry?.provider?.alias}
                            onBlur={handleProv}
                        />
                    </Field>
                    <Field label={t("Provider Name")}>
                        <input
                            type="text"
                            ref={register}
                            name="entry.provider.name"
                            defaultValue={props.defaultValue?.entry?.provider?.name}
                            onBlur={handleProv}
                        />
                    </Field>
                    <Field label={t("Provider Ref")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.entry?.provider?.ref}
                            name="entry.provider.ref"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Provider Phone")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.entry?.provider?.phone}
                            name="entry.provider.phone"
                        />
                    </Field>
                    <Field label={t("Provider Email")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.entry?.provider?.email}
                            name="entry.provider.email"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Specie")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.product?.specie}
                            name="product.specie"
                        />
                    </Field>
                    <Field label={t("Mark")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.product?.mark}
                            name="product.mark"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Variety")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.product?.variety}
                            name="product.variety"
                        />
                    </Field>
                    <Field label={t("Container")}>
                        <input
                            type="text"
                            ref={register}
                            defaultValue={props.defaultValue?.product?.container}
                            name="product.container"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-3"]}`}>
                    <Field label={t("Quantity")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.quantity}
                            name="quantity"
                        />
                    </Field>
                    <Field label={t("Price")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.price}
                            name="price"
                        />
                    </Field>
                    <Field label={t("Cost")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.cost}
                            name="cost"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-2"]}`}>
                    <Field label={t("Shipping")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.shipping}
                            name="shipping"
                        />
                    </Field>
                    <Field label={t("Shipping Additional")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={
                                props.defaultValue && props.defaultValue?.shippingAdditional
                            }
                            name="shippingAdditional"
                        />
                    </Field>
                </div>
                <div className={`${style.field} ${style.grid} ${style["grid-1-3"]}`}>
                    <Field label={t("Tax")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.tax}
                            name="tax"
                        />
                    </Field>
                    <Field label={t("Discount")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.discount}
                            name="discount"
                        />
                    </Field>
                    <Field label={t("Old Price")}>
                        <input
                            type="text"
                            ref={register({valueAsNumber: true})}
                            defaultValue={props.defaultValue?.oldPrice}
                            name="oldPrice"
                        />
                    </Field>
                </div>
                <div className={style.submit}>
                    <Button theme="dark" type="submit">
                        {t("Create Stock")}
                    </Button>
                </div>
            </div>
            <div className={style.filepicker}>
                <ImagePicker onChange={setFile}/>
                <input
                    type="hidden"
                    name="file.content"
                    defaultValue={file?.content}
                    ref={register}
                />
                <input
                    type="hidden"
                    ref={register}
                    name="file.mime"
                    defaultValue={file?.mime}
                />
                <input
                    type="hidden"
                    ref={register}
                    name="file.size"
                    defaultValue={file?.size}
                />
                <input
                    type="hidden"
                    ref={register}
                    name="file.ext"
                    defaultValue={file?.ext}
                />
            </div>
            {loading && <Loader/>}
            {notice?.message && (
                <Alert
                    onClose={() => notify(null)}
                    onCancel={() => notify(null)}
                    onClick={() => notify(null)}
                >
                    <div style={{lineHeight: "3rem"}}>{notice.message}</div>
                </Alert>
            )}
        </form>
    );
};

export default StockForm;
