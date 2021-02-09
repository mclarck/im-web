import {useParams} from "react-router-dom"
import conf from "../resources/conf"
import {Rest} from "../services/database";
import {ApolloClient} from "@apollo/client";
import cache from "../model/cache";
import usePath from "../services/usePath";
import useUrl from "../services/useUrl";

const useApp = () => {
    const {company, locale} = useParams<any>()
    const {getPath} = usePath()
    const {getUrl} = useUrl()
    const rest = new Rest({url: conf.rest.url, headers: {"IM-COMPANY": company}})
    const apollo = new ApolloClient({uri: conf.gql.url, headers: {"IM-COMPANY": company}, cache: cache})

    return {getPath, getUrl, company, locale, rest, apollo}
}

export default useApp