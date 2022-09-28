import menuHomeStyles from './menu-home.module.css';

function HeaderMenuButton(props) {
    return (
        <button className={menuHomeStyles.menuHome} type='button' >
            {props.children}
        </button>
    )
}
export default HeaderMenuButton;