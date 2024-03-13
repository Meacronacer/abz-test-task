import styles from './card-item.module.scss'
import { formantPhoneNumber } from '../sign-up/sign-up';

const CardItem = ({name, email, phone, position, photo}) => {
    return <div className={styles.card}>
                <div className={styles.cardInner}>
                    <div style={{height: '90px'}}>
                         <img src={photo} alt='avatar'/>
                    </div>
                    <div className={styles.userInfo}>
                         <div className={styles.name}>{name}
                              <span className={styles.tooltiptext}>{name}</span>
                         </div>
                         <p>{position}</p>
                         <div className={styles.pos}>
                              {email} <br/>
                              <span style={{top: '110%'}} className={styles.tooltiptext}>{email}</span>
                         </div>
                         <p> {formantPhoneNumber(phone)}</p> 
                    </div>
                </div>
           </div>
}

export default CardItem;