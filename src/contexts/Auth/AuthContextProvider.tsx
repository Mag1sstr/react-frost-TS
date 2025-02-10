import { createContext, useState } from "react";
import axios from "axios";

// type StateContextType = {
//   orderNumber: {
//     orderNumber: number | null;
//   };
//   newOrder: (
//     phone: string,
//     area: string,
//     city: string,
//     street: string,
//     house: string,
//     apartment: string
//   ) => void;
// };
interface IAuthContext {
  newOrder: (
    phone: string,
    area: string,
    city: string,
    street: string,
    house: string,
    apartment: string
  ) => void;
  orderNumber: number | null;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface IChildren {
  children: React.ReactNode;
}
export default function AuthContextProvider({ children }: IChildren) {
  //   const [tokenInfo, setTokenInfo] = useState(localStorage.getItem("token"));
  //   const [user, setUser] = useState(null);

  const [orderNumber, setOrderNumber] = useState(null);

  // useEffect(() => {
  //    if (tokenInfo) {
  //       axios.defaults.headers.common["Authorization"] = "Bearer " + tokenInfo
  //       axios
  //          .post("https://frost.runtime.kz/api/auth/user", {}, {})
  //          .then((resp) => {
  //             console.log(resp)
  //             setUser(resp.data)
  //          })
  //    }
  // }, [tokenInfo])

  // function signIn(username, password) {
  //    axios
  //       .post("https://frost.runtime.kz/api/auth/token", {
  //          username: username,
  //          password: password,
  //       })
  //       .then((resp) => {
  //          setTokenInfo(resp.data.access_token)
  //          localStorage.setItem("token", resp.data.access_token)
  //       })
  //       .catch(() => {
  //          // setRequestError(!requestError)
  //       })
  // }
  function newOrder(
    phone: string,
    area: string,
    city: string,
    street: string,
    house: string,
    apartment: string
  ) {
    axios
      .post("https://frost.runtime.kz/api/orders", {
        phone,
        area,
        city,
        street,
        house,
        apartment,
      })
      .then((resp) => {
        console.log(resp);
        setOrderNumber(resp.data);
      });
  }

  // Почитать про HTTP заголовки и как их отправлять через axios, отдельно ознакомиться с заголовком Authorization.

  return (
    <AuthContext.Provider
      value={{
        //   user: user,
        //   setUser: setUser,
        //   signIn: signIn,
        // signOut: null,
        //   token: tokenInfo,
        //   setTokenInfo: setTokenInfo,
        newOrder: newOrder,
        orderNumber: orderNumber,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
