import { Link } from "react-router-dom";

function LoginSelection() {
  return (
    <div className="flex items-center justify-center h-[35rem]">
      <div className="bg-white rounded-xl shadow-2xl p-12 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Choose Login Type</h1>
        <p className="text-center text-lg text-gray-600 mb-8">Select your login option below:</p>
        
        <div className="flex flex-col gap-6">
          <Link
            to="/applicant/login"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-lg font-semibold text-xl text-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Login as User
          </Link>
          
          <Link
            to="/recruiter/login"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-lg font-semibold text-xl text-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Login as Recruiter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginSelection;
