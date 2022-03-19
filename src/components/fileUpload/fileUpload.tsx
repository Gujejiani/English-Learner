import React, {useState} from 'react'
import axios from 'axios';

import styles from './fileUpload.module.css'

const FileUpload: React.FC = ()=>{
    const [selectedFile, setSelectedFile] = useState<any>();
	const [idPdfType, setIsPdfType] = useState(true);
    const changeHandler= (e: React.ChangeEvent<any>)=>{
		if(e.target.files.length){
			if(e.target?.files[0] && e.target?.files[0].type=== "application/pdf"){
				setIsPdfType(true)
			}else{
				setIsPdfType(false)
				return
			}


			setSelectedFile(e.target.files[0]);
			console.log(e.target.files[0])	
			handleSubmission(e.target.files[0])
		}
    }
	
	

	/**
	 * 
	 * @returns extracted text from pdf
	 */
    const handleSubmission = (file: any)=>{
		const formData = new FormData()
		if(!file)return;
		formData.append('pdfFile',file)
		axios.post<{data: string}>('http://localhost:1111/extract-text', formData).then(res=>{
			console.log(res.data)
		})
	
    }


    return(
        <div className={styles.upload} >
			<input className={styles.upload__field} type="file" id='inpFile' name="file" onChange={changeHandler} />
			{ !idPdfType? <span  className={styles.upload__error} >please upload pdf type document</span>: ''}
		</div>
    )
}



export default FileUpload