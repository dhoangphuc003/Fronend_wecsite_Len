import { Drawer } from "antd"

const DrawerComponent = ({ title = 'Drawer',children, placement = 'right', isOpen = false, ...rests }) => {
    return (
        <>
            <Drawer title={title} placement={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}
    
    export default DrawerComponent;