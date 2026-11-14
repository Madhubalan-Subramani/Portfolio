import CommonButton from "./CommonButton";

const CommonIconButton = ({ icon, name, onClick, type }) => {
  return (
    <CommonButton
      name={
        <span className="flex items-center gap-2">
          {icon}
          {name}
        </span>
      }
      onClick={onClick}
      type={type}
    />
  );
};

export default CommonIconButton;
