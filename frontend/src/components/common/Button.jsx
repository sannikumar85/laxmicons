import { forwardRef } from "react";
import { FiLoader, FiArrowRight } from "react-icons/fi";

const Button = forwardRef(
  (
    {
      children,
      type = "button",
      variant = "primary",
      size = "medium",
      loading = false,
      disabled = false,
      icon = null,
      iconPosition = "right",
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500 shadow-sm hover:shadow-lg hover:shadow-orange-500/20",

      secondary:
        "bg-[#0F2D4A] text-white hover:bg-[#0a2238] focus-visible:ring-[#0F2D4A] shadow-sm hover:shadow-lg",

      outline:
        "border border-slate-300 bg-white text-[#0F2D4A] hover:border-orange-500 hover:text-orange-500 focus-visible:ring-orange-500",

      light:
        "bg-orange-50 text-orange-600 hover:bg-orange-100 focus-visible:ring-orange-500",

      ghost:
        "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-orange-500 focus-visible:ring-slate-400",

      danger:
        "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
    };

    const sizes = {
      small: "min-h-9 px-3.5 text-sm rounded-lg",
      medium: "min-h-11 px-5 text-sm rounded-xl",
      large: "min-h-13 px-6 sm:px-7 text-base rounded-xl",
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        className={`
          inline-flex
          items-center
          justify-center
          gap-2
          font-semibold
          whitespace-nowrap
          select-none
          outline-none
          transition-all
          duration-200
          ease-out
          focus-visible:ring-2
          focus-visible:ring-offset-2
          active:scale-[0.98]
          disabled:pointer-events-none
          disabled:cursor-not-allowed
          disabled:opacity-60
          ${variants[variant] || variants.primary}
          ${sizes[size] || sizes.medium}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      >
        {loading ? (
          <>
            <FiLoader
              size={17}
              className="animate-spin"
              aria-hidden="true"
            />

            <span>Loading...</span>
          </>
        ) : (
          <>
            {iconPosition === "left" && icon}

            <span>{children}</span>

            {iconPosition === "right" && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;