export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">MealNUS</a>
            <ul>
                <li><a href="/userLogin">User Login</a></li>
                <li><a href="/staffLogin">Staff Login</a></li>
                <li><a href="/retrieveAllUsers">Retrieve All Users</a></li>
            </ul>
        </nav>
    )
}