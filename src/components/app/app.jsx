import { useState } from "react"
import CardsList from "../cards-list/cards-list"
import Content from "../content/content"
import Header from "../header/header"
import SignUp from "../sign-up/sign-up"
import styles from './app.module.scss'
import Registered from "../registered/registered"

const App = () => {

    const [created, setCreated] = useState(false)

    return <div className={styles.app}>
                <Header/>
                <Content/>
                <CardsList/>
                {created ? <Registered setCreated={setCreated} />
                         : <SignUp setCreated={setCreated}/>}
           </div>
}


export default App