const useValidator = () => {
    const isMail = (email: string) => {
        return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    }
    return { isMail }
}

export default useValidator