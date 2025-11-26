import logo from "../assets/Chef.png"

export default function Header(){
    return(
        <header>
            <img src={logo} alt="logo" />
            <h1>Chef-Bot</h1>
        </header>
    )
}