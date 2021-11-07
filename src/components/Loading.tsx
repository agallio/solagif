import SpinIcon from './SpinIcon'

interface LoadingProps {
  text: string
}

export default function Loading({ text }: LoadingProps) {
  return (
    <div className="flex items-center justify-center">
      <SpinIcon />
      <p className="text-lg">{text}</p>
    </div>
  )
}
