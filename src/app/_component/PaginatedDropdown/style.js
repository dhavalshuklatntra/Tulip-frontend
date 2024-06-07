export const customStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#D9DADB',
    cursor: 'pointer',
    minHeight: '46px',
    borderRadius: '8px',
    boxShadow: state.isFocused ? null : null,
    '&:hover': {
      borderColor: 'red;',
    },
    '&:active': {
      borderColor: '#6f6f6e;',
    },
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),

  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'rgba(0, 0, 0, 0.88)' : 'rgba(0, 0, 0, 0.88)',
    fontWeight: state.isSelected ? '600' : '',
    '&:active': {
      backgroundColor: '#4f46e5',
      color: '#fff',
    },
  }),
  container: (provided) => ({
    ...provided,
  }),
  valueContainer: (provided) => ({
    ...provided,
    overflow: 'visible',
  }),
  placeholder: (base, state) => ({
    ...base,
    position: 'absolute',
    paddingLeft: '5px',
    paddingRight: '5px',
    backgroundColor: '#fff',

    top:
      state.hasValue ||
      state.selectProps.inputValue ||
      state.selectProps.isFocused
        ? '-20px'
        : '0',
    transition: 'top 0.2s, font-size 0.2s',
    fontSize:
      (state.hasValue ||
        state.selectProps.inputValue ||
        state.selectProps.isFocused) &&
      14,
  }),
}
