import { useRef,useState } from "react";
import { useEffect } from "react";
// import axios from 'axios';
import Loader from './loader/loader';
import "./dragdrop.css";
// import result from "./result/result";

const DragandDrop = (props) =>{

    const [show,setShow] = useState(false)
    const [showDragDrop,setShowDragDrop] = useState(true)
    const [showDrag,setShowDrag] = useState(true)
    const [showLoading,setShowLoading] = useState(false)
    const [imageFile,setImageFile] = useState()
    const [result,setResult] = useState()
    

    // const URL = "http://localhost:8000/static/image_name";  
    // const URL = "http://65.2.52.246:8000/api/";
    const URL = " http://e960-157-33-246-1.ngrok.io/api/";

    const box = useRef()
    const selectGroup = useRef();
    const select = useRef();


    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        box.current.classList.add('highlight')

    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        box.current.classList.remove('highlight')
        
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        box.current.classList.add('highlight')
        
    }



    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        let dt = e.dataTransfer;
        let files = dt.files;
        // console.log(files)
        ([...files]).forEach( file =>  setImageFile(file) )
        // console.log(files.name);
            // console.log(selectGroup)
        
        selectGroup.current.style.display = "block";

        box.current.classList.remove('highlight')
        setShowDrag(false);

    }



    // const UploadFile = (file) => {
    //     console.log(select.current.value)

        // let data = new FormData()
        // console.log(file)
        // data.append('image', file)

        // fetch(URL + 'convert/', {
        //     method: 'POST',
        //     mode: 'cors',
        //     body: data 
        // })
        // .then(res => console.log(res.json()))
        // .then(result => console.log(result))
        // .catch(err => console.log(err))
        // console.log("done");
        
        
    // }


    const getStyles = () => {

        select.current.length = 0;

        fetch(URL + 'convert/', {
            method: 'GET'
        })
        .then(resp => resp.json())
        .then(result => {
            result.styles.forEach(style => {
                let option = document.createElement('option');
                option.innerHTML = style
                option.value = style
                select.current.add(option)
            }) 

        })
    }






    useEffect(
        () => {
            getStyles()

        }
    )






     const submithandler=(e)=>{
        e.preventDefault();
       
        let data = new FormData()
        
        console.log(select.current.value) 
        console.log(imageFile)

        data.append('image', imageFile)
        data.append('style', select.current.value)

        fetch(URL + 'convert/', {
            method: 'POST',
            mode: 'cors',
            body: data 
        })
        .then(res => res.json())
        .then(result => {
            setResult(result)
            // let check = result.result
            // console.log(check);
            setShow(true);
        })
        .catch(err => console.log(err))  
    
        setShowDragDrop(false);
        setShowLoading(true);
        
    }





    const downloadHandler = (e) =>{
        // e.preventDefault();
        console.log("Downloaded");
        let img = result.result
        console.log(img)
        // fetch({
        //         method: "get",
        //         mode: 'cors',
        //         url: "http://65.2.52.246:8000/static/convert_img/"+img,
        // })
		// 	.then(response => {
        //         // setShow(true);
		// 		response.blob().then(blob => {
		// 			let url = window.URL.createObjectURL(blob);
		// 			let a = document.createElement('a');
		// 			a.href = url;
		// 			a.download = img;
		// 			a.click();
		// 		});
		// 		//window.location.href = response.url;
		// });
        
            fetch({
                method: "get",
                mode: 'cors',
                url: "http://65.2.52.246:8000/static/convert_img/"+img,
        })
            .then(response => response.blob())
            .then(imageBlob => {
                // Then create a local URL for that image and print it 
                const imageObjectURL = global.URL.createObjectURL(imageBlob);
                console.log(imageObjectURL);
                let a = document.createElement('a');
				a.href = imageObjectURL;
				a.download = img;
				a.click();
            });

    }






    return (
        <form method="post" action="" className="box"
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
        ref={box}>
            <div className="box__input">
                
            {
                   showDrag ?
                        <div>
                            <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
                            <input className="box__file" id="file" type="file"></input>
                            <label htmlFor="file"><strong>Choose file </strong>or drag it here.</label>
                            
                        </div>
                        
                    : null
               }
               <div className="box__upload">
               
               <span className="selectGroup" ref={selectGroup}>
               
               {
                   showDragDrop ?
                   <div>   
                        <label htmlFor="select">Select Artistic Style</label>
                   </div>
                
                   :    <label htmlFor="select">Click below to download your </label>
                }
                   
                   <select id="select" name="style" ref={select}></select>
                

                   <label htmlFor="select"> photo.</label>
                   
               {
                   showDragDrop ?  
                    <div>
                        {/* <button className="box__btn" onClick={e => submithandler(e)}>Upload</button> */}
                        
                        <div className="buttons">
                            <button className="blob-btn" onClick={e => submithandler(e)}>
                                Upload
                                <span className="blob-btn__inner">
                                <span className="blob-btn__blobs">
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                    <span className="blob-btn__blob"></span>
                                </span>
                                </span>
                            </button>
                            <br/>

                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
                                <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                                </filter>
                            </defs>
                            </svg>
                            </div>
                    </div>
               : null
               }
               </span>
               
               {
                   show ?  
                   
                //    <button className="box__btn" onClick={downloadHandler}>Download</button> 
             
             <div className='button'>
        
                        <input id='button' type='checkbox' onClick={downloadHandler}/>
                        
                        <label htmlFor='button'>
                            <div className='button_inner q'>
                            <i className='l ion-log-in'></i>
                            <span className='t'>Download</span>
                            <span>
                                <i className='tick ion-checkmark-round'></i>
                            </span>
                            <div className='b_l_quad'>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                                <div className='button_spots'></div>
                            </div>
                            </div>
                        </label>
                        </div>
                                        
                   :
                   
                       showDragDrop ? null : <Loader></Loader> 
                   
                   
               }
                </div>
            </div>
        </form>
    )
}

export default DragandDrop
