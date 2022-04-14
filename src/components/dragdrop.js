import { useRef } from "react";
import { useEffect } from "react";

const DragandDrop = (props) =>{
    const URL = "http://localhost:8000/api/";

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

        ([...files]).forEach( file =>  UploadFile(file))
        console.log(selectGroup)
        selectGroup.current.style.display = "block";

        box.current.classList.remove('highlight')
    }

    const UploadFile = (file) => {

        let data = new FormData()
        console.log(file)
        data.append('image', file)

        fetch(URL + 'convert/', {
            method: 'POST',
            mode: 'cors',
            body: data
        })
        .then(res => console.log(res.json()))
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

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

    return (
        <form method="post" action="" className="box"
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
        onDragEnter={e => handleDragEnter(e)}
        onDragLeave={e => handleDragLeave(e)}
        ref={box}>
            <div className="box__input">
            <svg className="box__icon" xmlns="http://www.w3.org/2000/svg" width="50" height="43" viewBox="0 0 50 43"><path d="M48.4 26.5c-.9 0-1.7.7-1.7 1.7v11.6h-43.3v-11.6c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v13.2c0 .9.7 1.7 1.7 1.7h46.7c.9 0 1.7-.7 1.7-1.7v-13.2c0-1-.7-1.7-1.7-1.7zm-24.5 6.1c.3.3.8.5 1.2.5.4 0 .9-.2 1.2-.5l10-11.6c.7-.7.7-1.7 0-2.4s-1.7-.7-2.4 0l-7.1 8.3v-25.3c0-.9-.7-1.7-1.7-1.7s-1.7.7-1.7 1.7v25.3l-7.1-8.3c-.7-.7-1.7-.7-2.4 0s-.7 1.7 0 2.4l10 11.6z"></path></svg>
                <input className="box__file" id="file" type="file"></input>
                <label htmlFor="file"><strong>Choose file </strong>or drag it here.</label>
                <div className="box__upload">
                <span className="selectGroup" ref={selectGroup}>
                    <label htmlFor="select">Select Artistic Style</label>
                    <select id="select" name="style" ref={select}>
                    </select>

                <button className="box__btn">Upload</button>
                </span>
                </div>
            </div>
        </form>
    )
}

export default DragandDrop
