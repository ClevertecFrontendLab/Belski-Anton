import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { v4 as uuidv4 } from 'uuid';

interface IBreadcrumbItem {
    path?: string;
    name: string;
}

interface IBreadcrumbProps {
    items: IBreadcrumbItem[];
}

const Breadcrumbs = ({ items }: IBreadcrumbProps) => (
        <Breadcrumb>
            {items.map((el) => (
                <Breadcrumb.Item key={uuidv4()}>
                    {el?.path ? <Link to={`../../${el.path}`}>{el.name}</Link> : el.name}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );

export default Breadcrumbs;
