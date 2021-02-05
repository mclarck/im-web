import React from "react"
import useProfile from "../../controllers/useProfile"
import Register from "../register";
import style from "./style.module.css"

const Profile = (props: any) => {
    const {auth} = useProfile()
    return (
        <div className={style.Profile}>
            <Register auth={auth}/>
        </div>
    )
}

export default Profile