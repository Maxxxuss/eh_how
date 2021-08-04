import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


class DropDownCat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    getItems(filter) {

        const allItems = this.props.categories
        return filter
            ? matchSorter(allItems, filter, {
                keys: ['catName'],
            })
            : allItems
    }

    displayCatDropDown = (categories = this.props.categories) => {
        categories.map(categorie => (
            <option
                value={categorie.catName}
            >
                categorie.catName
                {categorie.catName
                    // ,console.log(categorie.catName)
                }               </option>
        ))
        console.log("Drop Down Cate: ", categories);
    }

    catCheck = () =>{
        this.displayCatDropDown()
        console.log( this.displayCatDropDown()
        );
    }


    render() {
        const { categories, activeNote } = this.props
        return (
            <div>


            <FormControl variant="filled"
            //  className={classes.formControl}
            >
                <InputLabel htmlFor="filled-age-native-simple">Categories</InputLabel>
                <Select
                    native
                    //   value={state.age}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'age',
                        id: 'filled-age-native-simple',
                    }}
                >
                    {/* <option aria-label="None" value="" /> */}
                    {/* <option value={10}>Ten</option> */}
                    {/* <option value={20}>Twenty</option> */}
                    {/* <option value={30}>Thirty</option> */}
                    
                    {this.displayCatDropDown()} 

                </Select>
            </FormControl>

            <div>
                <button
                onClick = {this.catCheck}
                >

                    cat Checl
                </button>

            </div>

            </div>




        )
    }
}



export default DropDownCat