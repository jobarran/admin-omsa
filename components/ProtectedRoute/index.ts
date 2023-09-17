import { useContext } from "react";
import { AuthContext } from "@/context/auth";

//check if you are on the client (browser) or server
const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children }: any) => {
  //Identify authenticated user
  const { user, isLoggedIn } = useContext( AuthContext );
  const isAuthenticated = isLoggedIn;

  let unprotectedRoutes = [
    "/auth/login",
  ];

  /**
   * @var pathIsProtected Checks if path exists in the unprotectedRoutes routes array
   */
  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected) {
    router.push("/auth/login");
  }

  return children;
};

export default ProtectedRoute;