import {useMutation} from "@tanstack/react-query";
import {addBranch} from "../api";
import {useFormik} from "formik";
import {validationSchema} from "../schema";
import {INITIAL_FORM_STATE} from "../constants";
import useSnackbar from "src/hooks/useSnackbar";
import useAccountContext from "src/hooks/useAccountContext";
import {AxiosBaseError} from "src/types";
import extractErrorMessage from "src/utils/extractErrorMessage";

interface useAddBranchAPIProps {
}

const AddBranchQueryKey = ["addBranch"];

const useAddBranchFormController = () => {

    const {showSnackbar} = useSnackbar();


    const formikProps = useFormik({
        initialValues: INITIAL_FORM_STATE,
        onSubmit: (values,{ resetForm }) => {
            mutate(values);
            resetForm();
        },
        validationSchema,
        validateOnMount: true,
    });

    const {mutate, isLoading} = useMutation(
        AddBranchQueryKey,
        addBranch,
        {
            onSuccess: (data) => {
                console.log(data.data);
                if(data.success==true)
                showSnackbar({severity: "success", message: data.message});
                else if(data.success==false)
                showSnackbar({severity: "warning", message: data.message});
            },
            onError: (error: AxiosBaseError) => {
                const errorMessage = extractErrorMessage(error);
                showSnackbar({severity: "error", message: errorMessage ?? "Error in Adding Branch"});
            }
        }
    );

    return {formikProps, mutate, isLoading};
};

export default useAddBranchFormController;
