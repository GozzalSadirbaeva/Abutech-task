import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import instance from "../api/api";

type AuthContextType = {
  login: string | null;
  token: string;
  signIn: (p: any) => void;
};

const AuthContext = createContext<AuthContextType>({
  login: "",
  token: "",
  signIn: () => console.log("123"),
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const [user, setUser] = useState<string>(storedUser?.login);
  const [token, setToken] = useState(storedUser?.token || "");
  const navigate = useNavigate();

  const signIn = async (data: any) => {
    await instance
      .post("api/staff/auth/sign-in", {
        login: data.username,
        password: data.password,
      })
      .then(function (response) {
        console.log(response.data);
        setUser(data.username);
        setToken(response.data.data.accessToken);

        console.log({
          login: data.username,
          token: response.data.data.accessToken,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            login: data.username,
            token: response.data.data.accessToken,
          })
        );

        navigate("/contract");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ login: user, token, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
