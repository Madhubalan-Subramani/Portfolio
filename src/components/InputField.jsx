export const InputField = ({ type = "text", name, placeholder, required = false }) => {
  const inputClass =
    "w-full px-4 py-2 rounded border border-[#8749f2] text-xs lg:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8749f2]/50";

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      className={inputClass}
    />
  );
};


export const TextareaField = ({ name, placeholder, rows = 4 }) => {
  const inputClass =
    "w-full px-4 py-2 rounded border border-[#8749f2] text-xs lg:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#8749f2]/50";

  return (
    <textarea
      name={name}
      placeholder={placeholder}
      rows={rows}
      className={inputClass}
    ></textarea>
  );
};

