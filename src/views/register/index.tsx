import React from "react";
import style from "./style.module.css";
import {Button, Field, Loader} from "im-ui-core";
import useRegister from "../../controllers/useRegister";
import Map from "../../components/map";
import {MdLocationOn, MdMail, MdPerson, MdPhone} from "react-icons/md";
import AfterRegister from "./after";

const Register = (props: any) => {
    const {
        t,
        error,
        registered,
        resetAddress,
        loading,
        goTo,
        preview,
        confirm,
        confirmed,
        onclose,
        register,
        handleSubmit,
        submit,
    } = useRegister(props.auth);
    if (registered) return <AfterRegister/>;
    return (
        <div className={style.Register}>
            <div className={style.register}>
                <form className={style.form} onSubmit={handleSubmit(submit)}>
                    <div className={style.field}>
                        <Field
                            label={t("Username")}
                            error={error?.username}
                            iconRight={<MdPerson/>}
                        >
                            <input type="text" name="username" ref={register} defaultValue={props?.auth?.username}/>
                        </Field>
                    </div>
                    <div className={`${style.field} ${style["grid-2"]}`}>
                        <Field label={t("Email")} iconRight={<MdMail/>}>
                            <input type="text" name="email" ref={register} defaultValue={props?.auth?.email}/>
                        </Field>
                        <Field label={t("Phone")} iconRight={<MdPhone/>}>
                            <input type="text" name="phone" ref={register} defaultValue={props?.auth?.phone}/>
                        </Field>
                    </div>
                    <div className={style.field}>
                        <Field
                            label={t("Street")}
                            iconRight={<MdLocationOn/>}
                            error={error?.address?.street}
                        >
                            <input
                                type="text"
                                name="address.street"
                                ref={register}
                                onBlur={resetAddress}
                                defaultValue={props?.auth?.address?.street}
                            />
                        </Field>
                    </div>
                    <div className={`${style.field} ${style["grid-3"]}`}>
                        <Field label={t("Street Number")}>
                            <input
                                type="text"
                                name="address.number"
                                ref={register}
                                onBlur={resetAddress}
                                defaultValue={props?.auth?.address?.number}
                            />
                        </Field>
                        <Field label={t("Apt")}>
                            <input
                                type="text"
                                name="address.apt"
                                ref={register}
                                onBlur={resetAddress}
                                defaultValue={props?.auth?.address?.apt}
                            />
                        </Field>
                        <Field label={t("City")}>
                            <input
                                type="text"
                                defaultValue="CABA, Argentina"
                                name="address.city"
                                readOnly
                                ref={register}
                            />
                        </Field>
                    </div>
                    <div className={style.submit}>
                        <Button type="submit" theme="light">
                            {props.auth ? t("Update") : t("Register")}
                        </Button>
                    </div>
                    {!props.auth &&
                    <div className={style.submit}>
                        <Button onClick={() => goTo("/login")}>{t("Login")}</Button>
                    </div>}
                </form>
            </div>
            {preview && !confirmed && (
                <Map
                    address={{location: preview}}
                    onconfirm={confirm}
                    onclose={onclose}
                />
            )}
            {loading && <Loader/>}
        </div>
    );
};
export default Register;
