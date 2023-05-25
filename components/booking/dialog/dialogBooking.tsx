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
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import _, { isEmpty, set } from 'lodash';
import DialogContent1 from "./dialogContentStep1";
import DialogContent2 from "./dialogContentStep2";
import DialogContent3 from "./dialogContentStep3";
import DialogSuccessful from "./dialogSuccessful";
import { CartItemInput, CartItemOptionInput, ItemModel, JobCreateInput, JobMetadataInput, OptionModel, PreBookingJobInput } from "@/dataStructure";
import { useRecoilState, useRecoilValue } from "recoil";
import cartState from "@/recoil/cart/atom";
import { usePreBooking } from "@/graphQL/pricing";
import { CustomerInfo } from "@/dataStructure/customerInfo";
import { useCreateJob } from "@/graphQL/job";
import { useRouter } from "next/router";
import { it } from "node:test";
import userInforState from "@/recoil/userInfor/atom";

interface DialogBookingProps {
    setIsOpenDialog: (value: any) => void,
    isOpenDialog: boolean
    data?: ItemModel,
    bookingStep?: number
    // onToggleLanguageClick: (locale: string) => void
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    className: 'dialog-slider',
    arrows: false
};

const tempImages = ["/images/booking/gallery/1.jpeg","/images/booking/gallery/2.jpeg", "/images/booking/gallery/3.jpg", "/images/booking/gallery/4.jpeg", "/images/booking/gallery/5.png", "/images/booking/gallery/6.jpg"]

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 16,
        maxWidth: 520,
        width: 520,
        height: 'calc(100vw)'
    },
    '& .MuiDialogTitle-root': {
        borderRadius: 10,
        padding: theme.spacing(0)
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

const DialogBooking: React.FC<DialogBookingProps> = ({ isOpenDialog, setIsOpenDialog, data, bookingStep = 0 }) => {
    const { t } = useTranslation("common");
    const [price, setPrice] = useState(data?.price || 0);
    const [step, setStep] = useState(bookingStep)
    const [isMobileView, setIsMobileView] = useState(false)
    const [width, setWidth] = useState(0)
    const [cartData, setCartState] = useRecoilState(cartState)
    const [userInfor, setUserInforState] = useRecoilState(userInforState)
    const [itemData, setItemData] = useState(data)
    const [code, setCode] = useState('')
    const [customerInfo, setCustomerInfo] = useState<Partial<CustomerInfo>>({})
    const [errors, setErrors] = useState<ErrorValidation[]>([])
    const [errorCode, setErrorCode] = useState(false)

    const [meta, setMetaData] = useState<Partial<JobMetadataInput>>()

    const router = useRouter()

    const handleResize = () => setWidth(window.innerWidth)

    const [preBookingCal] = usePreBooking({
        onCompleted: (data) => {
            const { preBookingJob } = data
            const newCartData = _.cloneDeep(cartData)
            newCartData.totalPrice = preBookingJob?.finalTotalPrice
            newCartData.preBookingData = preBookingJob
            setCartState(newCartData)
        }
    })

    const [createJob] = useCreateJob({
        onCompleted: () => {
            const newCartData = _.cloneDeep(cartData)
            newCartData.totalPrice = 0
            newCartData.preBookingData = null
            newCartData.items = []
            newCartData.total = 0
            setCartState(newCartData)
            setUserInforState(customerInfo)
            setStep(3)
        }
    })


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

        const query = router.query

        if(query){
            if(query?.utmSource || query?.utmMedium || query?.utmCampaign) {
                setMetaData({
                    utmSource: query?.utmSource as string,
                    utmMedium: query?.utmMedium as string,
                    utmCampaign: query?.utmCampaign as string
                } as JobMetadataInput)
            }
        }

        if(query?.utmCampaign) {
            setCode(query?.utmCampaign as string)
        }

        if(userInfor){
            const newUserInfo = _.cloneDeep(userInfor)
            delete newUserInfo?.startDate
            setCustomerInfo(newUserInfo)
        }



    }, [])

    const slider = () => {
        // need to create slide component when do with the API

        console.log('dataImage', data?.imageUrls)
        return (
            <Slider {...settings}>
                {data?.imageUrls?.length ? data?.imageUrls?.map((image: string, index: number) => (<div className="item" key={index+ '-' + image}>
                    <Image
                        src={image}
                        alt=""
                        loading="eager"
                        quality={100}
                        fill
                        objectFit="cover"
                        className="dialog-slider-img"
                    />
                </div>)) : tempImages.map((image: string, index: number) => (<div className="item" key={index+ '-' + image}>
                        <Image
                                src={image}
                                alt=""
                                loading="eager"
                                quality={100}
                                fill
                                objectFit="cover"
                                className="dialog-slider-img"
                            />
                </div>))}
            </Slider>
        )
    }

    const BootstrapDialogTitle = (props: DialogTitleProps) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other} className="dialogTitle">
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            top: 16,
                            color: (theme) => theme.palette.grey[100],
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        }}
                    >
                        <Image
                            src="/images/icons/arrow-left.svg"
                            alt=""
                            width={24}
                            height={24}
                        />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    const formatCurrency = (number: number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }

    const calculatePrice = (options?: OptionModel[]) => {
        let price = 0
        if (options) {
            price = options.reduce((value: number, curr) => { return value + curr.price }, 0)
        }
        return price
    }

    const handleCountPrice = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.checked && !isEmpty(e.target.value)) {
            const value = price + Number(e.target.value)
            const newItemData = _.cloneDeep(itemData)
            if(newItemData?.options && newItemData?.options[index]){
                newItemData.options[index].checked = true
                setItemData(newItemData)
                setPrice(value);
            }
            
        }
        if (!e.target.checked && e.target.value) {
            const value = price - Number(e.target.value)
            const newItemData = _.cloneDeep(itemData)
            if(newItemData?.options && newItemData?.options[index]){
                newItemData.options[index].checked = false
                setItemData(newItemData)
                setPrice(value);
            }
        }
    }

    const handleAction = () => {
        if (step === 3) {
            setIsOpenDialog(false)
            return
        }

        if(step === 0){
            const newCartData = _.cloneDeep(cartData)
            const newItems = _.cloneDeep(itemData)
            if(!newItems) return

            const newItemIndex = newCartData.items.findIndex((item: ItemModel) => item._id === newItems._id)

            if(newItemIndex !== -1){
                newCartData.items.splice(newItemIndex, 1, newItems)
                let price = 0
                newCartData.items.forEach((item: ItemModel) => {
                    price = price + item.price
                    if(item?.options) price = price + calculatePrice(item?.options.filter((option: OptionModel) => option.checked))
                })
                newCartData.totalPrice = price
                setCartState(newCartData)

            }else{
                newCartData.items.push(newItems)
                newCartData.total = newCartData.total + 1
                newCartData.totalPrice = newCartData.totalPrice + newItems.price
                if(newItems?.options) newCartData.totalPrice = newCartData.totalPrice + calculatePrice(newItems?.options.filter((option: OptionModel) => option.checked))
    
                setCartState(newCartData)
            }

            setStep(1)
            
        }

        if (step === 1) {
            if (!cartData.total) return
            preBookingCalculation()

            setStep(2)
        }

        if (step === 2) {

            const isValidate = validation()
            if(!isValidate) return

            const preBookingJob = cartData.preBookingData
             const temp = new Date(customerInfo.startDate || '')
             const startTime = new Date(customerInfo.startDate || '')

             const endTime = temp.setMinutes(temp.getMinutes() + preBookingJob.totalEstTime)
             
            const jobData : JobCreateInput = {
                address: customerInfo.address || '',
                customerName: customerInfo.name || '',
                phoneNumber: customerInfo.phoneNumber || '',
                note: customerInfo.note,
                startDate: startTime,
                endDate: endTime,
                items: preBookingJob.items,
                totalPrice: preBookingJob.totalPrice,
                totalDiscountPrice: preBookingJob.totalDiscountPrice,
                finalTotalPrice: preBookingJob.finalTotalPrice,
                categoryId: cartData.items[0].categoryId,
                appliedCampaigns: preBookingJob.appliedCampaigns
            }

            if(meta){
                jobData.metadata = {
                    ...meta
                }
            }
            
            createJob({
                variables: {
                    input: jobData
                }
            })

            return
        }
    }

    const handleBack = () => {
        if (step === 0) setIsOpenDialog(false)
        if(step === 1) {
            if(!itemData) {
                setIsOpenDialog(false)
                return
            }
        }
        if (step > 0) setStep(step - 1)
        
    }

    const handleEditItem = (item: ItemModel) => {

        let newPrice = 0

        newPrice = newPrice + item.price
        if(item?.options) newPrice = newPrice + calculatePrice(item?.options.filter((option: OptionModel) => option.checked))
        setPrice(newPrice)
        setItemData(item)
        setStep(0)
    }

    const updateCustomerInfo = (value: string, key: keyof CustomerInfo) => {
        const newCustomerInfo = _.cloneDeep(customerInfo)
        newCustomerInfo[key] = value
        const errorIndex = errors.findIndex((error: ErrorValidation) => error.key === key)
        const newErrors = _.cloneDeep(errors)
        if (errorIndex !== -1) {
            newErrors.splice(errorIndex, 1)
            setErrors(newErrors)
        }
        setCustomerInfo(newCustomerInfo)
    }

    const handleSetTitle = () => {
        let title
        switch (step) {
            case 0: title = slider(); break;
            case 1: title = <div className="dialog-title-custom"><span>Bước 1/2. Chọn dịch vụ</span></div>; break;
            case 2: title = <div className="dialog-title-custom"><span>Bước 2/2. Đặt lịch hẹn</span></div>; break;
            default: title = slider()
        }
        return title
    }

    const validation = () => {
        const errorList : ErrorValidation[] = []
        if (isEmpty(customerInfo.phoneNumber)) {
            errorList.push({message: 'Số điện thoại không được để trống', key: 'phoneNumber'})
        }
        if (isEmpty(customerInfo.name)) {
           errorList.push({message: 'Tên không được để trống', key: 'name'})
        }
        if (isEmpty(customerInfo.address)) {
            errorList.push({message: 'Địa chỉ không được để trống', key: 'address'})
        }
        
        if (!customerInfo.startDate) {
           errorList.push({message: 'Chưa chọn lịch hẹn', key: 'startDate'})
        }

        if(errorList.length > 0){
            setErrors(errorList)
            return false
        }
        return true
    }

    const preBookingCalculation = () => {
        const data : PreBookingJobInput = {
            items: [],
            campaignCode: code,
            categoryId: '64632106ea5a6401016da32e'
        }

        const items = cartData.items.map(item => {
            const newItem = Object.keys(item).reduce((obj, key) => {
                if(key === '_id'){
                    obj.id = item[key]
                }
                return obj
            }, {} as CartItemInput)

            newItem.options = item.options?.filter(option => option.checked).map(option => {
                                    const newObj =  Object.keys(option).reduce((obj, key) => {
                                        if(key === '_id'){
                                            obj.id = option[key]
                                        }
                                        return obj
                                    }, {} as CartItemOptionInput)
                                    newObj.quantity = 1
                                    return newObj
                                }) as CartItemOptionInput[]

            newItem.quantity = 1

            return newItem
        })

        data.items = items

        data.categoryId = cartData.items[0].categoryId

        preBookingCal({
            variables: {input: {...data}}
        })
    }

    const handleChangeCode = (value: string) => {
        if(errorCode) setErrorCode(false)
        setCode(value)
    }

    const stepRender = () => {
        if(step === 0) {
            return (<div>
                        <DialogContent1 handleCountPrice={handleCountPrice} data={itemData}/>
                    </div>)}

        if(step === 1) {
            return (<div>
                        <DialogContent2 handleEditItems={handleEditItem} changeCode={handleChangeCode} preCalculate={preBookingCalculation} code={code} codeError ={errorCode}/>
                    </div>)}

        if(step === 2) {
            return (<div>
                        <DialogContent3 customerInfo={customerInfo} updateCustomerInfo={updateCustomerInfo} errors = {errors}/>
                    </div>)
        }

        return null
    }

    const appliedCampaigns = cartData.preBookingData?.appliedCampaigns

    return (
        <>
        {
            step < 3 ?
            <BootstrapDialog
            onClose={() => setIsOpenDialog(false)}
            open={isOpenDialog}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            className="dialog-booking"
            fullScreen={isMobileView}
        >
            <div style={{ overflowX: 'hidden', height: '100%' }}>
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleBack}>
                    {handleSetTitle()}
                </BootstrapDialogTitle>
                {/* {handleSetContent()} */}
                
                {stepRender()}
            </div>
                {step === 1 && appliedCampaigns?.length ? <div className="success-board">
                        <CheckCircleOutlineIcon />
                        <span>{`Bạn được giảm giá`}</span>
                </div> : null}
            <DialogActions>
                <div className="dialog-action">
                    {
                        step < 2 &&
                        <div className="combo-price">
                            <span>{formatCurrency(step === 0 ? price : cartData.totalPrice)}</span>
                        </div>
                    }
                    <Button autoFocus onClick={handleAction} fullWidth={step === 2}>
                        {step === 0 ? 'CHỌN COMBO' : step === 1 ? 'TIẾP TỤC' : 'ĐẶT LỊCH'}
                        {step === 1 && <Image src="/images/icons/right-icon.svg" width={24} height={24} alt="" style={{ marginLeft: '10px' }} />}
                    </Button>
                </div>
            </DialogActions>
        </BootstrapDialog> :
        <DialogSuccessful isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog}/>
        }
        </>
 
    );
}

export default DialogBooking