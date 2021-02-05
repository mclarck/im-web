import {useRouteMatch} from "react-router-dom"

const usePath = () => {
    const {path} = useRouteMatch()
    const getPath = (route?: string) => {
        return `${path}${route || ""}`
    }
    return {getPath}
}
export default usePath