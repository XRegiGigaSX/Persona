import React from 'react'
import {motion} from 'framer-motion'
import {styles} from '../styles'
import {SectionWrapper} from '../hoc'
import {fadeIn, textVariant} from '../utils/motion'
import {testimonials} from '../constants'

const Feedbacks = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`${styles.padding} bg-tertiary rounded-2-xl min-h-[300px]`}>
        <motion.div
         variants={textVariant()}
        >
          <p>Certifications</p>
        </motion.div>

      </div>

    </div>
  )
}

export default Feedbacks