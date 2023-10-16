import { useCallback, useEffect, useState } from "react";

export function useFormWithValidation(validate, numberOfInputs) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        console.log(errors);
        let validFields = 0;
        Object.keys(errors).forEach((k) => {
            validFields += errors[k] === '';
        });

        setIsValid(validFields === numberOfInputs);
    }, [errors, numberOfInputs])

    useEffect(() => {
        const newErrors = {}
        console.log('values:', values);
        console.log('keys:', Object.keys(values));
        Object.keys(values).forEach((x) => {
            newErrors[x] = validate(x, values[x]);
        });
        setErrors(newErrors);
    }, [values])

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
    };


    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return { values, handleChange, errors, isValid, resetForm, setValues };
}