const SIZES = {
  small: "w-4 h-4",
  medium: "w-8 h-8",
  large: "w-12 h-12",
  xLarge: "w-16 h-16",
};
export const LoadingIndicator = ({ size }) => {
  return (
    <div>
      <div
        className={`${SIZES[size]} rounded-[50%] border-8 border-red-700 border-t-red-300 animate-spin `}
      ></div>
    </div>
  );
};
