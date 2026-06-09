interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  autoComplete?: string;
  error?: string;
}

export function FormField({ id, name, label, type, autoComplete, error }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm outline-none transition focus:ring-2 focus:ring-everest-500 ${
          error ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-everest-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
