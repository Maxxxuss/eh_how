// import React from 'react';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';

// import Select from '@material-ui/core/Select';
// import { MenuItem } from 'semantic-ui-react';
// import { Autocomplete } from '@material-ui/lab';
// import SelectInput from '@material-ui/core/Select/SelectInput';



// class DropDownCat extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             categorie: []

//         }
//     }

//     handleChange = (event) => {
//         const name = event.target.name;
//         setState({
//             ...state,
//             [name]: event.target.value,
//         });
//     };



//     onCateChange = (e) => {
//         const categorie = e.target.value
//         this.setState(() => ({ categorie }))
//         console.log(this.state.categorie);
//     }


//     render() {
//         const { categories, activeNote } = this.props
//         const { categorie } = this.state

//         return (
//             <div>

//                 <Autocomplete
//                     id="combo-box-demo"
//                     options={categories}
//                     getOptionLabel={(option) => (option ? option.catName : [])}
//                     inputValue = {categorie.toString()}
//                     // onInputChange={this.onCateChange}
//                     onInputChange={( event, categorie) =>{
//                         this.setState({categorie})
//                     }}
//                     onChange={this.onCateChange}

//                     // style={{ width: 300 }}
//                     renderInput={(params) =>
//                         <TextField {...params}
//                             label="Combo box"
//                             variant="outlined"
//                         />}
//                 />
//             </div>

//         )
//     }
// }



// export default DropDownCat