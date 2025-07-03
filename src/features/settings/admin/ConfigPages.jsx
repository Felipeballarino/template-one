

import { Collapse } from "antd";
import RedesForm from "./RedesForm";
import ContactoForm from "./ContactoForm";

const ConfigPages = () => {

    const items = [
        {
            key: '1',
            label: <span className="font-semibold text-base">Aplicación</span>,
            children: <p>1</p>,
        },
        {
            key: '2',
            label: <span className="font-semibold text-base">Contacto</span>,
            children: <ContactoForm />,
        },
        {
            key: '3',
            label: <span className="font-semibold text-base">Redes</span>,
            children: <RedesForm />,
        },
    ];
    return (
        <div className=" bg-white">
            <h1 className="font-bold text-xl mb-2">Configuracion Web</h1>
            <Collapse
                items={items}
                defaultActiveKey={1}

            />

        </div>
    );
};


export default ConfigPages
