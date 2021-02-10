import {useRouteMatch} from "react-router-dom"

const useUrl = () => {
    const {url} = useRouteMatch()
    const getUrl = (path?: string) => {
        let uri = (url && url.charAt(url.length-1) ==="/") ? url.substring(0,url.length-1): url
        return `${uri}${path || ""}`
    }
    return {getUrl}
}
export default useUrl