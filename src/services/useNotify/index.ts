const useNotification = () => {
    const check = () => {
        try {
            Notification.requestPermission().then()
        } catch (e) {
            return false
        }
        return false
    }
    const send = (perm: 'denied' | 'granted' | 'default', msg: any) => {
        if (perm === "granted") new Notification(msg.id, msg)
    }
    const notify = (msg: { id: string, title?: string, body: string }) => {
        if (!('Notification' in window)) {
            console.log('unsupported notification api')
        } else {
            if (check()) {
                Notification.requestPermission().then((permission) => send(permission, msg))
            } else {
                Notification.requestPermission((permission) => send(permission, msg))
            }
        }
    }
    return {notify}
}

export default useNotification