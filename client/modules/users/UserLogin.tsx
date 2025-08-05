interface UserLoginProps {
  name: string;
  email: string;
  isAdmin: boolean;
}

export const UserLogin = ({ name, email, isAdmin }: UserLoginProps) => {
  return (
    <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center">
      <h2 className="text-black text-4xl"> {name}</h2>
      <h3 className="text-black text-3xl"> {email}</h3>
      <h4 className="text-black text-2xl">
        {" "}
        {isAdmin ? "Admin" : "Notnhave admin access"}
      </h4>
      <span className="text-white text-xl underline">Under development..</span>
    </div>
  );
};
