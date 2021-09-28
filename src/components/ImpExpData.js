import { Button, FormControlLabel, Grid, Snackbar, Switch } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { editGlobalVariables } from "../actions/globalVariables";
import { getGlobalVariables } from "../selectors/autoSave";

import { locCache, setLocalStorageState } from "../store/configureStore";
import { Alert } from "./Notification/NotificationBar";

class ImpExpData extends React.Component {
// constructor (props) {
//   super(props)
//   this.state= {
//     notificationStatus:   false
//   }
// }


  expLocalStorage = (filename, text = locCache()) => {
    var blob = new Blob([text], { type: "text/plain" });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    this.props.editGlobalVariables({ autoSave: 0 });
  };

  impLocStora = (event) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setLocalStorageState(JSON.stringify(JSON.parse(reader.result)));
    };

    reader.readAsText(file);
    window.location.reload();
  };

  autoSaveSwitch = () => {
    const onOffSwitch = this.props.globalVariables.onOffSwitch;

    if (onOffSwitch != true) {
      this.props.editGlobalVariables({ onOffSwitch: true });
  
    } else {
      this.props.editGlobalVariables({ onOffSwitch: false });
    }
  };

  autoSaveLabel = () => {
    const onOffSwitch = this.props.globalVariables.onOffSwitch;
    const autoSave = this.props.globalVariables.autoSave;

    if (onOffSwitch != true) {
      return "Auto Save OFF";
    } else {
      return ["Auto Save in ", 11 - autoSave, " Actions"];
    }
  };

  render() {
    return (
      <div className="impExpButton">
        <Grid
          container
          spacing={10}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    this.props.globalVariables.onOffSwitch != false
                      ? false
                      : true
                  }
                  onChange={this.autoSaveSwitch}
                  name="Info Note"
                />
              }
              label={this.autoSaveLabel()}
            />
          </Grid>

          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              className="expButton"
              onClick={this.expLocalStorage}
            >
              Export Local Data
            </Button>
          </Grid>

          <Grid item>
            <input
              type="file"
              id="file"
              name="file"
              onChange={this.impLocStora}
            />
          </Grid>
        </Grid>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    globalVariables: getGlobalVariables(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  editGlobalVariables: (autoSave) => dispatch(editGlobalVariables(autoSave)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImpExpData);
