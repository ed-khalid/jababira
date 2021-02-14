import './Card.css'

export interface CardProps {
    header:string;
    footer?:string;
    children:any;
}


export const Card = ({children, header, footer}:CardProps) => {
    return <div className="card">
        <div className="card-header">{header}</div>
        <div className="card-body">
            {children}
        </div>
        {footer && <div className="card-footer">
            {footer}
        </div>}
    </div>
} 
