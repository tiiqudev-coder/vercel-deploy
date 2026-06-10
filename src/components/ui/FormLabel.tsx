// Small component for generic form labels

import {twMerge} from "tailwind-merge"

interface FormLabelProps {
    htmlFor: string;
    text: string;
    required?: boolean;
    className?: string;
}

const FormLabel = ({ htmlFor, text, required, className }: FormLabelProps) => (
  <label
    htmlFor={htmlFor}
    className={twMerge("block text-sm font-bold text-gray-900 mb-1 mt-8", className)}
  >
    {text}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export default FormLabel;