import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    id: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Location is required'),
});