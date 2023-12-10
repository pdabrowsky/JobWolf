'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/molecules/Modal'
import { SearchFiltersForm } from './SearchFiltersForm'

export const SearchFilters = () => {
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

      <Modal isOpen={isModalOpen} onClose={handleClose} title="Filters">
        <SearchFiltersForm />
      </Modal>
    </>
  )
}
