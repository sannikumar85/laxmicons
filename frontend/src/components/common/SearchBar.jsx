import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  className = "",
}) {
  const [focused, setFocused] = useState(false);

  const handleChange = (event) => {
    onChange?.(event.target.value);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange?.("");
    }
  };

  return (
    <div
      className={`
        relative
        w-full
        transition-all
        duration-200
        ${focused ? "scale-[1.01]" : ""}
        ${className}
      `}
    >

      {/* Search icon */}

      <FiSearch
        size={19}
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          pointer-events-none
        "
      />

      {/* Input */}

      <input
        type="search"
        value={value ?? ""}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="
          w-full
          h-12
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-11
          pr-11
          text-sm
          text-slate-800
          placeholder:text-slate-400
          outline-none
          transition
          duration-200
          focus:border-orange-400
          focus:ring-4
          focus:ring-orange-500/10
          shadow-sm
        "
      />

      {/* Clear */}

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-lg
            flex
            items-center
            justify-center
            text-slate-400
            hover:bg-slate-100
            hover:text-slate-700
            transition
          "
          aria-label="Clear search"
        >
          <FiX size={17} />
        </button>
      )}

    </div>
  );
}

export default SearchBar;