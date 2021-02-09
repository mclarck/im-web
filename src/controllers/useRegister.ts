import {useForm} from "react-hook-form"
import {useLocale} from "im-hooks"
import useLink from "../services/useLink"
import {useCallback, useContext, useEffect, useState} from "react"
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {RestClient} from "../services/database";
import translations from "../resources/translations";
import {useParams} from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import {GET_SETTING} from "../model/setting/queries";

const useRegister = (auth?: any) => {
    const {locale} = useParams<any>()
    const {t} = useLocale(translations, locale)
    const {goTo, link} = useLink()
    const [fetch, {
        loading: loadingSetting,
        data: setting,
        error: errorSetting
    }] = useLazyQuery(GET_SETTING, {fetchPolicy: "network-only"});
    const bounds = setting?.setting?.bounds
    const loadSetting = useCallback(() => fetch({variables: {id: "/api/settings/1"}}), [fetch])
    const {register, handleSubmit} = useForm()
    const [preview, setPreview] = useState<any>(auth?.address?.location)
    const [error, setError] = useState<any>({})
    const [data, setData] = useState<any>({})
    const [confirmed, setConfirm] = useState<boolean>(false)
    const [registered, setRegistered] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const rest = useContext(RestClient)

    const isAddress = (address: any) => address?.street && address?.number
    const isUser = (user: any) => user?.username && user?.phone

    const onError = (e: any) => console.log(e.message)
    const checkAddress = async (address: any) => {
        try {
            const provider = new OpenStreetMapProvider();
            let query = `${address?.number} ${address?.street} ${address?.city}`;
            const res = await provider.search({query});
            return res[0]
        } catch (error) {
            onError(error)
        }
    }
    const submit = async (fData: any) => {
        setLoading(true)
        setError({})
        try {
            const location: any = await checkAddress(fData.address)
            if (!location) return setError({address: {street: t('Invalid address!')}})
            setPreview((preview: any) => preview = location)
            setConfirm(false)
            fData.address.id = auth?.address?.id
            fData.address.location = {
                id: auth?.address?.location?.id,
                x: location.x,
                y: location.y,
                label: location.label
            }
            setData((data: any) => data = fData)
        } catch (error) {
            onError(error)
        } finally {
            setLoading(false)
        }
    }
    const confirm = async () => {
        if (!isAddress(data?.address)) return setError({address: {street: t('Invalid address!')}})
        if (!isUser(data)) return setError({username: t('Invalid user!')})
        setLoading(true)
        try {
            const verb = auth ? "PUT" : "POST";
            const path = auth ? auth.id : "/api/clients"
            const res = await rest?.request(verb, path, data)
            if (!res.ok) return setError({username: t('Something is wrong!')})
            setConfirm(true)
            if (!auth) setRegistered(true)
        } catch (error) {
            onError(error)
        } finally {
            setLoading(false)
            setPreview(null)
        }
    }
    const onclose = () => {
        setPreview(null)
        setConfirm(false)
    }
    const resetAddress = () => {
        setPreview(null)
        setConfirm(false)
    }

    useEffect(() => {
        loadSetting();
    }, [loadSetting]);
    if(errorSetting) onError(errorSetting)
    return {
        t,
        bounds,
        checkAddress,
        isUser,
        isAddress,
        link,
        error,
        registered,
        resetAddress,
        loading: loading || loadingSetting,
        preview,
        confirm,
        confirmed,
        onclose,
        goTo,
        submit,
        register,
        handleSubmit
    }
}

export default useRegister