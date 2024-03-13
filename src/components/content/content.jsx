import styles from './content.module.scss'
import background from '../../assets/content.jpeg'

const Content = () => {
    return <div className={styles.content}>
                <img src={background} alt='content' />
                <div className={styles.info}>
                    <h1>Test assignment for front-end developer</h1>
                    <p>What defines a good front-end developer
                        is one that has skilled knowledge of HTML, CSS,
                        JS with a vast understanding of User design
                        thinking as they'll be building web interfaces with
                        accessibility in mind. They should also
                        be excited to learn, as the world of Front-End
                        Development keeps evolving.</p>
                    <button>Sign up</button>
                </div>
            </div>
}

export default Content