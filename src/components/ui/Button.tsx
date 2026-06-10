// Generic styled button

const colourMap = {
  gray: 'bg-gray-200 text-gray-900 hover:bg-gray-400 active:bg-gray-600',
  white: 'bg-white border text-gray-900 hover:bg-gray-200 active:bg-gray-400',
  blue: 'bg-[#136682] hover:bg-[#187c9e] active:bg-[#0f5268] text-white',
  red: 'bg-red-500  hover:bg-red-600  active:bg-red-700',
  green: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
} as const

type Colour = keyof typeof colourMap

interface ButtonProps {
  onClick: () => void
  text: string
  colour?: Colour
}

const Button = ({ onClick, text, colour = 'gray' }: ButtonProps) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 min-w-31.75 w-fit rounded text-sm transition-colors duration-150
      disabled:opacity-50 disabled:cursor-not-allowed ${colourMap[colour]}`}
  >
    {text}
  </button>
)

export default Button
