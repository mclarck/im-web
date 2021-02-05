import { useHistory, useParams } from "react-router-dom"

const useLink = () => {
    const { company } = useParams<any>()
    const history = useHistory()

    const link = (path?: string) => `/${company}${path || ""}`
    const goTo = (path: string) => history.replace(link(path))
    const pushTo = (path: string) => history.replace(link(path))

    return { link, goTo, pushTo }
}
export default useLink