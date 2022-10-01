import headerMenuButtonStyles from './header-menu-button.module.css';

function HeaderMenuButton(props) {
    return (
        <button className={headerMenuButtonStyles.button} type='button' >
            {props.children}
        </button>
    )
}
export default HeaderMenuButton;