import { CopyIcon } from '@/icons'
import { toast } from 'react-toastify'
import { LinkWithCopyProps } from '.'
import { cn } from '@/lib/utils'
import { IconButton } from '../IconButton'

export const LinkWithCopy = ({ href, text, className }: LinkWithCopyProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(href)
      toast.success('Link copied to clipboard')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="text-sm w-fit"
      >
        {text ? text : href}
      </a>
      <IconButton
        icon={<CopyIcon />}
        className="w-6 h-6"
        aria-label="copy link"
        onClick={copyToClipboard}
      />
    </div>
  )
}
