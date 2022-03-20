import React, {useState} from 'react'




import styles from './fileUpload.module.css'

const FileUpload: React.FC<{fileUploaded: (val: File)=> File | void}> = (props)=>{
    
	const [idPdfType, setIsPdfType] = useState(true);
    const changeHandler= (e: React.ChangeEvent<HTMLInputElement>)=>{
		const form =e.target as HTMLInputElement


	
		if(form.files &&  form.files.length){

			const file = form.files[0]
			if(file && file.type=== "application/pdf"){
				setIsPdfType(true)
			}else{
				setIsPdfType(false)
				return
			}


		
			console.log(file)	
			props.fileUploaded(file)
		}
    }
	
	


    return(
        <div className={styles.upload} >
			<input className={styles.upload__field} type="file" id='inpFile' name="file" onChange={changeHandler} />
			{ !idPdfType? <span  className={styles.upload__error} >please upload pdf type document</span>: ''}
		</div>
    )
}



export default FileUpload