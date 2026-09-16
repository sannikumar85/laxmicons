import { FiLoader } from "react-icons/fi";

function Loader({
  fullScreen = false,
  size = "medium",
  text = "",
}) {
  const sizes = {
    small: 18,
    medium: 28,
    large: 40,
  };

  const iconSize = sizes[size] || sizes.medium;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
            <FiLoader
              size={iconSize}
              className="animate-spin"
            />
          </div>

          {text && (
            <p className="text-sm font-medium text-slate-600">
              {text}
            </p>
          )}

        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center py-10"
      role="status"
      aria-label={text || "Loading"}
    >
      <div className="flex flex-col items-center gap-3">

        <FiLoader
          size={iconSize}
          className="animate-spin text-orange-500"
        />

        {text && (
          <p className="text-sm text-slate-500">
            {text}
          </p>
        )}

      </div>
    </div>
  );
}

export default Loader;