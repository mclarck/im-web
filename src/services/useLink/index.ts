import { useHistory, useParams } from "react-router-dom"

const useLink = () => {
    const { company, locale } = useParams<any>()
    const history = useHistory()

    const link = (path?: string) => `/${locale}/${company}${path || ""}`
    const goTo = (path: string) => history.replace(link(path))
    const pushTo = (path: string) => history.replace(link(path))

    return { link, goTo, pushTo }
}
export default useLink