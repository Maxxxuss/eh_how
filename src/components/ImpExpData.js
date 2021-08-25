import { Button, Grid } from '@material-ui/core';
import React from 'react'
import { locCache, setLocalStorageState } from '../store/configureStore';


export default class ImpExpData extends React.Component {



    expLocalStorage = (filename, text = locCache()) => {
        var blob = new Blob([text], { type: "text/plain" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }
    impLocStora = (event) => {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {

            setLocalStorageState(JSON.stringify(JSON.parse(reader.result)
            ))
        };

        reader.readAsText(file);
        window.location.reload()
    }



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
                        <Button
                            color="secondary"
                            variant="contained"
                            className="expButton"

                            //    onClick = {this.onCategorieSubmit}
                            onClick={this.expLocalStorage}
                        >Export Local Data

                        </Button>

                    </Grid>

                    <Grid item>
                        <input type="file"
                            id="file" name="file"
                            onChange={this.impLocStora}

                        />

                    </Grid>

                </Grid>




            </div>
        )
    }
}