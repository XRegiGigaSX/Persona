import React, {useState, useRef} from 'react'
import {motion} from 'framer-motion'
import emailjs from '@emailjs/browser'
import {styles} from '../styles'
import {EarthCanvas} from './canvas'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'

//https://dashboard.emailj
// service_388xl3r
// Id8zchxUjnsHSzeXK

const Contact = () => {
  const formRef = useRef();

  const [form, setForm] = useState({
    name: '', email: '', message: ''
  })

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    emailjs.send(
      'service_388xl3r', 
      'https://dashboard.emailj', 
      {
        from_name: form.name,
        to_name: 'Rayyan',
        from_email: form.email,
        to_email: 'rayyan.shaikh01@gmail.com',
        message: form.message,
      },
      'Id8zchxUjnsHSzeXK'
    )
    .then(() => {
      setLoading(false);
      alert('Thank you. Will get back to you soon!');

      setForm({
        name: '', email: '', message: ''
      })
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong. Please try again.');
    })
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex flex-col gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Want to get in touch? </p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 mt-12"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="What's your good name?" className="bg-tertiary py-4 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Did you know? Email was invented by Ray Tomlinson" className="bg-tertiary py-4 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your message here👇</span>
            <textarea rows="7" name="message" value={form.message} onChange={handleChange} placeholder="Ask me anything you'd like to know about!" className="bg-tertiary py-4 px-4 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <button type="submit" className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl">{loading ? "Sending" : "Send"}</button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-[1] xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact");