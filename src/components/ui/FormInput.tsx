// Small component to provide a default styled input to forms

import { twMerge } from "tailwind-merge"

const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={twMerge(`border border-gray-200 mt-3 rounded p-4 text-sm`, props.className)}
  />
)

export default FormInput