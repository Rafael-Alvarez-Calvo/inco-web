interface FormFieldProps {
  label:       string
  id:          string
  type:        string
  placeholder: string
  required?:   boolean
}

export const FormField = ({ label, id, type, placeholder, required }: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-stone-200 rounded-[4px] px-3.5 py-2.5 text-[14px] text-stone-700 outline-none focus:border-blue transition-colors"
      />
    </div>
  )
}
