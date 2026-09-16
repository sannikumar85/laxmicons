import { useEffect } from "react";
import { FiX } from "react-icons/fi";

function Modal({
  isOpen,
  onClose,
  title = "",
  children,
  size = "medium",
  showCloseButton = true,
  closeOnOverlay = true,
  className = "",
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizes = {
    small: "max-w-md",
    medium: "max-w-2xl",
    large: "max-w-4xl",
    xlarge: "max-w-6xl",
  };

  const handleOverlayClick = (event) => {
    if (
      closeOnOverlay &&
      event.target === event.currentTarget
    ) {
      onClose?.();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[90]
        flex
        items-center
        justify-center
        p-4
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Overlay */}

      <div
        className="absolute inset-0 bg-[#071827]/60 backdrop-blur-sm"
        onMouseDown={handleOverlayClick}
      />

      {/* Modal */}

      <div
        className={`
          relative
          w-full
          ${sizes[size] || sizes.medium}
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          bg-white
          shadow-2xl
          border
          border-slate-200
          animate-modal-in
          ${className}
        `}
      >

        {/* Header */}

        {(title || showCloseButton) && (
          <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-100">

            {title ? (
              <h2
                id="modal-title"
                className="text-lg sm:text-xl font-bold text-[#0F2D4A]"
              >
                {title}
              </h2>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="
                  shrink-0
                  w-9
                  h-9
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-slate-500
                  bg-slate-100
                  hover:bg-orange-50
                  hover:text-orange-500
                  transition
                "
                aria-label="Close modal"
              >
                <FiX size={19} />
              </button>
            )}

          </div>
        )}

        {/* Body */}

        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5 sm:p-7">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;