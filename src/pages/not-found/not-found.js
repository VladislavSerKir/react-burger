import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import notFoundStyles from './not-found.module.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className={`${notFoundStyles.notFound}`}>
            <Link to='/'>
                <Logo />
            </Link>
            <h2 className={`text text_type_main-large mt-10 mb-8 ${notFoundStyles.notFound_title}`}>Страница не найдена</h2>
            <h3 className={`mb-6 text text_type_main-medium ${notFoundStyles.text}`} >Ошибка 404</h3>
            <Link to='/' className={`text text_type_main-default ${notFoundStyles.link}`}>
                На главную
            </Link>
        </div >
    )
}