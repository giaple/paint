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

interface DialogActionsFooterProps {
    handleAction: () => void,
    price: number
}

const DialogActionsFooter: React.FC<DialogActionsFooterProps> = ({ handleAction, price }) => {
    const { t } = useTranslation("common");

    const formatCurrency = (number: number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }

    return (
        <>

            <div className="dialog-action">
                <div className="combo-price">
                    <span>{formatCurrency(price)}</span>
                </div>
                <Button autoFocus onClick={handleAction}>
                    CHỌN COMBO
                </Button>
            </div>
        </>
    );
}

export default DialogActionsFooter