import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let isStudent = false;
  let isAlumni = false;
  let status = "Student";

  if (token) {
    const decoded = jwtDecode(token);
    const { accountId, email, firstName, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("ADMIN");
    isStudent = roles.includes("STUDENT");
    isAlumni = roles.includes("ALUMNI");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";
    if (isStudent) status = "Student";
    if (isAlumni) status = "Alumni";

    return { accountId, email, firstName, roles, status, isManager, isAdmin };
  }

  return {
    accountId: "",
    email: "",
    firstName: "",
    roles: [],
    isManager,
    isAdmin,
    status,
  };
};
export default useAuth;
