
import './Slider.css'

interface Props {
    input:number;
    output:(newValue:number) => void;
}

export const Slider =  ({input, output}:Props) => {
    return <div className="slider">
        <hr className="slider-line"></hr>
        <input type="range" value={input} min={0} step={0.1} max={5} onChange={e => output(Number(e.target.value)) }/>
        <div className="slider-knob">
            {input}
        </div>
    </div> 
}