import React from "react";
import useOperationView from "../../controllers/useOperationView";
import {Cart} from "im-ui-core";
import {MdClose, MdMotorcycle} from "react-icons/md"
import {RiShoppingCart2Line} from "react-icons/ri"

const OperationView = (props: any) => {
    const { update, bills, cart, bounds, orderProps } = useOperationView(props)
    return (
        <Cart
            bounds={bounds}
            address={cart?.client?.address}
            orders={orderProps}
            actions={[
                {icon: <MdClose/>, onClick: () => update("canceled")},
                {icon: <MdMotorcycle/>, onClick: () => update("shipping")},
            ]}
            billing={{bills}}
            icon={<RiShoppingCart2Line/>}
            title={`#${cart._id} - ${cart?.client?.address?.apt} ${cart?.client?.address?.street}, ${cart?.client?.address?.number} ${cart?.client?.username}`}
            subtitle={`${cart?.client?.phone} ${cart?.client?.email || ""}`}
            amount={cart?.amount}
        />
    );
}

export default OperationView