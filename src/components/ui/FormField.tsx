import type { UseFormRegisterReturn } from 'react-hook-form'

interface FormFieldProps {
  label:        string
  id:           string
  type:         string
  placeholder:  string
  required?:    boolean
  registration?: UseFormRegisterReturn
  error?:        string
}

export const FormField = ({ label, id, type, placeholder, required, registration, error }: FormFieldProps) => {
  const errorId      = `${id}-error`
  const displayLabel = required ? label.replace(/\s*\*$/, '') : label

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5"
      >
        {displayLabel}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...registration}
        className={[
          'w-full bg-white border rounded-[4px] px-3.5 py-2.5 text-[14px] text-stone-700 outline-none transition-colors',
          error ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-blue',
        ].join(' ')}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-[11px] text-red-500">{error}</p>
      )}
    </div>
  )
}
