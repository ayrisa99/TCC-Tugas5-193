export const Button = ({ children, variant = "primary", size = "md", ...props }) => {
    const baseStyles = "rounded-lg px-4 py-2 font-semibold transition";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        info: "bg-cyan-500 text-white hover:bg-cyan-600",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };
    const sizes = {
        sm: "text-sm px-3 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-5 py-3",
    };
    
    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
            {...props}
        >
            {children}
        </button>
    );
};
