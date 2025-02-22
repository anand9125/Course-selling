
export const Input = ({
    label,
    placeholder,
    onChange,
    type = "text",
    name,
    value,
  }: {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email"|"number" ;
    name: string;
    value: string|number;
  }) => {
    return (
      <div>
        <div className="text-sm pb-2 pt-2">
          *<label htmlFor={name}>{label}</label>
        </div>
        <input
          className="border rounded px-3 py-2 min-w-full border-black"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value} // Controlled input
        />
      </div>
    );
  };
  