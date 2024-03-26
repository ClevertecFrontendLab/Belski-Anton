import { Drawer } from "antd";

const SidebarTariff = () => (
    <Drawer
            title='Basic Drawer'
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
);

export default SidebarTariff;
