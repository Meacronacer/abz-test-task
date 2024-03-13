import styles from './header.module.scss'
import Logo from '../../assets/logo.svg'


const Header = () => {
    return <div className={styles.header}>
                <div className={styles.headerInner}>
                    <img src={Logo} alt='logo' />
                    <div className={styles.buttons}>
                        <button>Users</button>
                        <button>Sign up</button>
                    </div>
                </div>
           </div>
}


export default Header