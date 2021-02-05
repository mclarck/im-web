import {useForm} from "react-hook-form"
import {useLocale} from "im-hooks"
import useLink from "../services/useLink"
import {useContext, useState} from "react"
import {OpenStreetMapProvider} from "leaflet-geosearch";
import {RestClient} from "../services/database";

const useRegister = (auth?: any) => {
    const {t} = useLocale()
    const {goTo, link} = useLink()
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

    const checkAddress = async (address: any) => {
        try {
            const provider = new OpenStreetMapProvider();
            let query = `${address?.number} ${address?.street} ${address?.city}`;
            const res = await provider.search({query});
            return res[0]
        } catch (error) {
            console.log(error.message)
        }
    }

    const submit = async (fdata: any) => {
        setLoading(true)
        setError({})
        try {
            const location: any = await checkAddress(fdata.address)
            if (!location) return setError({address: {street: t('Invalid address!')}})
            setPreview((preview: any) => preview = location)
            setConfirm(false)
            fdata.address.id = auth?.address?.id
            fdata.address.location = { id: auth?.address?.location?.id, x: location.x, y: location.y, label: location.label}
            setData((data: any) => data = fdata)
        } catch (error) {
            console.log(error.message)
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
            if(!auth) setRegistered(true)
        } catch (error) {
            console.log(error.message)
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

    return {
        t,
        checkAddress,
        isUser,
        isAddress,
        link,
        error,
        registered,
        resetAddress,
        loading,
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