import CommonButton from "./CommonButton";

const withIcon = (WrappedComponent) => {
  return function IconEnhancedButton({ icon, name, ...rest }) {
    return (
      <WrappedComponent
        name={
          <span className="flex items-center gap-2">
            {icon}
            {name}
          </span>
        }
        {...rest}
      />
    );
  };
};

const CommonIconButton = withIcon(CommonButton);

export default CommonIconButton;
