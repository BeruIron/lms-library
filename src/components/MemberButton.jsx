function Button({ text, type, onClick }) {
  return (
    <>
      <button
        className={`px-8 py-2 text-white bg-slate-400 my-3 rounded hover:bg-gray-600 ${type}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
export default Button;
