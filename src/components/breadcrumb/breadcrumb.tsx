import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface IBreadcrumbItem {
    path?: string;
    name: string;
}

interface IBreadcrumbProps {
    items: IBreadcrumbItem[];
}

const Breadcrumbs = ({ items }: IBreadcrumbProps) => {
    return (
        <Breadcrumb>
            {items.map((el, idx) => (
                <Breadcrumb.Item key={idx}>
                    {el?.path ? <Link to={`../../${el.path}`}>{el.name}</Link> : el.name}
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
