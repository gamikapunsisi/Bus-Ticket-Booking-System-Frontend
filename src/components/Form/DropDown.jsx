import dropdownIcon from "../../assets/dropdown.svg";

function DropDown({
  label,
  id,
  error,
  isError = false,
  name,
  value,
  options,
  defaultOption,
  idKey,
  valueKey,
  containerStyle,
  labelStyle,
  dropdownDivStyle,
  dropdownStyle,
  errorDropdownStyle,
  dropDownIconStyle,
  errorTextStyle,
  disabled = false,
  ...props
}) {
  return (
    <div className={` ${containerStyle}`}>
      <label htmlFor={id} className={`block form-label ${labelStyle}`}>
        {label}
      </label>
      <div className={`relative mt-2 `}>
        <select
          id={id}
          name={name}
          value={value}
          {...props}
          className={` font-sans block appearance-none h-[32px] text-gray-700 text-[14px] border border-gray-500 px-[10px] py-[6px] rounded-[5px] leading-tight focus:outline-none hover:ring-[#FCECE999] ${dropdownStyle} ${
            error || isError ? `border-red-600 ${errorDropdownStyle}` : ""
          }`}
          disabled={disabled}
        >
          <option value="">{defaultOption}</option>
          {options?.map((option) => (
            <option
              key={option[idKey]}
              id={option[idKey]}
              value={option[valueKey]}
            >
              {option[valueKey]}
            </option>
          ))}
        </select>
        <div
          className={`absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ${dropDownIconStyle}`}
        >
          <img src={dropdownIcon} alt="dropdown" />
        </div>
      </div>
      {error && (
        <p className={`text-red-500 mt-1 text-sm font-sans ${errorTextStyle}`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default DropDown;
