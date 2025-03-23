export const Card = ({ children }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">{children}</div>
    );
};

export const CardContent = ({ children }) => {
    return <div className="mt-2">{children}</div>;
};
