import { Link, Outlet } from "react-router-dom"


export const AdminPage = () => {
    return (
        <div>
            <div id="admin-menu" className="ribbon-menu">
                <ul>
                    <li>
                        <Link to={'players'}>Players</Link>
                    </li>
                </ul>
            </div>
            <div id="admin-main">
                <Outlet></Outlet>
            </div>
        </div>
    )

}