interface CustomButtonProps {
  text: string
  onClick: () => void
}

export default function CustomButton({ text, onClick }: CustomButtonProps) {
  return (
    <button
      className="mt-6 px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
