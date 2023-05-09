import styles from './about.module.css'
import { Link } from 'react-router-dom';



const About: React.FC = ()=>{
return<div
className={styles.wrapper}
>

<div className={styles.welcome}>
<h4>Welcome to PDF Vocabulary Learner,
 this application Promotes and simplifies knowledge
 consolidation from the dictionary </h4>
 <p>what this app about ? --- you had to cover Georgian or English translation in dictionary to check your knowledge and which is not really comfortable, same applies with pdf</p>
 <p>solution ? --- you can upload vocabulary pdf file, if you study in CallAn School, aplication will give possibility to choose lesson from which you want to practice and  you no longer need to cover Georgian or English translation in dictionary to check your knowledge</p>
<Link to={'form'} style={{'textDecoration': 'none'}} ><button role="button" className={styles.button}>Start</button></Link> 
</div>

</div>
}


export default About