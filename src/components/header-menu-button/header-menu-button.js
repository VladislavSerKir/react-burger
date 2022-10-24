import headerMenuButtonStyles from './header-menu-button.module.css';
import PropTypes from 'prop-types';

function HeaderMenuButton({ children, path }) {
    return (
        <a href={path} className={headerMenuButtonStyles.link}>
            {children}
        </a>
    )
}

HeaderMenuButton.propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default HeaderMenuButton;