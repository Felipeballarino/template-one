import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { useState } from 'react'

const SwiperImagenes = ({ imagenes }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    return (
        <div className="w-full relative ">

            {/* Imagen Principal */}
            <Swiper
                modules={[Navigation, Thumbs]}
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="mb-4 h-[600px]"
            >
                {imagenes.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img src={img} alt={`Imagen ${i + 1}`} loading="lazy" className="w-full object-contain rounded-xl" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                watchSlidesProgress
                className="cursor-pointer"
            >
                {imagenes.map((img, i) => (
                    <SwiperSlide key={i}>
                        <img src={img} alt={`Miniatura ${i + 1}`} loading="lazy" className="h-30 w-full object-cover rounded-md " />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
export default SwiperImagenes  
