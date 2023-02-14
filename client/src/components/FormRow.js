const FormRow = ({ type, name, value, handleChange, placeholder }) => {
  return (
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        className='form-input'
      />
  )
}

export default FormRow
