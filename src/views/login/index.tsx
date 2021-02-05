import React from "react";
import useLogin from "../../controllers/useLogin";
import style from "./style.module.css";
import {Field, Button, Loader} from "im-ui-core";
import {MdPerson, MdPhone} from "react-icons/md";

const Login = (props: any) => {
    const {t, error, loading, goTo, handleSubmit, submit, register} = useLogin(props);
    return (
        <div className={style.Login}>
            <div className={style.login}>
                <form className={style.form} onSubmit={handleSubmit(submit)}>
                    <div className={style.field}>
                        <Field label={t("Username or Email")} error={error?.login} iconRight={<MdPerson/>}>
                            <input type="text" ref={register} name="login"/>
                        </Field>
                    </div>
                    <div className={style.field}>
                        <Field label={t("Phone")} iconRight={<MdPhone/>}>
                            <input type="text" ref={register} name="phone"/>
                        </Field>
                    </div>
                    <div className={style.submit}>
                        <Button type="submit" theme="light">
                            {t("Login")}
                        </Button>
                    </div>
                    <div className={style.submit}>
                        <Button onClick={() => goTo("/register")}>{t("Register")}</Button>
                    </div>
                </form>
            </div>
            {loading && <Loader/>}
        </div>
    );
};
export default Login;
