import React from 'react'
import { locCache, setLocalStorageState} from '../store/configureStore';


export default class ImpExpData extends React.Component {
    
    impLocStora = () => {

        let fileReader = new FileReader();
        fileReader.onload = function () {
            let parsedJSON = JSON.parse(fileReader.result);
            lssave(parsedJSON);                 
        }
        fileReader.readAsText(document.querySelector('.file').files[0]);
        function lssave(jsone) {
            setLocalStorageState(JSON.stringify(jsone))

            }
        }

        onLocalStorage = (filename, text = locCache()) => {
            var blob = new Blob([text], {type: "text/plain"});
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
          }

    
    
    render () {
        return(
            <div className="impExpButton">
                
                <button
                className = "expButton"
                
                //    onClick = {this.onCategorieSubmit}
                onClick = {this.onLocalStorage}
                   >Export Local Data </button>
                
                <input type="file" />
                <button onClick= {this.impLocStora} 
                className ="impButton"
                >
                    Submit Import
                </button>

                

            </div> 
        )
    }
}