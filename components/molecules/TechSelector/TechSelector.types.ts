export type TechSelectorProps = {
  name: string
  label: string
  className?: string
  onChange: (value: string[]) => void
  technologies: string[]
}
