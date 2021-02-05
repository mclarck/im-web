import {useRouteMatch} from "react-router-dom"

const useUrl = () => {
    const {url} = useRouteMatch()
    const getUrl = (path?: string) => `${url}${path || ""}`

    return {getUrl}
}
export default useUrl