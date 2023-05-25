import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRecoilValue } from "recoil";
import cartStatsState from "@/recoil/cart/withCartStats";
import DialogBooking from "./booking/dialog/dialogBooking";

interface ShoppingCardProps {
    // setIsOpenDialog: (value: any) => void,
    // isOpenDialog: boolean
}

const ShoppingCard: React.FC<ShoppingCardProps> = () => {
    const { t } = useTranslation("common");
    const [isMobileView, setIsMobileView] = useState(false)
    const [width, setWidth] = useState(0)
    const {total, totalPrice} = useRecoilValue(cartStatsState)
    const [totalPriceWithCode, setTotalPriceWithCode] = useState(0)
    const [totalItem, setTotalItem] = useState(0)

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const handleResize = () => setWidth(window.innerWidth)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleResize])

    useEffect(() => {
        if (width < 991) { setIsMobileView(true) }
        else { setIsMobileView(false) }
    }, [width])

    useEffect(() => {
        setTotalItem(total)
    },[total])

    useEffect(() => {
        setTotalPriceWithCode(totalPrice)
    }, [totalPrice])

    if(totalItem === 0 && !isOpenDialog) {
        return null
    }

    return (
        <div style={{ overflowX: 'hidden', height: '100%' }} className="shopping-card">
            <div className="card-container">
                <div className="card-icon">
                    <ShoppingCartIcon />
                </div>
                <div className="card-btn">
                    <Button onClick={() => setIsOpenDialog(true)}>
                        <div className="btn-container">
                            <div className="left">
                                <span>
                                    {totalItem} COMBO
                                </span>
                                <CircleIcon className="circle" />
                                <span>
                                    {totalPriceWithCode}đ
                                </span>
                            </div>
                            <div className="right">
                                <span>
                                    TIẾP TỤC
                                </span>
                                <KeyboardArrowRightIcon className="arrow-right" />
                            </div>
                        </div>
                    </Button>
                </div>
            </div>

            {
                isOpenDialog && <DialogBooking
                    isOpenDialog={isOpenDialog}
                    setIsOpenDialog={setIsOpenDialog}
                    bookingStep={1}
                />
            }

        </div>
    );
}

export default ShoppingCard