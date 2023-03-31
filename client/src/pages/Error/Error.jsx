import './Error.scss'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'

const Error = () => {
    return (
        <div className='error__wrapper'>
            <BsFillExclamationTriangleFill size={'3rem'}/>
            <h1 className='error__mssg'>Такої сторінки не існує</h1>
        </div>
    );
}
 
export default Error;