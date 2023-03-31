import './Home.scss'
import { BsFillChatTextFill } from 'react-icons/bs'

const Home = () => {
    return (
        <> 
            {/* Page header with filter */}
            <header className='content__header'>
                <h1>Мої курси</h1>
                <select>
                    <option>Всі статуси</option>
                    <option>Активні</option>
                    <option>Завершені</option>
                    <option>Повторний курс</option>
                </select>
            </header>
            {/* Courses wrapper and courses */}
            <section className='content__courses'>
                <div className='content__course'>
                    <div className='content__course__status'>
                        <BsFillChatTextFill />
                        <p>Активний</p>
                    </div>
                    <div className='content__course__main'>
                        <div className='content__course__header'>
                            <div>
                                <h3>Назва курсу</h3>
                                <p>Спеціалізація</p>
                            </div>
                            <button>Перейти до курсу</button>
                        </div>
                        <div className='content__course__footer'>
                            <hr />
                            <div className='content__course__teacher'>
                                {/* <img /> */}
                                <div></div>
                                <p>Шевченко Тарас</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Home;