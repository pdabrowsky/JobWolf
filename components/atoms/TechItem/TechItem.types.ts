export type TechItemProps = {
  name: string
  isSelected: boolean
  onToggle: (tech: string) => void
  className?: string
}
