import headerMenuButtonStyles from './header-menu-button.module.css';

function HeaderMenuButton({ children, path }) {
    return (
        <a href={path} className={headerMenuButtonStyles.link}>
            {children}
        </a>
    )
}
export default HeaderMenuButton;