import "react-toastify/dist/ReactToastify.css";
import { hostName, webHost } from "../../global";
const Logout = () => {
  localStorage.removeItem("data");
  window.location.replace(`${webHost}`);

  return(
    <div>

    </div>
  );
};

export default Logout;
