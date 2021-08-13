


import React from 'react'
import 'react-dates/initialize';
import { Modal, Grid, Box, TextField, Button } from '@material-ui/core';




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


    render() {
        const { setOpen } = this.state
        return (
            <Grid

            >
                <Button
                    variant="outlined"
                    // color= "secondary"
                    onClick={this.onCategorieSubmit}

                >
                    Start New Project

                </Button>

                <TextField
                    tpye="text"
                    placeholder="Project Name"
                    value={this.state.categorie}
                    onChange={this.onCategorieChange}>
                </TextField>

                <Button
                    onClick={this.deleteCategorieOnSubmit}
                    variant="outlined"
                    color="secondary"
                >

                    Delete Project
                </Button>
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
    //                             component="span"
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
