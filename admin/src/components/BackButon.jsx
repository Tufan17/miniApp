import { useNavigate } from "react-router-dom";
import { IoReturnUpBackOutline } from "react-icons/io5";
const BackButton = () => {
    const navigate = useNavigate();
    return <button className="bg-yellow-500 hover:bg-yellow-700 text-sm text-white px-4 py-2 rounded-xl cursor-pointer" onClick={()=>navigate(-1)}>
        <IoReturnUpBackOutline/>
    </button>
}

export default BackButton;