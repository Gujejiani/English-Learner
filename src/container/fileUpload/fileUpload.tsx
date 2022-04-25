import React, {useState} from 'react'




import styles from './fileUpload.module.css'

const FileUpload: React.FC<{fileUploaded: (val: File)=> File | void}> = (props)=>{
    
	const [isPdfType, setIsPdfType] = useState(true);
    const changeHandler= (e: React.ChangeEvent<HTMLInputElement>)=>{
		const form =e.target as HTMLInputElement


		// 1) check if file uploaded and it's in pdf format
		if(form.files &&  form.files.length){
			const file = form.files[0]
		// 2) check if file is in pdf format
			if(file && file.type=== "application/pdf"){
				setIsPdfType(true)
			}else{
				setIsPdfType(false)
				return
			}


			props.fileUploaded(file)
		}
    }
	
	


    return(
        <div className={styles.upload} >
			<input className={styles.upload__field} type="file" id='inpFile' name="file" onChange={changeHandler} />
			{ !isPdfType? <span  className={styles.upload__error} >please upload pdf type document</span>: ''}
		</div>
    )
}



export default FileUpload