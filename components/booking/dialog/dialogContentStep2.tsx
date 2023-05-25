import React, { useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import { useRecoilState, useRecoilValue } from "recoil";
import addedItemsState from "@/recoil/cart/withCartItems";
import { ItemModel, OptionModel } from "@/dataStructure";
import cartState from "@/recoil/cart/atom";

import _ from "lodash";

interface DialogContent3Props {
    // handleCountPrice: (value: React.ChangeEvent<HTMLInputElement>) => void,
    // onToggleLanguageClick: (locale: string) => void
    handleEditItems: (item: ItemModel, action?: string) => void
    code: string,
    changeCode: (e: string) => void,
    preCalculate: () => void,
    codeError: boolean
}

const DialogContent2: React.FC<DialogContent3Props> = ({handleEditItems, code, preCalculate, changeCode, codeError}) => {
    const { t } = useTranslation("common");
    const addedItems = useRecoilValue(addedItemsState)
    const [cartData, setCartData] = useRecoilState(cartState)

    const calculatePrice = (options?: OptionModel[]) => {
        let price = 0
        if (options) {
            price = options.reduce((value: number, curr) => { return value + curr.price }, 0)
        }
        return price
    }

    const deleteItem = (id: number, subIndex?: number) => {
        const newCartData = _.cloneDeep(cartData)
        if(subIndex !== undefined) {
            newCartData.items[id].options?.splice(subIndex, 1)
            setCartData(newCartData)
            return
        }
        newCartData.items.splice(id, 1)
        newCartData.total = newCartData.items.length
        let price = 0
        newCartData.items.map(item => {
            price = price + item.price
            if(item.options){
               price = price +  calculatePrice(item.options)
            }
        })
        newCartData.totalPrice = price
        setCartData(newCartData)
    }

    const calculatePriceWithCode = (e: React.KeyboardEvent<HTMLInputElement>, cal?: boolean) => {

        if(e.code === 'Enter') {
            preCalculate()
        }
    }

    return (
        <>
            <DialogContent dividers className="dialog-content">
                <Typography gutterBottom className="service-includes" component={'div'}>
                    <div className="service-container">
                        <div className="title">
                            <span>Dịch vụ bạn chọn</span>
                            <div><span>Thêm combo</span></div>
                        </div>
                        <div className="dashed" />
                        {
                            addedItems.map((item, index) => {
                                return (
                                    <div className="content" key={item._id}>
                                        <div className="service-item">
                                            <div className="service-name">
                                                <span>{item.name}</span>
                                                {item?.options?.map((option) => {
                                                    if(!option.checked) return null
                                                    return(
                                                        <span key={option._id}>{`+ ${option.name}`}</span>
                                                    )
                                                })}
                                            </div>
                                            <div className="service-price">
                                                <span>{item.price + calculatePrice(item.options?.filter(option => option.checked) as OptionModel[])}đ</span>
                                                <Image src="/images/icons/close-icon.svg" width={18} height={18} alt="" onClick={() => deleteItem(index)} />
                                            </div>
                                        </div>
                                        <div className="edit-service" onClick={() => handleEditItems(item, 'edit')}><span>Chỉnh sửa</span></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="service-referral">
                        <TextField
                            error={codeError}
                            id="outlined-multiline-flexible"
                            label="Nhập mã giảm giá (nếu có)"
                            className="input-referral"
                            onChange={e => changeCode(e.target.value)}
                            variant="outlined"
                            value={code}
                            onKeyDown={calculatePriceWithCode}
                            helperText={codeError ? "Mã giảm giá không hợp lệ" : null}
                        />
                        <div className='button-referral' onClick={() => { code && preCalculate()}}>
                            <span>Áp Dụng</span>
                        </div>
                    </div>
                </Typography>
            </DialogContent>
        </>
    );
}

export default DialogContent2