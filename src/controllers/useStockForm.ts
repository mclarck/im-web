import {useLocale, useMerger, useSanitizer} from "im-hooks";
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/client";
import {RestClient} from "../services/database";
import {GET_PROVIDERS} from "../model/provider/queries";

const useStockForm = (props: any) => {
    const {t} = useLocale();
    const def = props.defaultValue
    const {register, handleSubmit, setValue, getValues, reset} = useForm();
    const {sanitize} = useSanitizer();
    const {parseDate, mergeProvider} = useMerger({setValue, getValues});
    const [file, setFile] = useState<any>();
    const [notice, notify] = useState<any>();
    const [loadingStock, setLoadingStock] = useState<boolean>(false);
    const [loadProv, {
        loading: loadingProv,
        data: providers,
        error: errorProv
    }] = useLazyQuery(GET_PROVIDERS, {fetchPolicy: "network-only"})
    const rest = useContext(RestClient)

    useEffect(() => {
        loadProv()
        reset();
    }, [loadProv, reset]);

    if (errorProv) console.log(errorProv.message)
    const handleProv = (e: any) => mergeProvider(e, providers?.providers?.edges);
    const submit = async (data: any) => {
        setLoadingStock(true)
        try {
            data = sanitize(data)
            if (data?.quantity === 0) return null;
            const verb = def ? "PUT" : "POST"
            const path = def ? def.id : "/api/stocks"
            const res = await rest?.request(verb, path, data)
            props.onCreate && props.onCreate(res)
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoadingStock(false)
        }
    };
    return {
        t,
        notice,
        notify,
        loading: loadingProv || loadingStock,
        setFile,
        file,
        handleProv,
        parseDate,
        handleSubmit,
        submit,
        register
    }
}
export default useStockForm