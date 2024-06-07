// import { DropdownIndicator, ClearIndicator } from "../../common/asyncSelect/CustomeComponents";
// import usePaginateDropdown from "../../../hooks/usePaginateDropdown";
import { AsyncPaginate } from 'react-select-async-paginate'

// import "./paginate.css";
import usePaginateDropdown from './usePaginateDropdown'
import { customStyles } from './style'

const PaginateDropdown = ({
  onChange = () => {},
  name,
  onBlur,
  options,
  endpoint,
  value,
  isLoading,
  label,
  onFocus,
  isRequired = false,
  isDisabled,
  isClearable = false,
  showError,
  error,
  isMulti,
  styles,
  defaultValue,
  closeMenuOnSelect,
  placeholder = '',
  staticOptions,
  defaultSearch = null,
  isOptionDisabled = () => {},
  accessLabelKey = 'label',
  accessValueKey = 'value',
  filterOption = () => {
    return true
  },
}) => {
  const [{ clearCache }, { handleMenuOpen, optionsLoader }] =
    usePaginateDropdown({
      endpoint,
      staticOptions,
      defaultSearch,
      accessLabelKey,
      accessValueKey,
    })

  return (
    <div
      className={`custom-select-box ${showError && error ? 'error-border' : ''}`}
    >
      {label && (
        <label>
          {isRequired && <span className="required">* </span>}
          {label}
        </label>
      )}

      <AsyncPaginate
        //menuIsOpen
        isMulti={isMulti}
        onBlur={onBlur}
        onFocus={onFocus}
        isLoading={isLoading}
        additional={{ options, page: 1 }}
        isDisabled={isDisabled}
        debounceTimeout={300}
        className="react-select-container"
        classNamePrefix="react-select"
        loadOptions={optionsLoader}
        defaultValue={defaultValue}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary25: '#f8f7fa',
            primary: '#4f46e5;',
          },
        })}
        styles={customStyles}
        placeholder={placeholder}
        isClearable={isClearable}
        closeMenuOnSelect={closeMenuOnSelect}
        menuPlacement="auto"
        menuPortalTarget={document.body}
        // components={{
        //   IndicatorSeparator: () => null,
        //   ClearIndicator,
        //   DropdownIndicator,
        // }}
        onChange={onChange}
        value={value}
        getOptionLabel={(data) => data?.name || data?.label}
        getOptionValue={(data) => data?.id || data?.value}
        onMenuOpen={handleMenuOpen}
        isOptionDisabled={isOptionDisabled}
        filterOption={filterOption}
        cacheUniqs={[clearCache]}
        menuShouldBlockScroll={true}
      />
      {showError && error && <span className="error-text">{error}</span>}
    </div>
  )
}

export default PaginateDropdown
