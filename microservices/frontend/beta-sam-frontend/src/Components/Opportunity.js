import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import {Divider, TextField} from "@mui/material";

const emails = ['username@gmail.com', 'user02@gmail.com'];


export default class Opportunity extends React.Component {
    render() {
        const { onClose, selectedValue, open } = this.props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        const handleListItemClick = (value) => {
            onClose(value);
        };

        return (
            <Dialog fullWidth={true} onClose={handleClose} open={open}>
                <DialogTitle>Opportunity</DialogTitle>
               <div style={{ margin: '1em'}}>
                   { this.props?.opportunity != null && Object.keys(this.props.opportunity).map((key) => {
                       let value = this.props?.opportunity[key] ? this.props?.opportunity[key] : 'None'
                       return (
                           <TextField disabled={true} style={{margin: '1em 0'}} fullWidth={true} value={value} id="outlined-basic" label={key} variant="outlined" />
                       )
                   })}

               </div>

            </Dialog>
        );
    }
}

Opportunity.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

