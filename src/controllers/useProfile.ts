import {useEffect} from "react"
import {useLocale} from "im-hooks";
import {useLazyQuery} from "@apollo/client";
import {GET_CLIENT} from "../model/client/queries";
import {Store} from "../services/database";
import {useParams} from "react-router-dom";

const useProfile = ()=>{
    const {t} = useLocale()
    const {company} = useParams<any>()
    const [getClient, {data: auth, loading: loadingClient, error: errorClient}]: any = useLazyQuery(GET_CLIENT);

    useEffect(() => {
        const store = new Store(company)
        const item = store.getVal("auth")
        getClient({variables: {id: item?.id}})
    }, [getClient])

    if(errorClient) console.log(errorClient.message)
    return { t, auth: auth?.client, loading: loadingClient}
}

export default useProfile