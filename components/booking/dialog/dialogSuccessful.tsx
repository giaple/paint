import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Link from "next/link";

interface dialogSuccessfulProps {
    setIsOpenDialog: (value: any) => void,
    isOpenDialog: boolean
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 16,
        maxWidth: 520,
        width: 520,
        height: 'calc(100vw)'
    },
    '& .MuiDialogTitle-root': {
        borderRadius: 10,
        padding: theme.spacing(0),
    },
    '& .MuiDialogContent-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
    },
    '& .MuiDialogContent-dividers': {
        borderBottom: 'none'
    },
}));

const dialogSuccessful: React.FC<dialogSuccessfulProps> = ({ isOpenDialog, setIsOpenDialog }) => {
    const { t } = useTranslation("common");
    const [isMobileView, setIsMobileView] = useState(false)
    const [width, setWidth] = useState(0)

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

    return (
        <BootstrapDialog
            onClose={() => setIsOpenDialog(false)}
            open={isOpenDialog}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className="dialog-booking"
            fullScreen={isMobileView}
        >
            <div style={{ overflowX: 'hidden', height: '100%' }} className="dialog-successful">
                <Image
                    src="/images/booking/bg/BG.svg"
                    alt=""
                    loading="eager"
                    quality={100}
                    fill
                    objectFit="cover"
                />
                <div className="content-1">
                    <Image
                        src="/images/booking/bg/successful.svg"
                        alt=""
                        loading="eager"
                        quality={100}
                        width={120}
                        height={120}
                        objectFit="cover"
                    />
                    <div className="title"><span>Đặt lịch thành công</span></div>
                    <div className="content"><span>Chúng tôi sẽ gọi lại để xác nhận lịch hẹn trong thời gian sớm nhất</span></div>
                    <Link href="/">
                        <Button onClick={() => setIsOpenDialog(false)}>
                            <div className="">
                                <span>
                                    Trở về trang chủ
                                </span>
                            </div>
                        </Button>
                    </Link>
                </div>
                <div className="content-2">
                    <div className="title"><span>Liên hệ Nook nếu cần hỗ trợ</span></div>
                    <div className="content">
                        <div className="phone-number">
                            <Image
                                src="/images/icons/phone-call.svg"
                                alt=""
                                loading="eager"
                                quality={100}
                                width={24}
                                height={24}
                                objectFit="cover"
                            />
                            <a target="_blank" href="tel:1900633897">
                                <span>1900 633 897</span>
                            </a>
                        </div>
                        <div className="messenger">
                            <a
                                href="https://m.me/nailswithnook"
                                target="_blank"
                            >
                                <Image
                                    src="/images/icons/messenger.svg"
                                    alt=""
                                    loading="eager"
                                    quality={100}
                                    width={24}
                                    height={24}
                                    objectFit="cover"
                                />
                            </a>
                        </div>
                        <div className="zalo">
                            <a href="https://zalo.me/g/aiveia597" target="_blank">
                                <Image
                                    src="/images/icons/zalo.svg"
                                    alt=""
                                    loading="eager"
                                    quality={100}
                                    width={24}
                                    height={24}
                                    objectFit="cover"
                                />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </BootstrapDialog>
    );
}

export default dialogSuccessful