'use client'
import CreatableSelect from 'react-select'
const InputTags = ({
  onChange = () => {},
  inputValue,
  value,
  label,
  placeholder,
  isMulti = false,
  isRequired = false,
  isClearable = false,

  className,
  isDisabled,
  onInputChange = () => {},
  onKeyDown = () => {},
  onBlur = () => {},
}) => {
  return (
    <div>
      <CreatableSelect
        components={{
          DropdownIndicator: null,
        }}
        inputValue={inputValue}
        isClearable={isClearable}
        isMulti={isMulti}
        menuIsOpen={false}
        onChange={onChange}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
        className={`${className} setinput-height`}
        getOptionLabel={(data) => data?.name || data?.label}
        getOptionValue={(data) => data?.id || data?.value}
        isDisabled={isDisabled}
        onBlur={onBlur}
      />
    </div>
  )
}

export default InputTags
