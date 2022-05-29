import React from 'react'
import styles from './styles.module.scss'

export default function HeroSection() {
  return (
    <section className={styles.section_container}>
      <main className={styles.main_wrapper}>
        <div className={styles.form_container}>
          <form className={styles.form}>
            <input type="text" placeholder="Search for a country..." />
            <button type="submit" />
          </form>
        </div>

        <div>
          <CountryCard />
        </div>
      </main>
    </section>
  )
}
