import React from 'react'
import { styles } from '../styles/style'

type Props = {}

const About = ({ }: Props) => {
    return (
        <div className='text-black dark:text-white'>
            <br />
            <h1 className={`${styles.title} 800px:!text-[45px]`}>
                What is <span className='text-gradient'>Kai-Learning?</span>
            </h1>
            <br />
            <div className='w-[95%] 800px:w-[85%] m-auto'>
                <p className='text-[18px]'>
                    Are you ready to take your programming skills to the next Level?


                    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac augue dis tempor vehicula litora nunc cursus? Sollicitudin fusce montes placerat natoque proin. Lacinia donec malesuada nulla curae lacinia. Dolor ligula potenti fusce eget praesent? Blandit sed per eleifend gravida potenti ornare lacinia. Venenatis torquent tempus tellus sit platea orci lacus sagittis erat. Eleifend ut ornare dui accumsan ut? Urna habitant lectus facilisi lacus aliquam accumsan phasellus tortor. Egestas tristique convallis ad nostra a quisque.

                    Dui dapibus ligula; commodo pulvinar urna taciti quisque semper sed. Montes ligula ullamcorper scelerisque mus class maximus. Tempus fermentum finibus vehicula sem tempus sagittis pellentesque. Donec nostra curae venenatis praesent commodo. Accumsan turpis urna aliquet, mauris in finibus. Odio morbi consectetur fames at libero cubilia lobortis?
                    <br />
                    <br />
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac augue dis tempor vehicula litora nunc cursus? Sollicitudin fusce montes placerat natoque proin. Lacinia donec malesuada nulla curae lacinia. Dolor ligula potenti fusce eget praesent? Blandit sed per eleifend gravida potenti ornare lacinia. Venenatis torquent tempus tellus sit platea orci lacus sagittis erat. Eleifend ut ornare dui accumsan ut? Urna habitant lectus facilisi lacus aliquam accumsan phasellus tortor. Egestas tristique convallis ad nostra a quisque.

                    Dui dapibus ligula; commodo pulvinar urna taciti quisque semper sed. Montes ligula ullamcorper scelerisque mus class maximus. Tempus fermentum finibus vehicula sem tempus sagittis pellentesque. Donec nostra curae venenatis praesent commodo. Accumsan turpis urna aliquet, mauris in finibus. Odio morbi consectetur fames at libero cubilia lobortis?
                    <br />
                    <br />
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac augue dis tempor vehicula litora nunc cursus? Sollicitudin fusce montes placerat natoque proin. Lacinia donec malesuada nulla curae lacinia. Dolor ligula potenti fusce eget praesent? Blandit sed per eleifend gravida potenti ornare lacinia. Venenatis torquent tempus tellus sit platea orci lacus sagittis erat. Eleifend ut ornare dui accumsan ut? Urna habitant lectus facilisi lacus aliquam accumsan phasellus tortor. Egestas tristique convallis ad nostra a quisque.

                    Dui dapibus ligula; commodo pulvinar urna taciti quisque semper sed. Montes ligula ullamcorper scelerisque mus class maximus. Tempus fermentum finibus vehicula sem tempus sagittis pellentesque. Donec nostra curae venenatis praesent commodo. Accumsan turpis urna aliquet, mauris in finibus. Odio morbi consectetur fames at libero cubilia lobortis?
                </p>
                <br />
                <span className='text-[13px]'>Kaif Qureshi-</span>
                <h5 className='text-[18px]'>
                    Founder and CEO of Kai-Learning
                </h5>
                <br />
                <br />
            </div>
        </div>
    )
}

export default About