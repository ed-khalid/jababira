import { useState } from "react"


export interface Props {
    name:string
    property:string
    collection:any[]
    output:any
}


enum SortDirection {
    ASCENDING, DESCENDING
} 

export const SortableColumn = ({name,property,collection, output}:Props) => {

    const [sortDirection, setSortDirection] = useState<SortDirection>(SortDirection.ASCENDING)   


    const sort = ()  => {
        const newCollection = [...collection] 
        newCollection.sort((a,b) => {

            let aVal = a[property]  
            let bVal = b[property]  

            if (property.includes(".")) {
                const props = property.split(".")
                const parentProp = props[0]   
                const childProp = props[1]   
                aVal = a[parentProp][childProp] 
                bVal = b[parentProp][childProp] 
            }

            if (aVal < bVal) {
                if (sortDirection == SortDirection.DESCENDING) {
                  return -1;
                } else {
                    return 1;
                }
            }
            if (aVal > bVal) {
                if (sortDirection == SortDirection.DESCENDING) {
                  return 1;
                } else {
                    return -1;
                }
            }
            return 0;
        })
        const newSortDirection = sortDirection == SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING; 
        setSortDirection(newSortDirection)
        output(newCollection)
    }  



    return (<th>
        <div onClick={()=>sort()}>{name}</div>
    </th>)
}