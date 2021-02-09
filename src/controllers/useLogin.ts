import {useForm} from "react-hook-form"
import {useLocale} from "im-hooks"
import useLink from "../services/useLink"
import {useContext, useState} from "react"
import {RestClient, Store} from "../services/database"
import useValidator from "../services/validator"
import {useParams} from "react-router-dom";
import translations from "../resources/translations";

const useLogin = (arg?: any) => {
    const {locale} = useParams<any>()
    const {t, lang} = useLocale(translations, locale)
    const {company} = useParams<any>()
    const {goTo} = useLink()
    const {register, handleSubmit} = useForm()
    const rest = useContext(RestClient)
    const {isMail} = useValidator()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>({})
    const store = new Store(company)

    const submit = async (data: any) => {
        setLoading(true)
        setError({})
        try {
            const res = await rest?.request("POST", "/security/client", prepare(data))
            if (!res.ok) return setError({login: t("Client not found!")})
            const json = await res.json()
            json.id = "/api/clients/" + json.id
            delete json.operations
            store.setVal("auth", json)
            if (arg.onLogged) arg.onLogged()
        } catch (error) {
            console.log(error.message)
            return setError({login: t("An error has occured!")})
        } finally {
            setLoading(false)
        }
    }

    const prepare = (data: any) => {
        if (isMail(data?.login)) {
            data.email = data?.login
        } else {
            data.username = data?.login
        }
        delete data?.login
        return data
    }

    return {t, error, loading, goTo, submit, register, handleSubmit}
}

export default useLogin