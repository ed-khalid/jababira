import { useState } from "react";
import './Dropzone.css'

interface Props {
    children:any
    handleDrop:any
}

export const Dropzone =  ({children, handleDrop }:Props) => {

    const [highlight,SetHighlight] = useState<boolean>(false); 

    const onDragOver =  (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }   
    return <div className={"dropzone" + ((highlight) ? ' active' : '')}
                     onDragEnter={ e => SetHighlight(true)}
                     onDragLeave={ e => SetHighlight(false)}
                     onDragOver={e => onDragOver(e) } 
                     onDrop={e => handleDrop() }
    >
        {children}
    </div>

}