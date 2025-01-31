const Header = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  return (<div className='md:w-full  flex justify-between items-center w-full w-min-[350px]' >
    <div className='text-xl sm:text-2xl font-bold'>Word Soup</div>
    <div className='flex flex-col items-end'>
    <div className='text-sm sm:text-base font-bold'>{user?.name +' '+ user?.surname}</div>
   <div className='text-xs sm:text-sm text-gray-500'>
    {user?.email}
   </div>
    </div>
  </div>
  );
};

export default Header;
