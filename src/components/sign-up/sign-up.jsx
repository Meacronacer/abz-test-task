import { useEffect, useState } from 'react'
import { cleanData, setNewUser } from '../../Redux/slices/usersSlice'
import { useDispatch } from 'react-redux'
import styles from './sign-up.module.scss'

export const formantPhoneNumber = (number) => {
    if (!number) return '+38 (0)'
    const phoneNumber = number.replace(/[^\d]/g, '').slice(3)

    if (phoneNumber.length < 3) return `+38 (0${phoneNumber})`
    if (phoneNumber.length < 6) return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)}`
    if (phoneNumber.length < 8) return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)}`

    return `+38 (0${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5, 7)} ${phoneNumber.slice(7, 9)}`
}


const SignUp = ({ setCreated }) => {

    const dispatch = useDispatch()
    const [positionData, setPositionData] = useState([])
    const [selectedPos, setSelectedPos] = useState(1)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('+38 (0)')
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('Upload your photo')
    const [fileError, setFileErorr] = useState('')
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmaiError] = useState(false)

    useEffect(() => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then(res => res.json())
            .then(res => setPositionData(res.positions))
    }, [])


    const onSubmit = async (e) => {
        e.preventDefault()
        // eslint-disable-next-line
        if (name.length < 2 || name.length > 60) {
            setNameError(true)
            return
            // eslint-disable-next-line
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmaiError(true)
            return
        }

        const res = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        const response = await res.json()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone.replace(/[- )(]/g,''))
        formData.append('position_id', selectedPos)
        formData.append('photo', file)

        await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            headers: {
            'Token': response.token,
            },
            body: formData
        }).then(() => {
            dispatch(cleanData())
            dispatch(setNewUser(1))
            setName('')
            setEmail('')
            setPhone('+38 (0)')
            setNameError(false)
            setEmaiError(false)
            setCreated(true)
          }).catch(err => console.error(err))
        
    }

    const fileHandler = (e) => {
        if (e.target.files[0]?.name.endsWith('.jpeg') || e.target.files[0]?.name.endsWith('.jpg')) {

            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
            setFileErorr('')
        } else if (e.target.files[0]?.size > 5000000 ) {
            setFileName('Upload your photo')
            setFileErorr('Error, file is too big must been exceed 5MB')

        } else {
            setFileName('Upload your photo')
            setFileErorr('Error, only .jpg or .jpeg files!')
        }
    }

    const selection = positionData && positionData.map((item, index) => {
        return <label className={styles.radio} key={item.id}><input
                onClick={() => setSelectedPos(item.id)}
                name={item.name}
                type='radio'
                readOnly
                checked={item.id === selectedPos} />{item.name}</label>
    })



    return <div className={styles.SignUp}>
        <h1 className={styles.info}>Working with POST request</h1>
        <form className={styles.form} onSubmit={onSubmit} >
            <input onChange={(e) => setName(e.target.value)} value={name} name='name' placeholder='Your name' className={nameError ? styles.inputsError : styles.inputs}/>
            {nameError && <label className={styles.errorName}>user name, should be 2-60 characters</label>}
            <input onChange={(e) => setEmail(e.target.value)} value={email} name='email' placeholder='Email' className={emailError ? styles.inputsError : styles.inputs}/>
            {emailError && <label className={styles.errorEmail}>user email, must be a valid email according to RFC2822</label>}
            <input onChange={(e) => setPhone(formantPhoneNumber(e.target.value))} value={phone} name='phone' placeholder='Phone' className={styles.inputs}/>
            <span className={styles.phoneType} >+38 (XXX) XXX - XX - XX</span>

            <p>Select your position</p>
            <div className={styles.selectPosition}>
                {selection}
            </div>

            <div className={styles.loadFile}>
                <input onChange={(e) => fileHandler(e)} className={styles.upload} accept=".jpg, .jpeg" type="file" id="file-input" name="filename"/>
                <label className={fileError ? styles.uploadError : styles.upload} htmlFor='file-input'>Upload</label>
                <input className={fileError ? styles.uploadError2 : styles.upload2} readOnly value={fileName} />
                <span>{fileError}</span>
            </div>

            <button disabled={[!!name,!!email,!!phone,fileName !== 'Upload your photo'].includes(false)} className={styles.signUp} >Sign Up</button>
        </form>
    </div>
}

export default SignUp