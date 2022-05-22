import React from "react";
import styles from './favourites.module.css'
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { AiTwotoneStar } from "@react-icons/all-files/ai/AiTwotoneStar";
import { IconContext } from "@react-icons/all-files";
import { PropsFn } from "../../models";
export const Favorites: React.FC<{addedToHardWords: PropsFn, hardWord: boolean}> = (props) =>{
   

 
    return (
        <div onClick={props.addedToHardWords} className={styles.favorites} >
            
         
            <IconContext.Provider   value={{ color: '#ffc402', size: '50px' }} >
          {
              
        !props.hardWord? <AiOutlineStar  className={styles.icon} size='2em'/> : <AiTwotoneStar className={styles.icon}  size='2em'/> 
            }  
              
            </IconContext.Provider>
          
        </div>
    )
}



export default Favorites