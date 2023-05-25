import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DialogContentText from "@mui/material/DialogContentText";
import Checkbox from "@mui/material/Checkbox";
import { isEmpty } from 'lodash';
import TextField from "@mui/material/TextField";
import { DateTimePicker } from '@mui/x-date-pickers';
import 'moment/locale/vi'
import { CustomerInfo } from "@/dataStructure/customerInfo";
import { Alert } from "@mui/material";

interface DialogContent2Props {
    // handleCountPrice: (value: React.ChangeEvent<HTMLInputElement>) => void,
    // onToggleLanguageClick: (locale: string) => void
    updateCustomerInfo: (value: string, type: keyof CustomerInfo) => void,
    customerInfo: Partial<CustomerInfo>,
    errors?: ErrorValidation[]
}

const DialogContent3: React.FC<DialogContent2Props> = ({ updateCustomerInfo, customerInfo, errors}) => {

    const phoneNumberError = errors?.find(error => error.key === 'phoneNumber')
    const nameError = errors?.find(error => error.key === 'name')
    const addressError = errors?.find(error => error.key === 'address')
    const startDateError = errors?.find(error => error.key === 'startDate')


    return (
        <>
            <DialogContent dividers className="dialog-content">
                <Typography gutterBottom className="comfirm-booking" component={'div'}>
                    <div className="comfirm-booking-info">
                        <div className="title">
                            <span>Thông tin*</span>
                        </div>
                        <div className="content">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Số điện thoại"
                                    maxRows={4}
                                    className="input-referral"
                                    value={customerInfo.phoneNumber}
                                    onChange={(e) => updateCustomerInfo(e.target.value, 'phoneNumber')}
                                    fullWidth
                                    error={!!phoneNumberError}
                                    helperText={phoneNumberError ? phoneNumberError.message : ''}
                                />
                            
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Tên"
                                maxRows={4}
                                className="input-referral"
                                value={customerInfo.name}
                                onChange={(e) => updateCustomerInfo(e.target.value, 'name')}
                                fullWidth
                                error={!!nameError}
                                helperText={nameError ? nameError.message : ''}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Địa chỉ"
                                multiline
                                maxRows={4}
                                className="input-referral"
                                value={customerInfo.address}
                                onChange={(e) => updateCustomerInfo(e.target.value, 'address')}
                                fullWidth
                                error={!!addressError}
                                helperText={addressError ? addressError.message : ''}
                            />
                        </div>
                    </div>
                    <div className="comfirm-booking-schedule">
                        <div className="title">
                            <span>Lịch hẹn*</span>
                        </div>
                        <div className="content date-time-select">
                            {startDateError ? <Alert severity="error">{startDateError.message}</Alert> : null}
                            <DateTimePicker label="Chọn lịch hẹn" onChange={e => updateCustomerInfo(e || '', 'startDate')} ampm={false} value={customerInfo.startDate}/>
                        </div>
                    </div>
                    <div className="comfirm-booking-note">
                        <div className="title">
                            <span>Ghi chú</span>
                        </div>
                        <div className="content">
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Bạn có cần nhắn nhủ gì thêm..."
                                multiline
                                maxRows={4}
                                className="input-referral"
                                value={customerInfo.note}
                                onChange={(e) => updateCustomerInfo(e.target.value, 'note')}
                            />
                        </div>
                    </div>
                </Typography>
            </DialogContent>
        </>
    );
}

export default DialogContent3