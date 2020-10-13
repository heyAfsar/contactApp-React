import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { mapDispatchToProps } from "../../../../../../ui-utils/commons";
import { connect } from "react-redux";




const styles = theme => ({
    
    root:{
        background: "#242430",
    }
    })

class Task extends React.Component{

   

render(){
    return(
        <div>Task</div>
    )
}
   

    
}

const mapStateToProps = ({ screenConfiguration = {} }) => {
    const { preparedFinalObject = {} } = screenConfiguration;
    const {task = {} } = preparedFinalObject;
    return { task };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(Task));