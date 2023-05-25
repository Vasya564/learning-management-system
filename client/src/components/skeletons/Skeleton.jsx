import './Skeleton.scss'

const Skeleton = ({ classes }) => {
    const classNames = `skeleton ${classes} animate-pulse`

    return <div className={classNames}></div>
}
export default Skeleton