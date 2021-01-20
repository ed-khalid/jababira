import { Dispatch, SetStateAction } from "react"
import './AttributeSelector.css'



interface Props {
    name:string
    get:number
    set:Dispatch<SetStateAction<number>>;
}

export const AttributeSelector = ({name, get, set}:Props) => {

    return <div className="attribute-selector-wrapper">
        {[1,2,3,4,5].map(it => <div key={'checkbox-'+name+'-'+it} className="checkbox-wrapper">
            <label className="checkbox-label" htmlFor={name + '-' + it }>{it}</label>
            <input id={name+'-'+it} type="checkbox" checked={get==it} onChange={() => set(it)} name={name} value={it}></input>
         </div> )}
    </div>

}
