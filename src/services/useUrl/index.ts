import {useRouteMatch} from "react-router-dom"

const useUrl = () => {
    const {url} = useRouteMatch()
    const getUrl = (path?: string) => {
        let uri = url
        if (url) {
            if (url.charAt(url.length - 1) === "/") {
                uri = url.substring(0, url.length - 1)
            }
        }
        return `${uri}${path || ""}`
    }
    return {getUrl}
}
export default useUrl