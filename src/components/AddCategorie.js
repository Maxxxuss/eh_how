


import React from 'react'
import 'react-dates/initialize';
import { Modal, Grid, Box, TextField, Button, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Height } from '@material-ui/icons';


export default class AddCategorie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categorie: "",
            setOpen: false,
        }
    }


    onCategorieChange = (e) => {
        const categorie = e.target.value
        this.setState(() => ({ categorie }))
    }


    onCategorieSubmit = (categorie) => {
        categorie.preventDefault()
        this.props.setCategorie({
            catName: this.state.categorie,
            details: ""

        })
        this.setState(() => ({ setOpen: false }))
        console.log("Submit pressed ", this.state.categorie);
    }


    handleClose = () => {
        const setOpen = false
        this.setState(() => ({ setOpen }))
    };

    deleteCategorieOnSubmit = () => {
        const activeCategorieID = this.props.activeCategorieID


        this.props.removeCategorie({
            id: activeCategorieID
        })

    }

    onOpenModal = () => {
        this.setState(() => ({ setOpen: true }))
    }

    AddButton = () =>
        <IconButton>
            <AddCircleOutlineIcon />
        </IconButton>



    render() {
        const { setOpen } = this.state
        return (
            <Grid
                container spacing={2} alignItems="center"
                style={{
                    backgroundColor: "rgba(238, 238, 238, 0.405)",
                    

                }}
            >
                <Grid item >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.onCategorieSubmit}


                    >
                        Start New Project

                    </Button>

                </Grid>
                <Grid item >


                    <TextField
                        tpye="text"
                        label="Project Name"
                        value={this.state.categorie}
                        onChange={this.onCategorieChange}
                        variant="outlined"


                        style={{
                            color: "Green",
                            backgroundColor: "rgba(238, 238, 238, 0.405)",
                            width: 200,


                        }}

                    >
                    </TextField>
                </Grid>
                <Grid item >


                    <Button
                        onClick={this.deleteCategorieOnSubmit}
                        variant="contained"
                        color="secondary"
                    >

                        Delete Project
                    </Button>
                </Grid>
            </Grid>

        )
    }



    // Modal Matierl UI from 09.08
    //     return (

    //         <div
    //             className="addCategorie"
    //         >
    //             <button
    //                 onClick={this.onOpenModal}
    //             >Start new Project
    //             </button>
    //             <Modal
    //                 open={setOpen}
    //                 onClose={this.handleClose}
    //                 aria-labelledby="simple-modal-title"
    //                 aria-describedby="simple-modal-description"

    //             >
    //                 {

    //                     <div>

    //                         <Box
    //                             display="flex"
    //                             bgcolor="background.paper"
    //                             justifyContent="center"
    //                             alignItems="center"
    //                             m={10}
    //                             mr={50}
    //                             ml={50}

    //                         >
    //                             <Box
    //                                 justifySelf="center"
    //                             >
    //                                    <h1>
    //                             Start a new Project
    //                         </h1>

    //                             </Box>

    //                             <Box
    //                             component="p"
    //                             display="block"
    //                             >
    //                                 <input
    //                                     tpye="text"
    //                                     placeholder="categorie"
    //                                     value={this.state.categorie}
    //                                     onChange={this.onCategorieChange}

    //                                 />

    //                                 <button
    //                                     onClick={this.onCategorieSubmit}
    //                                 >
    //                                     Start Project
    //                                 </button>
    //                             </Box>


    //                         </Box>
    //                     </div>

    //                 }
    //             </Modal>

    //             <div>
    //                 <button
    //                     onClick={this.deleteCategorieOnSubmit}
    //                 >

    //                     Delete Categorie
    //                 </button>
    //             </div>


    //         </div >

    //     )
    // }
}
