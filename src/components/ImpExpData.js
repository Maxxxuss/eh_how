import React from 'react'
import { locCache, setLocalStorageState} from '../store/configureStore';


export default class ImpExpData extends React.Component {
    
    // impLocStora = () => {

    //     let fileReader = new FileReader();
    //     fileReader.onload = function () {
    //         let parsedJSON = JSON.parse(fileReader.result);
    //         lssave(parsedJSON);
    //     }
    //     console.log(fileReader);
    //     // fileReader.readAsText(document.querySelector('.file').files[0]);
    //     // function lssave(jsone) {
    //     //     setLocalStorageState(JSON.stringify(jsone))

    //         }
        

        expLocalStorage = (filename, text = locCache()) => {
            var blob = new Blob([text], {type: "text/plain"});
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
          }
impLocStora = (event) =>
    {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
      
             setLocalStorageState(JSON.stringify(JSON.parse(reader.result)
             ))
        };
      
        reader.readAsText(file);
        window.location.reload()
      }

 
    
    render () {
        return(
            <div className="impExpButton">
                
                <button
                className = "expButton"
                
                //    onClick = {this.onCategorieSubmit}
                onClick = {this.expLocalStorage}
                   >Export Local Data </button>
                
                <input type="file"
                 id="file" name="file"
                 onChange= {this.impLocStora}
                 />
                {/* <button onClick= {this.impLocStora} 
                className ="impButton"
                >
                    Submit Import
                </button> */}

                

            </div> 
        )
    }
}