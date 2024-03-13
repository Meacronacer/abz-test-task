import Sucssefully from '../../assets/success-image.svg'
import styles from './registered.module.scss'

const Registered = ({setCreated}) => {
    return <div className={styles.root} >
        <h1>User successfully registered</h1>
        <img className={styles.image} src={Sucssefully} alt='succsefully' />
        <button onClick={() => setCreated(false)} >OK</button>
    </div>
}

export default Registered