import {Button, Field, ImagePicker, Loader} from "im-ui-core";
import React from "react";
import style from "./style.module.css";
import useSettingForm from "./useSettingForm";

const SettingForm = (props: any) => {
    const {handleSubmit, submit, register, t, loading} = useSettingForm(props)
    return (
        <form className={style.form} onSubmit={handleSubmit(submit)}>
            <div>
                <input type="hidden" name="id" defaultValue={props.setting?.id}/>
            </div>
            <div className={style.fields}>
                <div className={style.imagePicker}>
                    <ImagePicker/>
                </div>
                <div className={style.field}>
                    <div className={style["grid-1-2"]}>
                        <Field label={t("Name")}>
                            <input
                                type="text"
                                name="name"
                                defaultValue={props.setting?.name}
                                ref={register}
                            />
                        </Field>
                        <Field label={t("Alias")}>
                            <input
                                type="text"
                                name="alias"
                                defaultValue={props.setting?.alias}
                                ref={register}
                            />
                        </Field>
                    </div>
                </div>
                <div className={style.field}>
                    <div className={style["grid-1-3"]}>
                        <Field label={t("Street Number")}>
                            <input
                                type="text"
                                name="address.number"
                                defaultValue={props.setting?.address?.number}
                                ref={register}
                            />
                        </Field>
                        <Field label={t("Street")}>
                            <input
                                type="text"
                                name="address.street"
                                defaultValue={props.setting?.address?.street}
                                ref={register}
                            />
                        </Field>
                        <Field label={t("City")}>
                            <input
                                type="text"
                                name="address.city"
                                defaultValue={props.setting?.address?.city}
                                ref={register}
                            />
                        </Field>
                    </div>
                </div>
                <div className={style.field}>
                    <Field label={t("Page title")}>
                        <input
                            type="text"
                            name="title"
                            defaultValue={props.setting?.title}
                            ref={register}
                        />
                    </Field>
                </div>
                <div className={style.field}>
                    <Field label={t("Description")}>
                        <input
                            type="text"
                            name="description"
                            defaultValue={props.setting?.description}
                            ref={register}
                        />
                    </Field>
                </div>
                <div className={style.field}>
                    <div className={style["grid-1-2"]}>
                        <Field label={t("Open Time")}>
                            <input
                                type="text"
                                name="openTime"
                                defaultValue={props.setting?.openTime}
                                ref={register}
                            />
                        </Field>
                        <Field label={t("Closed Time")}>
                            <input
                                type="text"
                                name="closeTime"
                                defaultValue={props.setting?.closeTime}
                                ref={register}
                            />
                        </Field>
                    </div>
                </div>
                <div className={style.field}>
                    <Field label={t("Open Days")}>
                        <input
                            type="text"
                            name="openDays"
                            defaultValue={props.setting?.openDays}
                            ref={register}
                        />
                    </Field>
                </div>
                <div className={style.field}>
                    <div className={style["grid-1-2"]}>
                        <Field label={t("Email")}>
                            <input
                                type="text"
                                name="emails"
                                defaultValue={props.setting?.emails?.join(";")}
                                ref={register}
                            />
                        </Field>
                        <Field label={t("Phone")}>
                            <input
                                type="text"
                                name="phones"
                                defaultValue={props.setting?.phones?.join(";")}
                                ref={register}
                            />
                        </Field>
                    </div>
                </div>
                <div className={style.field}>
                    <Field label={t("Country")}>
                        <input
                            type="text"
                            name="country"
                            defaultValue={props.setting?.country}
                            ref={register}
                        />
                    </Field>
                </div>
                <div className={style.field}>
                    <Field label={t("Area")}>
            <textarea
                name="bounds"
                defaultValue={props.setting?.bounds}
                ref={register}
            />
                    </Field>
                </div>
            </div>
            <div className={style.field}>
                <Button type="submit" theme="light">
                    {t("Save")}
                </Button>
            </div>
            {loading && <Loader/>}
        </form>
    );
};

export default SettingForm;
