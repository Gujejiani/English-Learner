import React, {useState} from 'react'
import axios from 'axios';

import styles from './fileUpload.module.css'

const FileUpload: React.FC = ()=>{
    const [selectedFile, setSelectedFile] = useState<any>();
	const [_isFilePicked, setIsFilePicked] = useState(false);
    const changeHandler= (e: React.ChangeEvent<any>)=>{
		if(e.target.files.length){

			setSelectedFile(e.target.files[0]);
			console.log(e.target.files[0])
			setIsFilePicked(true);
		}
    }
	
	

	/**
	 * 
	 * @returns extracted text from pdf
	 */
    const handleSubmission = ()=>{
		const formData = new FormData()
		if(!selectedFile)return;
		formData.append('pdfFile',selectedFile)
		axios.post<{data: string}>('http://localhost:1111/extract-text', formData).then(res=>{
			console.log(res.data)
		})
	
    }


    return(
        <div className={styles.upload} >
			<input className={styles.upload__field} type="file" id='inpFile' name="file" onChange={changeHandler} />

		</div>
    )
}



export default FileUpload