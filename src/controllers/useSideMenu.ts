import {useParams, useRouteMatch} from "react-router-dom";
import useUrl from "../services/useUrl";
import useLink from "../services/useLink";

const useSideMenu = () => {
    const {company} = useParams<any>()
    const {getUrl} = useUrl()
    const {goTo} = useLink()
    const {url} = useRouteMatch()


    return {company, url, goTo, getUrl}
}

export default useSideMenu