'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/molecules/Modal'
import { SearchFiltersForm } from './SearchFiltersForm'
import { SearchFiltersProps } from '.'

export const SearchFilters = ({ filterOptions }: SearchFiltersProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      <button
        onClick={handleOpen}
        className="p-1 text-gold font-semibold text-sm lg:text-[15px]"
      >
        Filters
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Filters"
        className="max-w-[600px] max-h-[95%] overflow-auto overscroll-contain"
      >
        <SearchFiltersForm
          onClose={handleClose}
          filterOptions={filterOptions}
        />
      </Modal>
    </>
  )
}
