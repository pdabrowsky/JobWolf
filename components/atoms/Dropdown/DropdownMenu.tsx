import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { DropdownMenuProps } from './DropdownMenu.types'
import { cn } from '@/lib/utils'
import { useOnClickOutside } from '@/hooks/useOutSideClick'

export const DropdownMenu = ({
  options,
  children,
  className,
}: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleOpen = () => setIsOpen((val) => !val)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  return (
    <div className={cn(className, 'relative')} ref={dropdownRef}>
      <div onClick={toggleOpen} className="cursor-pointer">
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 transform -translate-x-1/2 right-0 mt-2 z-10 bg-darkLight rounded-md shadow-lg w-fit border border-borderLight"
          >
            {options.map((option) => (
              <Link href={option.href} key={option.label}>
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.25, delay: 0.1 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="block text-[12px] lg:text-[13px] px-4 py-2 hover:bg-hoverDark transition-all rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {option.label}
                </motion.li>
              </Link>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
