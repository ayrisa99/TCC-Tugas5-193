// Input.jsx
const Input = ({ id, type = "text", value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Input;
