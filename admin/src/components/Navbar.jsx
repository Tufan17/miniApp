import { SiWebauthn } from "react-icons/si";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { MdOutlineContentPaste } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
const Navbar = () => {
    const location = useLocation();
    const list =[
        {
            title: "Roller",
            icon: <SiWebauthn size={25} />,
            path: "/dashboard/roles",
        },
        {
            title: "Kullanıcılar",
            icon: <FaRegUser size={25} />,
            path: "/dashboard/users",
        },
        {
          title: "CEFR",
          icon: <GrLanguage size={20} />,
          path: "/dashboard/cefr",
      },
        {
            title: "Seviyeler",
            icon: <GiLevelThreeAdvanced size={25} />,
            path: "/dashboard/levels",
        },
        {
            title: "İçerikler",
            icon: <MdOutlineContentPaste size={25} />,
            path: "/dashboard/content",
        },
    ];
    const [active, setActive] = useState(0);

    useEffect(() => {
        const activeIndex = list.findIndex(item => location.pathname.includes(item.path));
        setActive(activeIndex);
    }, [location]);

  
  return (
    <div className='w-full flex flex-col justify-between items-center'>
      {list.map((item, index) => (
        <Link to={item.path} key={index} className={`w-full flex items-center justify-start p-2 ${active === index ? 'bg-blue-500 text-white rounded-md' : ''}`}>
                {item.icon}
            <div className='ml-2 text-sm font-bold'>{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
