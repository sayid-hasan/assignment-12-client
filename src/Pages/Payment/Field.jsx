const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
  readonly,
}) => {
  return (
    <div className=" w-fit">
      <label htmlFor={id} className="label FormRowLabel">
        {label}
      </label>
      <input
        className="FormRowInput  w-fit input"
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
};

export default Field;
