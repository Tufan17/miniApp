import PropTypes from 'prop-types';

const Container = ({children})=>{
    return (
        <div className="container  mx-auto bg-white p-5 shadow-xs rounded-md w-full h-full flex flex-col items-center justify-center">
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;