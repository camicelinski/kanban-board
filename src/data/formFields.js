const fields = [
    {
        name: 'taskName',
        label: 'task*',
        type: 'text',
        defaultValue: '',
        pattern: /^.{4,}$/,
        errortype: 'min. 4 characters',
        required: true,
    },
    {
        name: 'owner',
        label: 'owner*',
        type: 'text',
        defaultValue: '',
        pattern: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        errortype: 'min. 3 letters',
        required: true,
    },
    {
        name: 'email',
        label: 'email*',
        type: 'email',
        defaultValue: '',
        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        errortype: 'type valid email address',
        required: true,
    },
    {
        name: 'date',
        label: 'deadline',
        type: 'date',
        defaultValue: '',
        pattern: /^20\d{2}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])$/,
        errortype: 'today, in the future or empty',
        required: false,
    },
    {
        name: 'message',
        label: 'description',
        fieldName: 'textarea',
        defaultValue: '',
        pattern: /^.{5,}$/,
        errortype: 'min. 5 characters or empty',
        required: false,
    },
];

export default fields;
