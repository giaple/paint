import { gql, useMutation } from "@apollo/client";

const CREATE_JOB = gql`
    mutation createJob($input: JobCreateInput!) {
            createJob(input: $input) {
                _id
            }
  }
`;

type MutationOption = {
    onCompleted: (data: any) => Promise<void> | void
}

export const useCreateJob = (options: MutationOption) => {
    const [createJob] = useMutation(CREATE_JOB, {...options})

    return [createJob]
}