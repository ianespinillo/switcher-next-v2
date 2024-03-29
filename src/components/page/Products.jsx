'use client'

import React, { useState } from 'react'

import { ConfederationModal } from '@/components/Modals/ConfederationModal'
import { CountryModal } from '@/components/Modals/CountryModal'
import { CompetitionModal } from '@/components/Modals/CompetitionModal'

import styles from '@/Styles/Products.module.css'

export const Products = () => {
    const [confedModalIsOpen, setConfedModalIsOpen] = useState(false)
    const [countryModalIsOpen, setCountryModalIsOpen] = useState(false)
    const [competitionModalIsOpen, setCompetitionModalIsOpen] = useState(false)
    function OpenConfed () {
      setConfedModalIsOpen(true)
    }
    function openCountry () {
      setCountryModalIsOpen(true)
    }
    function openCompetition () {
      setCompetitionModalIsOpen(true)
    }
    
  return (
    <>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={OpenConfed}>
          + Add a confederation
        </button>
        <button className={styles.btn} onClick={openCountry}>
          + Add a country
        </button>
        <button className={styles.btn} onClick={openCompetition}>
          + Add a competition
        </button>
      </div>
      <ConfederationModal
        ConfedModalIsOpen={confedModalIsOpen}
        setConfedModalOpen={setConfedModalIsOpen}
      />
      <CountryModal
        CountryModalIsOpen={countryModalIsOpen}
        setCountryModalOpen={setCountryModalIsOpen}
      />
      <CompetitionModal
        setCompetitionModalOpen={setCompetitionModalIsOpen}
        CompetitionModalIsOpen={competitionModalIsOpen}
      />
    </>
  )
}
