import { getCurrentDate } from './helpersFunctions';

export default function validateForm(fields, values) {
    const errors = [];

    fields.forEach((field) => {
        const { name, required, pattern, errortype } = field;
        const value = values[name];

        if (required) {
            if (value.length === 0) {
                errors.push({
                    text: 'this field is mandatory',
                    field,
                });
            }
        }

        if (pattern && value.length > 0 && name !== 'date') {
            const reg = new RegExp(pattern);
            if (!reg.test(value)) {
                errors.push({
                    text: errortype,
                    field,
                });
            }
        }

        if (name === 'date') {
            const currentDate = getCurrentDate();
            const inputDate = new Date(value);
            if (inputDate < new Date(currentDate)) {
                errors.push({
                    text: errortype,
                    field,
                });
            }
        }
    });

    return errors;
}
