
import { CiFilter } from "react-icons/ci";
import PropTypes from 'prop-types';

const FilterButton = ({filter, setFilter, children}) => {
    FilterButton.propTypes = {
        filter: PropTypes.bool.isRequired,
        setFilter: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired
    };
    return (
        <div className="relative inline-block text-left">
        <div className={`flex items-center p-2 rounded-xl bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all duration-300 ${filter ? 'bg-gray-200' : ''}`} onClick={() => setFilter(!filter)}>
          <CiFilter className="text-2xl text-gray-500 cursor-pointer" />
          <p className="text-sm text-gray-500 cursor-pointer">Filtrele</p>
        </div>
        <div>
        {filter && <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden p-4"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
                {children}

            </div>}

        </div>
    

    </div>
    )
}

export default FilterButton;