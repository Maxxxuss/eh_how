import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     '& > * + *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export default function NotificationBar(props) {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   const [nStatus, setNStatus] = React.useState("")

 

//   // do {
//   //   setOpen(props.notfStatus)
    
//   // } while (open != props.notfStatus);

//   if (open === false && props.notfStatus ===true) {
//     setNStatus(true)
    
//   }



 

//   console.log("Notification Status:", props.notfStatus, "OpenState: ", open);



//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);

//   };

//   return (
//     <div className={classes.root}>
//       {/* <Button variant="outlined" onClick={handleClick}>
//         Open success snackbar
//       </Button> */}
//       <Snackbar open={open} autoHideDuration={1000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity="success">
//           This is a success message!
//         </Alert>
//       </Snackbar>
//       {/* <Alert severity="error">This is an error message!</Alert>
//       <Alert severity="warning">This is a warning message!</Alert>
//       <Alert severity="info">This is an information message!</Alert>
//       <Alert severity="success">This is a success message!</Alert> */}
//     </div>
//   );
// }
