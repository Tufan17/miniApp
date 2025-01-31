import PropTypes from 'prop-types';

const CustomButton = ({ children, onClick = () => {}, type = 'button', disabled = false }) => {
    CustomButton.propTypes = {
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        type: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    };

    return (
        <button type={type} onClick={disabled ? () => {} : onClick} className={`bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-xl cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {children}
        </button>
    )
}

export default CustomButton;