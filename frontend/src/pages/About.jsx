import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
    
<Title text1={'ABOUT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flexcol md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime similique possimus dolor, necessitatibus, laudantium saepe, eveniet tempore illum veritatis incidunt velit. Similique dolorem quis illum modi dolore officia aliquam quibusdam quasi natus, earum dicta, eligendi aspernatur illo expedita.</p>


        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nemo dolores tenetur unde minus. Consectetur aliquid inventore nam laudantium nemo. Porro necessitatibus minima beatae libero! Sint consequuntur saepe labore. Magnam fugit quas suscipit eaque beatae nulla molestiae incidunt aliquam?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission at forever is to empower customers with choice Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, voluptatem!
        </p>
        </div>
      </div>

      <div className='text-xl py-4'>

        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus necessitatibus debitis repellendus possimus earum? Ipsam porro quas ab recusandae provident?</p>
        </div>

        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p  className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus necessitatibus debitis repellendus possimus earum? Ipsam porro quas ab recusandae provident?</p>
        </div>

        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service</b>
          <p  className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus necessitatibus debitis repellendus possimus earum? Ipsam porro quas ab recusandae provident?</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About