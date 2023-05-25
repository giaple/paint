import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Checkbox from "@mui/material/Checkbox";
import { isEmpty } from 'lodash';
import { ItemModel, OptionModel } from "@/dataStructure";

interface DialogContent1Props {
    handleCountPrice: (value: React.ChangeEvent<HTMLInputElement>, index: number) => void,
    data: ItemModel
    // onToggleLanguageClick: (locale: string) => void
}

const DialogContent1: React.FC<DialogContent1Props> = ({handleCountPrice, data}) => {
    const { t } = useTranslation("common");

    return (
        <>
            <DialogContent dividers className="dialog-content">
                <Typography gutterBottom className="combo-title" component={'div'}>
                    <div>
                        <span>{data.subName}</span>
                        <span>{data.name}</span>
                        <span>{data.price}</span>
                    </div>
                </Typography>
            </DialogContent>
            <DialogContent dividers className="dialog-content">
                <Typography gutterBottom className="combo-includes" component={'div'}>
                    <div className="title"><span>Combo có những gì?</span></div>
                    {!data.content ? <div className="content">
                        <div className="content-1">
                            <div>
                                <div>
                                    <Image
                                        src="/images/icons/checked.svg"
                                        alt=""
                                        width={16}
                                        height={16}
                                        quality={100}
                                        className="icon-checked"
                                        priority={true}
                                    />
                                    <div>
                                        <span>Sơn gel 1 màu</span>
                                        <span>Hơn 30 màu để chọn</span>
                                    </div>
                                </div>
                                <Image
                                    // src="/images/booking/dialog/demo-img.png"
                                    src="/images/icons/demo-img.svg"
                                    alt=""
                                    width={138}
                                    height={32}
                                    quality={100}
                                    className="demo-img"
                                    priority={true}
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                        <div className="dashed" />
                        <div className="content-2">
                            <div>
                                <div>
                                    <Image
                                        src="/images/icons/checked.svg"
                                        alt=""
                                        width={16}
                                        height={16}
                                        className="icon-checked"
                                        priority={true}
                                    />
                                    <span>Cắt da</span>
                                </div>
                                <div>
                                    <Image
                                        src="/images/icons/checked.svg"
                                        alt=""
                                        width={16}
                                        height={16}
                                        className="icon-checked"
                                        priority={true}
                                    />
                                    <span>Dưỡng da</span>
                                </div>
                                <div>
                                    <Image
                                        src="/images/icons/checked.svg"
                                        alt=""
                                        width={16}
                                        height={16}
                                        className="icon-checked"
                                        priority={true}
                                    />
                                    <span>Dũa móng</span>
                                </div>
                                <div>
                                    <Image
                                        src="/images/icons/checked.svg"
                                        alt=""
                                        width={16}
                                        height={16}
                                        className="icon-checked"
                                        priority={true}
                                    />
                                    <span>Massage tay</span>
                                </div>
                            </div>

                        </div>
                    </div> : <div className="content">
                                <Image
                                    src={data.content}
                                    alt=""
                                    fill
                                    quality={100}
                                    className="icon-checked"
                                    priority={true}
                                />
                        </div>}
                </Typography>
            </DialogContent>
            <DialogContent dividers className="dialog-content">
                <Typography className="combo-add" component={'div'}>
                    <div className="title"><span>Dịch vụ cộng thêm</span></div>
                    <div className="content">
                        {
                            !isEmpty(data.options) && data.options?.map((item, index) => {
                                return (<div key={item._id}>
                                    <div className="item">
                                        <span>{item.name}</span>
                                        <span>+ {item.price?.toLocaleString("eu-US")}đ</span>
                                    </div>
                                    <Checkbox checked={item.checked as boolean} onChange={(e) => handleCountPrice(e, index)} value={item.price || 0} />
                                </div>)
                            })
                        }
                    </div>
                </Typography>
            </DialogContent>
            <DialogContent dividers className="dialog-gallery ">
                <Typography className="combo-gallery" component={'span'}>
                    <div className="title-gallery">
                        <div>
                            <span>Hình mẫu</span>
                            <span>Bạn có thể tự đề xuất mẫu</span>
                        </div>
                        <div><span>Xem thêm</span></div>
                    </div>
                    <div className="content">
                        {/* need use <ImageList> to render list of imgs. follow link: https://mui.com/material-ui/react-image-list/*/}
                        <div className="gallery-row">
                            <div className="gallery-column">
                                {data?.imageUrls?.map((item: string, index: number) => (<Image
                                    src={item}
                                    alt=""
                                    className="gallery-img"
                                    quality={100}
                                    fill
                                />))}
                            </div>
                        </div>
                    </div>
                </Typography>
            </DialogContent>
        </>
    );
}

export default DialogContent1