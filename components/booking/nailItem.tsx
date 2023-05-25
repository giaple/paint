import { useState } from "react";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import { ItemModel } from "@/dataStructure";

interface NailItemProps {
    handleOpenDialog: () => void;
    item: ItemModel;
    disabled?: boolean;
}

const tempImages = ["/images/booking/gallery/1.jpeg","/images/booking/gallery/2.jpeg", "/images/booking/gallery/3.jpg", "/images/booking/gallery/4.jpeg", "/images/booking/gallery/5.png", "/images/booking/gallery/6.jpg"]

const NailItem: React.FC<NailItemProps> = ({handleOpenDialog, item, disabled}) => {
    const { t } = useTranslation("common");
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        className: 'slideNailItem'
    };

    const handleSelectAction = () => {
        if(disabled) return

        handleOpenDialog()
    }

    const slider = () => {
        return (
            <Slider {...settings}>
                {item?.imageUrls?.length ? item?.imageUrls?.map((image: string, index: number) => (<div className="item" key={index+ '-' + image}>
                    <Image
                        src={image}
                        alt=""
                        loading="eager"
                        quality={100}
                        fill
                        objectFit="cover"
                    />
                </div>)) : tempImages.map((image: string, index: number) => (<div className="item" key={index+ '-' + image}>
                <Image
                        src={image}
                        alt=""
                        loading="eager"
                        quality={100}
                        fill
                        objectFit="cover"
                    />
                </div>))}
            </Slider>
        )
    }

    return (
        <>
            <div className="item-container">
                <div className="item-slide">
                    {slider()}
                </div>
                <div className="item-content">
                    <div>
                        <span>{item.tags}</span>
                        <span>{item.name}</span>
                        <span>{item.subName}</span>
                        <span>{item.price.toLocaleString("en-Us")}đ</span>
                    </div>
                    <div onClick={handleSelectAction} className="item-button">XEM</div>
                </div>
            </div>
        </>
    );
}

export default NailItem