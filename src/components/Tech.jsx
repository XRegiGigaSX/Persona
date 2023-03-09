import React from 'react'
import {BallCanvas} from "./canvas"
import {SectionWrapper} from '../hoc'
import {technologies} from '../constants'


const Tech = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {technologies.map((tech) => (
        <div className="w-28 h-28 flex justify-center" key={tech.name}>
          <BallCanvas icon={tech.icon} />
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech, "tech")