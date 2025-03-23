export const Table = ({ children }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">{children}</table>
        </div>
    );
};

export const TableHead = ({ children }) => {
    return (
        <thead className="bg-gray-200">
            {children}
        </thead>
    );
};

export const TableRow = ({ children }) => {
    return (
        <tr className="border-b hover:bg-gray-100">{children}</tr>
    );
};

export const TableCell = ({ children, className = "" }) => {
    return (
        <td className={`p-3 text-gray-700 ${className}`}>{children}</td>
    );
};

export const TableBody = ({ children }) => {
    return <tbody>{children}</tbody>;
};
