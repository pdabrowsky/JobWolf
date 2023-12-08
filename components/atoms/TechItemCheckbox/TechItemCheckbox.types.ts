export type TechItemCheckboxProps = {
  name: string
  isSelected: boolean
  onToggle: (tech: string) => void
  className?: string
}
