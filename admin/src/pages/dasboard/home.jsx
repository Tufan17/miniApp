const HomePage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className="w-full h-full min-h-150 flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-500">Hoşgeldiniz {user?.name} {user?.surname}</h1>
        </div>
    )
}
export default HomePage;