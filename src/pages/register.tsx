import { useState } from "react";

function Register() {
  let [count, setCount] = useState<number>(10);
  return (
    <div className="Login">
      <h1>Register</h1>
    </div>
  );
}

export default Register;
