function Button({ type, onClick, children }) {
  return (
    <button
      className={`
    ${type === "primary" && "hover:bg-white hover:text-black text-white bg-black"}
    ${type === "secondary" && "bg-white hover:bg-black text-black hover:text-white"}
    font-bold py-2.75 px-5.25 border-2 border-black cursor-pointer w-fit
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
