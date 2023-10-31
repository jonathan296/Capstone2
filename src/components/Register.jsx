import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const Navigate = useNavigate();
  const [token, setToken] = useState(null)  
  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')
  const cohortName = '2302-acc-pt-web-pt-b';
  const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}/`;

  
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${APIURL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: userName,
            password: userPass
          }
        })
      });
      const result = await response.json();
// You can log ▲▲▲ the result
// here ▼▼▼ to view the json object before returning it
      console.log(result)
      if(!result.success){alert(result.error.message)}else{alert(result.data.message)}
      setToken(result.data.token)
      return result
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(
    ()=>{
        if(token){
            Navigate('/')
        }

    },[token])

    function handleUsername(e) {
      
       setUserName(e.target.value)
       
    }
    function handlePassword(e) {
      
      setUserPass(e.target.value)
      
   }

  return (
    <div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={registerUser}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleUsername}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={handlePassword}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <div
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            <Link to='/login'>Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
