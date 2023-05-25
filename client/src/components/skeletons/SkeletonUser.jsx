import Skeleton from './Skeleton';
import './Skeleton.scss'

const SkeletonUser = () => {
    return (
        <div className="user">
            <div>
                <Skeleton classes="photo"/>
            </div>
            <Skeleton classes="name"/>
            <Skeleton classes="email"/>
            <Skeleton classes="group"/>
            <Skeleton classes="role"/>
            <div className="skeleton__action">
                <Skeleton classes="button"/>
            </div>
        </div>
    );
}
 
export default SkeletonUser;