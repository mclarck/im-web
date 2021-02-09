import React from "react";
import useOperationView from "../../controllers/useOperationView";
import {Cart} from "im-ui-core";
import {RiShoppingCart2Line} from "react-icons/ri"
import {BiListCheck} from "react-icons/bi"
import {GrFormTrash} from "react-icons/gr"
import {GiCheckeredFlag} from "react-icons/gi"
import {MdClose, MdMotorcycle} from "react-icons/md";

const OperationView = (props: any) => {
    const {update, bills, status, cart, bounds, orderProps} = useOperationView(props)
    const actions = []

    switch (status) {
        case "shipping":
            actions.push(
                {icon: <MdClose/>, onClick: () => update("canceled")},
                {icon: <BiListCheck/>, onClick: () => update("completed")},
                {icon: <GiCheckeredFlag/>, onClick: () => update("arrived")},
            )
            break;
        case "completed":
            actions.push(
                {icon: <GrFormTrash/>, onClick: () => update("removed")},
                {icon: <MdMotorcycle/>, onClick: () => update("shipping")},
            )
            break;
        case "removed":
            actions.push(
                {icon: <MdMotorcycle/>, onClick: () => update("shipping")},
            )
            break;
        default:
            actions.push(
                {icon: <MdClose/>, onClick: () => update("canceled")},
                {icon: <GrFormTrash/>, onClick: () => update("removed")},
                {icon: <MdMotorcycle/>, onClick: () => update("shipping")},
            )
            break
    }
    return (
        <Cart
            bounds={bounds}
            address={cart?.client?.address}
            orders={orderProps}
            actions={actions}
            billing={{bills}}
            icon={<RiShoppingCart2Line/>}
            title={`#${cart._id} - ${cart?.client?.address?.apt} ${cart?.client?.address?.street}, ${cart?.client?.address?.number} ${cart?.client?.username}`}
            subtitle={`${cart?.client?.phone} ${cart?.client?.email || ""}`}
            amount={cart?.amount}
        />
    );
}

export default OperationView