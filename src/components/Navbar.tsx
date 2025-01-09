import { Button } from "./Button";

export const Navbar = () => {
  return (
    <header className="z-50 flex justify-between items-center py-3 px-12 w-screen text-[#1D4634]">
        <div>
            <ul className="flex items-center justify-start space-x-0.5 text-sm font-medium">
                <li className="px-4 py-1.5 flex items-center justify-center cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative">About Us</li>
                <li className="px-4 py-1.5 flex items-center justify-center cursor-pointer rounded-full before:w-0 before:transition-all before:ease-in-out before:duration-200 before:hover:w-[70%] before:bg-[#1D4634] before:h-[1px] before:rounded-full before:absolute before:bottom-0 relative">Contact Us</li>
            </ul>
        </div>
        <h1 className="font-semibold text-lg">City Gate Advenchar</h1>
        <div className="flex items-center justify-end">
            <Button size="md">
                Book Now
            </Button>
        </div>
    </header>
  )
};