import { PreBookingJobModel } from "@/dataStructure";
import { gql, useMutation } from "@apollo/client";

const PRE_BOOKING_JOB = gql`
  mutation preBookingJob($input: PreBookingJobInput!) {
    preBookingJob(input: $input) {
      appliedCampaigns {
        code
        refId
        type
        appliedTargets {
            name
            condition
            promotionType
            refId
            targetType
            value
        }
    }
    totalPrice
    finalTotalPrice
    totalDiscountPrice
    totalEstTime
    items {
        refId
        name
        quantity
        price
        finalPrice
        options {
            refId
            name
            quantity
            price
            finalPrice
        }
    }
              }
  }
`;

type MutationOption = {
    onCompleted: (data: {preBookingJob: PreBookingJobModel}) => Promise<void> | void
}

export const usePreBooking = (options: MutationOption) => {
    const [mutatePrice] = useMutation(PRE_BOOKING_JOB, {...options})

    return [mutatePrice]
}