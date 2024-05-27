import "react-toastify/dist/ReactToastify.css";
import { webHost } from "../global";


const AdLogout = () => {
  localStorage.removeItem("data");
  window.location.replace(`${webHost}`);
  return(
    <div>

    </div>
  );
};

export default AdLogout;
