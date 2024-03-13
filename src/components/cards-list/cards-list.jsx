import styles from './cards-list.module.scss'
import CardItem from '../card-item/card-item'
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoading, setCurrentPage, setData } from '../../Redux/slices/usersSlice' 

const CardsList = () => {

    const {data, isLoading, currentPage, totalPage, newUser} = useSelector(state => state.usersSlice)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(true))
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${currentPage}&count=6`)
        .then(response => response.json())
        .then((res) => dispatch(setData(res)))
        .then(() => dispatch(setLoading(false)))
        .catch(err => console.error(err))
        // eslint-disable-next-line
    }, [currentPage, newUser])

    const users = data && data.map(item => <CardItem key={item.id} {...item} />)

    return <div className={styles.cardBody}>
                <h1 className={styles.getInfo}>Working with GET request</h1>
                <div className={styles.cards}>
                    {isLoading ? <div className={styles.spinner}>
                        <ClipLoader color="#36d7b7" size={300} />
                    </div> : users}
                </div>
                {currentPage !== totalPage && <button onClick={() => dispatch(setCurrentPage(currentPage + 1))} className={styles.showmore} >Show more</button>}
           </div>
}

export default CardsList