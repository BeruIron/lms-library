function Button({ text, type, onClick }) {
  return (
    <>
      <button
        className={`px-8 py-3 text-white bg-slate-400 rounded-lg hover:bg-gray-600 ${type}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
export default Button;
