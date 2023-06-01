import { Link } from "react-router-dom";

import Button from "./Button";
import Avatar from "./Avatar";

export default function Navbar({ user, onLogout }) {
    return (
        <header className="bg-white neo-shadow-navbar h-16">
            <nav className="h-full flex items-center justify-between wrapper">
                <Link to={'/'} className="logo">Jobs</Link>

                <ul className="flex items-center gap-4">
                    {Object.keys(user).length === 0 ? (
                        <>
                            <li>
                                <Link to={'/signup'}>
                                    <Button title='Sign up' ghost />
                                </Link>
                            </li>
                            <li>
                                <Link to={'/login'}>
                                    <Button title='Login' />
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="flex items-center gap-2">
                                <Button title='Logout' secondary onClick={onLogout} />
                                <div className="avatar">
                                    <Link to={user.role === 'Company' ? `/company/${user.id}` : `/user/${user.id}`}>
                                        <Avatar user={user} />
                                    </Link>
                                </div>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
