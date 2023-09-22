import { Link } from "react-router-dom";

export default function NavBar(props: any) {
  const { signedIn } = props
  return (
    <header className="flex justify-between items-center">
      <Link to={"/"} className=" bg-emerald-400 text-lg font-bold p-1 text-white rounded">Currency Pulse</Link>
      {
        signedIn ?
          <div className="flex items-center gap-5"><Link to={"/sign-in"} className=" bg-emerald-400 text-lg font-bold p-1 text-white rounded" onClick={() => { localStorage.removeItem("token") }}>Sign out</Link></div>
          : <div className="flex items-center gap-5">
            <Link to={"/sign-up"} className=" bg-emerald-400  text-lg font-bold p-1 text-white rounded">Sign Up</Link>
            <Link to={"/sign-in"} className=" bg-emerald-400  text-lg font-bold p-1 text-white rounded">Sign In</Link>
          </div>
      }
    </header>
  )
}