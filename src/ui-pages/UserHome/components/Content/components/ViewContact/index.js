import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { mapDispatchToProps } from "../../../../../../ui-utils/commons";
import { connect } from "react-redux";
import { Grid, Button, Dialog, DialogTitle, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { httpRequest } from '../../../../../../ui-utils/api'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';




const styles = theme => ({

    root: {
        // background: "#242430",
        width: "100%"
    },
    clickevent: {
        cursor: 'pointer'
    },
    addtask: {
        marginLeft: "20%"
    },
    dialogheader:{
        marginLeft: "49%"
    }

})

class ViewContact extends React.Component {

    componentDidMount = async () => {
        const { setAppData } = this.props;
        setAppData("dialog", false);
        setAppData("spinner", true)
        let apiResponse = await httpRequest({
            endPoint: 'https://reqres.in/api/users?page=2',
            method: "get",
        })

        setAppData("spinner", false)
        setAppData("ContactList", apiResponse.data)

    }

    handleClose = () => {
        const { setAppData } = this.props;

        setAppData("dialog", false)
    }
    handleDilog = () => {
        const { setAppData } = this.props;
        setAppData("dialog", true)
    }

    render() {
        const { ContactList = [], dialog, classes } = this.props
        const { handleClose } = this
        return (
            <Grid container justify="center"
                alignItems="center"
                item xs={12} md={12} sm={12}>

                <Grid item xs={12} md={12} sm={12} container direction='row' spacing={0}>
                    <Grid item xs={9} md={10} sm={9}></Grid>
                    <Grid item xs={2} md={1} sm={2}>
                        <Button variant="contained" color="primary" onClick={() => { this.handleDilog() }}>ADD</Button>
                    </Grid>
                    <Grid item xs={1} md={1} sm={1}>
                        <DeleteIcon />
                    </Grid>

                </Grid>


                <Grid item xs={12} md={12} sm={12}>
                    <Paper className={classes.root}>
                        {dialog ?
                            <Dialog
                                fullWidth
                                open={dialog}
                                onClose={handleClose}
                                aria-labelledby="responsive-dialog-title"

                            >
                                <Grid container>
                                    <Grid item md={7} sm={7}>
                                        <DialogTitle className={classes.dialogheader}>
                                            Add Details
      </DialogTitle>
                                    </Grid>
                                    <Grid item md={1} sm={1}> <CancelIcon align='right' style={{ fontSize: "40px" }} onClick={handleClose} color="primary" />
                                    </Grid></Grid>
                                {/* <DialogContent dividers > */}
                                <Grid container direction row item md={6} sm={6} xs={6} spacing={5} justify="center"
                                    alignItems="center" className={classes.addtask}
                                >

                                    <Grid item md={5} sm={5} xs={12} justify="center" alignItems="center">
                                        <Typography>User Name</Typography>
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue="Major"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={5} sm={5} xs={12} justify="center" alignItems="center">
                                        <Typography>Phone</Typography>
                                        <TextField
                                            required
                                            fullWidth="true"
                                            id="outlined-required"
                                            label="Required"
                                            defaultValue=" "
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={2} sm={2} xs={12}><Button variant="contained" color="primary" >Add</Button></Grid>
                                </Grid>
                                {/* </DialogContent> */}


                            </Dialog>



                            : ""}
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell >Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell>Edit Action</TableCell>
                                        {/* <TableCell>Phone</TableCell> */}
                                        <TableCell>Delete Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ContactList && ContactList.length > 0 && ContactList.map((field, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell><Checkbox /></TableCell>
                                                <TableCell >{field.first_name}</TableCell>
                                                <TableCell >{field.last_name}</TableCell>
                                                <TableCell className={classes.clickevent} hover='true'>
                                                    <Button className={classes.clickevent} variant="contained" color="primary" >
                                                        Edit
</Button></TableCell>
                                                {/* <TableCell className={classes.clickevent}>{field.phone}</TableCell> */}
                                                <TableCell className={classes.clickevent}>
                                                    <Button className={classes.clickevent} variant="contained" color="primary" >
                                                        Delete
</Button></TableCell>
                                            </TableRow>
                                        )

                                    })}

                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>

                </Grid>
            </Grid>
        )
    }



}

const mapStateToProps = ({ screenConfiguration = {} }) => {
    const { preparedFinalObject = {} } = screenConfiguration;
    const { ViewContact = {}, ContactList = {}, dialog } = preparedFinalObject;
    const { apiResponse = {} } = ContactList;
    const { data } = apiResponse
    return { ViewContact, ContactList, dialog };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(ViewContact));