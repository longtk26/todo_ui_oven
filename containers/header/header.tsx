import Profile from "@/components/profile/profile";

const Header = async () => {
    return (
        <header className="w-full h-16 bg-white border-b border-gray-200 shadow-lg fixed indent-0">
            <div className="max-w-[1200px] mx-auto flex items-center justify-between h-full px-4">
                <h2 className="font-bold text-cyan-500 uppercase">Todo app</h2>

                <Profile />
            </div>
        </header>
    );
};

export default Header;
