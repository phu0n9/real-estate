<<<<<<< HEAD
import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="yyyy-MM-dd"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}

            />
        </MuiPickersUtilsProvider>
    )
=======
import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="yyyy-MM-dd"
                name={name}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}

            />
        </MuiPickersUtilsProvider>
    )
>>>>>>> dc52a23 (add)
}